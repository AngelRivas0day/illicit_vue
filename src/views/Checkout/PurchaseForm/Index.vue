<template>
    <div class="purchase-form">
        <md-dialog class="dialog" :md-active.sync="showDialog" @md-closed="getAddresses">
            <md-dialog-title>Direcci&oacute;n de env&iacute;o</md-dialog-title>
            <AddressForm />
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
                </md-field>
            </div>
            <div class="col-12 mt-4">
                <h2>Direcci&oacute;n de env&iacute;o</h2>
            </div>
            <div class="col-12 mb-2 mt-0 mb-4">
                <div class="row no-gutters ml-0">
                    <div class="col-12">
                        <md-button @click="showDialog = true" class="md-dense md-raised md-primary ml-0 mb-3">Nueva direcci&oacute;n</md-button>
                    </div>
                    <div :key="ad.id" v-for="(ad, index) in addresses" class="col-xs-12 col-sm-12 col-md-6 mb-3">
                        <AddressCard class="mr-3" :address="ad" :index="index" :readOnly="true" @selected="setAddress" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <h2>M&eacute;todo de pago</h2>
            </div>
            <div class="col-12">
                <md-radio v-model="paymentMethod" value="card" class="text-white">Tarjeta de cr&eacute;dito / d&eacute;bito</md-radio>
                <md-radio v-model="paymentMethod" value="store" class="text-white">En tienda</md-radio>
            </div>
            <div v-if="errorMessage != null" class="col-12">
                <div class="text-left text-warning">
                    {{errorMessage}}
                </div>
            </div>
            <div class="col-12 text-right mt-3">
                <md-button class="md-dense md-raised md-primary" type="submit">Siguiente</md-button>
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
        AddressCard: () => import('@/views/User/Addresses/AddressCard.vue'),
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
        lensePrice: 0
    }),
    mounted(){
        this.getAddresses()
        this.lensePrice = this.lenseSpecs.price
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
            paymentMethod: 'paymentMethod'
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
        }
    },
    methods: {
        ...mapActions('addresses',{
           getAddresses:'getAddresses'
        }),
        setAddress(addressId){
            if(addressId != ""){
                this.addressId = addressId
            }
        },
        goToPay(e){
            e.preventDefault()
            if(this.isFormValid){
                this.$router.push({name: 'Payment', params: {slug: this.lenseSpecs.slug}})
            }else{
                this.errorMessage = "Todos los campos son obligatorios"
                // some warnings
            }
        },
        handleChange(e){
            this.selectedFile = e.target.files[0]
            this.lenseSpecs.graduation = this.selectedFile
        },
        handleMaterialChange(value){
            // let newPrice = this.lensePrice
            // switch (value) {
            //     case "poli":
            //         this.lenseSpecs.price += 250
            //         break;
            //     case "mat_1":
            //         this.lenseSpecs.price += 120
            //         break;
            //     default:
            //         break;
            // }
            switch (value) {
                case "poli":
                    this.priceMod = 200
                    break;
                case "mat_1":
                    this.priceMod = 100
                    break;
                default:
                    break;
            }
            this.lenseSpecs.price = this.lensePrice + this.priceMod
        },
        handleAntireflectiveChange(value){
            if(value){
                this.priceMod += 120
            }else{
                this.priceMod -= 120
            }
            this.lenseSpecs.price = this.lensePrice + this.priceMod
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
@import "../../../assets/css/vars";

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