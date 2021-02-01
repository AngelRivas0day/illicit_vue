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
        <md-dialog class="graduation-dialog" :md-fullscreen="false" :md-active.sync="showHelp">
            <md-dialog-title>¿Cómo subir mi graduación?</md-dialog-title>
            <md-dialog-content>
                <img src="http://via.placeholder.com/400x300" alt="" class="graduation-image">
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
                    <label for="material">Selecciona un material</label>
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
                    <md-select v-model="withGraduation">
                        <md-option :value="true">Con graduaci&oacute;n</md-option>
                        <md-option :value="false">Sin graduaci&oacute;n</md-option>
                    </md-select>
                </md-field>
            </div>
            <div v-if="withGraduation" class="col-xs-12 col-sm-12 col-md-6">
                <md-field class="mt-0">
                    <label>Sube tu graduaci&oacute;n</label>
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
                        <md-button @click="showDialog = true" class="md-secondary-button md-primary md-stroked ml-0 mb-3">Nueva direcci&oacute;n</md-button>
                    </div>
                    <div v-if="addresses.length != 0" class="col-12">
                        <div v-for="ad in addresses" :key="ad.id" class="w-100">
                            <md-radio v-model="addressId" :value="ad.id" class="text-white my-2">
                                {{ `${ad.state}, ${ad.city}. ${ad.street} #${ad.extNumber} ${ad.intNumber ? 'int. ' + ad.intNumber : ''}`}}
                                &nbsp;
                                <small>{{ ad.isDefault ? '(Default)' : '' }}</small>
                            </md-radio>
                        </div>
                    </div>
                    <div v-else class="col-12">
                        <p class="text-white text-warning">No hay direcciones registradas</p>
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
            <div class="col-12">
                <h2>C&oacute;digo de descuento</h2>
            </div>
            <div class="col-6">
                <md-field>
                    <md-icon v-if="isDiscountCodeValid">verified</md-icon>
                    <label>Si cuentas con uno escr&iacute;belo</label>
                    <md-input v-mask="'XXX-XXX'" v-model="discountCode"></md-input>
                </md-field>
            </div>
            <div class="col-3">
                <md-button @click="checkCode()" class="md-primary md-stroked mt-3">Verificar</md-button>
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
        showHelp: false,
        withGraduation: false,
        // discount code model
        discountCode: ''
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
            isOrderOk: 'isOrderOk',
            isDiscountCodeValid: 'isDiscountCodeValid'
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
           createOrder:'createOrder',
           checkForDiscountCode: 'checkForDiscountCode'
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
                        this.$router.push({name: 'ProductCategories'})
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
        },
        checkCode(){
            this.checkForDiscountCode(this.discountCode)
            console.log("Check!")
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

.dialog{
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
}

.md-secondary-button{
    // @include secondary-button;
    // @include call-to-action-2(white);
    text-transform: capitalize;
    border: 1px solid rgba(255, 255, 255, .8);
    border-radius: 4px;
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