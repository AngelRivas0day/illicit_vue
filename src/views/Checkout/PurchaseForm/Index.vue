<template>
    <div class="purchase-form">
        <!-- <md-dialog-alert
            :md-active.sync="failedOrder"
            md-content="Ups! Algo ha salido mal"
            md-confirm-text="Continuar" /> -->
        <md-dialog class="dialog" :md-active.sync="showDialog" @md-closed="getAddresses">
            <md-dialog-title>Direcci&oacute;n de env&iacute;o</md-dialog-title>
            <AddressForm />
        </md-dialog>
        <md-dialog :md-fullscreen="false" :md-active.sync="showHelp">
            <md-dialog-title>¿Cómo subir mi graduación?</md-dialog-title>
            <md-dialog-content>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, fuga.
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary md-dense md-raised" @click="showHelp = false">Entendido</md-button>
            </md-dialog-actions>
        </md-dialog>
        <form @submit="goToPay" class="row">
            <div class="col-12">
                <h2>Especificaciones del lente</h2>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field class="mt-0">
                    <label for="material">Material</label>
                    <md-select v-model="lenseSpecs.material" name="material" id="material" @md-selected="handleMaterialChange">
                        <md-option v-for="m in materials" :key="m.id" :value="m.name">{{m.name}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field class="mt-0">
                    <label for="antireflective">Antirreflejante</label>
                    <md-select v-model="lenseSpecs.antireflective" name="antireflective" id="antireflective" @md-selected="handleAntireflectiveChange">
                        <md-option :value="false">Sin antirreflejante</md-option>
                        <md-option :value="true">Con antirreflejante</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field class="mt-0">
                    <label>Graduaci&oacute;n</label>
                    <md-file @change="handleChange"/>
                    <span @click="showHelp = true" class="md-helper-text">
                        <md-icon>help</md-icon>
                        ¿Necesitas ayuda?
                    </span>
                </md-field>
            </div>
            <div class="col-12 mt-4">
                <h2>Direcci&oacute;n de env&iacute;o</h2>
            </div>
            <div class="col-12 mb-2 mt-0 mb-3">
                <div class="row no-gutters ml-0">
                    <div class="col-12">
                        <!-- <md-button @click="showDialog = true" class="md-dense md-primary mb-3 ml-0 md-secondary-button">Nueva direcci&oacute;n</md-button> -->
                        <button @click="showDialog = true" class="md-secondary-button ml-0 mb-3"><span>Nueva direcci&oacute;n</span></button>
                    </div>
                    <div :key="ad.id" v-for="ad in addresses" class="col-12">
                        <md-radio v-model="addressId" :value="ad.id" class="text-white my-2">
                            {{ `${ad.state}, ${ad.city}. ${ad.street} #${ad.extNumber} ${ad.intNumber ? 'int. ' + ad.intNumber : ''}`}}
                            &nbsp;
                            <small>{{ ad.isDefault ? '(Default)' : '' }}</small>
                        </md-radio>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <h2>M&eacute;todo de pago</h2>
            </div>
            <div class="col-12">
                <md-radio v-model="paymentMethod" value="card" class="text-white">Tarjeta de cr&eacute;dito / d&eacute;bito</md-radio>
                <md-radio v-model="paymentMethod" value="store" class="text-white">En tienda</md-radio>
                <!-- en tienda solo para optica hehe -->
            </div>
            <div v-if="errorMessage != null" class="col-12">
                <div class="text-left text-warning">
                    {{errorMessage}}
                </div>
            </div>
            <div class="col-12 mt-3">
                <md-button class="md-raised md-primary ml-0 px-2" type="submit">
                    <!-- <span>Siguiente</span> -->
                    Siguiente
                </md-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'PurchaseForm',
    components: {
        // AddressCard: () => import('@/views/User/Addresses/AddressCard.vue'),
        AddressForm: () => import('@/views/User/Addresses/AddressForm.vue')
    },
    data: ()=>({
        selectedFile: null,
        errorMessage: null,
        materials: [
            {id: 1, name: "Policarbonato", value: "poli"},
            {id: 2, name: 'Material 1', value: 'mat_1'}
        ],
        priceMod: 0,
        lensePrice: 0,
        showHelp: false
    }),
    async mounted(){
        let restoredLenseSpecs = this.$cookies.get('lense_specs')
        this.lenseSpecs = restoredLenseSpecs
        
        this.lensePrice = this.lenseSpecs.price
        await this.getAddresses()
        this.addresses.forEach(address=>{
            if(address.isDefault){
                this.addressId = address.id
                return
            }
        })
    },
    computed: {
        ...mapState('addresses',{
            addresses: 'addresses'
        }),
        ...mapFields('addresses',{
            showDialog: 'showDialog',
            addressId: 'addressId'
        }),
        ...mapFields('order',{
            lenseSpecs: 'lenseSpecs',
            addressId: 'addressId',
            paymentMethod: 'paymentMethod',
            isOrderOk: 'isOrderOk'
        }),
        isMaterialValid(){
            return this.$v.lenseSpecs.material.required ? true : false
        },
        isAntireflectiveValid(){
            return this.$v.lenseSpecs.antireflective.required ? true : false
        },
        isGraduationValid(){
            return !this.selectedFile != null ? true : false
        },
        isAddressValid(){
            return this.addressId != null ? true : false
        },
        isPaymentValid(){
            return this.paymentMethod != null ? true : false
        },
        isFormValid(){
            if(
                this.isMaterialValid && this.isAntireflectiveValid && this.isGraduationValid && this.isAddressValid && this.isPaymentValid
            ){
                return true
            }else{
                return false
            }
        },
        failedOrder(){
            return !this.isOrderOk
        }
    },
    methods: {
        ...mapActions('addresses',{
           getAddresses:'getAddresses'
        }),
        ...mapActions('order',{
           createOrder:'createOrder'
        }),
        setAddress(addressId){
            if(addressId != ""){
                this.addressId = addressId
            }
        },
        async goToPay(e){
            e.preventDefault()
            if(this.isFormValid){
                if(this.paymentMethod == "card"){
                    this.$router.push({name: 'Payment', params: {slug: this.lenseSpecs.slug}})
                }else if(this.paymentMethod == "store"){
                    try {
                        await this.createOrder()
                        this.$router.push({name: 'Payment', params: {slug: this.lenseSpecs.slug}})
                    } catch (error) {
                        this.$router.push({name: 'Products'})
                    }
                }
            }else{
                this.errorMessage = "Todos los campos son obligatorios"
                // some warnings
            }
            // agregar logica para procesar el pago desde aqui cuando es con tarjeta
        },
        handleChange(e){
            this.selectedFile = e.target.files[0]
            this.lenseSpecs.graduation = this.selectedFile
        },
        handleMaterialChange(value){
            switch (value) {
                case "Policarbonato":
                    this.priceMod = 200
                    break;
                case "Material 1":
                    this.priceMod = 100
                    break;
                default:
                    break;
            }
            this.lenseSpecs.price = parseInt(this.lensePrice) + parseInt(this.priceMod)
        },
        handleAntireflectiveChange(value){
            if(value){
                this.priceMod += 120
            }else{
                this.priceMod -= 120
            }
            this.lenseSpecs.price = parseInt(this.lensePrice) + parseInt(this.priceMod)
        }
    },
    validations: {
        lenseSpecs: {
            material: {
                required
            },
            antireflective: {
                required
            },
            graduation: {
                required
            }
        },
        addressId: {
            required
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.call-to-action-1{
    // @include small-button("white", "black", "white");
    // @include call-to-action-2;
    // padding: 8px;
    // border: none;
    // min-width: 110px;
    // text-align: center;
    // color: black;
    // background: #dadada;
    // border-radius: 1px;
    // text-transform: uppercase;
    // font-weight: 200;
    // letter-spacing: 1px;
}

.md-secondary-button{
    // @include secondary-button;
    @include call-to-action-2(white);
    text-transform: uppercase;
}

.md-helper-text{
    cursor: pointer !important;
    .md-icon{
        font-size: 16px !important;
    }
}

.purchase-form{
    padding: 50px 0;
    background: black;
    height: 100%;
    overflow-y: auto;
    min-height: 725px;
    max-height: 100vH;
    form{
        max-width: 600px;
        margin: 0 auto;
        h2{
            color: white;
            font-weight: 200;
            font-size: 24px;
        }
        ::v-deep .md-field{
            color: black !important;
            input{
                -webkit-text-fill-color: #fff !important;
            }
            i:after{
                height: 0px !important;
            }
        }
        ::v-deep .md-textarea{
            -webkit-text-fill-color: #fff !important;
        }

        ::v-deep .md-field.md-theme-default label{
            color: #fff !important;
        }
        
        ::v-deep .md-field .md-icon{
            color: #fff !important;
            svg{
                fill: #fff !important;
            }
        }

        ::v-deep .md-checkbox .md-checkbox-container{
            border-color: #fff !important;
        }

        ::v-deep .md-radio .md-radio-container{
            border-color: #fff !important;
        }
        
        ::v-deep .md-field.md-theme-default:after {
            background-color: white !important;
        }
        
        ::v-deep .md-field.md-theme-default:before {
            background-color: white !important;
        }

        ::v-deep .md-count{
            color: #fff !important;
        }
    }
}
</style>