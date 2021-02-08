<template>
    <div class="purchase-form">
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
        <md-tabs ref="tabs">
            <md-tab id="tab-first" :md-label="windowWidth <= 540 ? 'Materiales' : 'Materiales y graduación'">
                <form class="row mt-3">
                    <div class="col-xs-12 col-sm-12 col-md-6 mb-5 d-flex flex-column">
                        <!-- <md-field class="mt-0">
                            <label for="lenseMaterial">Material del lente</label>
                            <md-select v-model="lenseSpecs.lenseMaterial" name="lenseMaterial" id="lenseMaterial" @md-selected="handleLenseMaterialChange">
                                <md-option v-for="m in glass.lenseMaterial" :key="m" :value="m">{{m}}</md-option>
                            </md-select>
                            <span v-if="lenseSpecs.lenseMaterial == 'Material Illicit'" class="md-helper-text">
                                <md-icon>info</md-icon>
                                Incluye antirreflejante sin costo extra
                            </span>
                        </md-field> -->
                        <label class="text-white mb-0">Material del lente</label><br>
                        <template v-for="m in glass.lenseMaterial">
                            <md-radio :key="m" v-model="lenseSpecs.lenseMaterial" :value="m" @change="handleLenseMaterialChange" class="md-primary text-white py-0 my-0 mb-3">
                                <div class="d-flex justify-content-between">
                                    <span>{{m}}</span>
                                    <span class="text-right text-white">${{lenseMaterialPrices[m]}}</span>
                                </div>
                                <span v-show="m == 'Material Illicit'" class="md-helper-test">
                                    Incluye antirreflejante sin costo extra
                                </span>
                            </md-radio>
                        </template>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 mb-5 d-flex flex-column">
                        <!-- <md-field class="mt-0">
                            <label for="lenseMaterial">Material de la montura</label>
                            <md-select 
                                v-model="lenseSpecs.mountMaterial" 
                                name="mountMaterial" 
                                id="mountMaterial" 
                                @md-selected="handleMountMaterialChange"
                                @md-opened="showLabelOne = true"
                                @md-closed="showLabelOne = false"
                            >
                                <template  v-for="m in glass.frameMaterial">
                                    <md-option :key="m" :value="m">
                                        <div class="d-flex justify-content-between">
                                            <span>{{m}}</span>
                                            <span v-show="showLabelOne" class="text-right">$900</span>
                                        </div>
                                    </md-option>
                                </template>
                            </md-select>
                        </md-field> -->
                        <label class="text-white mb-0">Material del la montura</label><br>
                        <template v-for="m in glass.frameMaterial">
                            <md-radio :key="m" v-model="lenseSpecs.mountMaterial" :value="m" @change="handleMountMaterialChange" class="md-primary text-white py-0 my-0 mb-3">
                                <div class="d-flex justify-content-between">
                                    <span>{{m}}</span>
                                    <span class="text-right text-white">$900</span>
                                </div>
                            </md-radio>
                        </template>
                    </div>
                    <div v-if="glass.antireflective" class="col-xs-12 col-sm-12 col-md-6 mb-5 d-flex flex-column">
                        <label class="text-white mb-0">Antirreflejante</label><br>
                        <md-radio :value="true" v-model="lenseSpecs.antireflective" @change="handleAntireflectiveChange" class="md-primary text-white py-0 my-0 mb-3">
                            <div class="d-flex justify-content-between">
                                <span>Antirreflejante</span>
                                <span class="text-right text-white">$300</span>
                            </div>
                        </md-radio>
                        <!-- <md-field class="mt-0">
                            <label for="antireflective">Antirreflejante</label>
                            <md-select v-model="lenseSpecs.antireflective" name="antireflective" id="antireflective" @md-selected="handleAntireflectiveChange">
                                <md-option :value="true">Con antirreflejante</md-option>
                                <md-option :value="false">Sin antirreflejante</md-option>
                            </md-select>
                        </md-field> -->
                    </div>
                    <div v-if="glass.photochromatic" class="col-xs-12 col-sm-12 col-md-6 mb-5 d-flex flex-column">
                        <label class="text-white mb-0">Antirreflejante</label><br>
                        <md-radio :value="true" v-model="lenseSpecs.photochromatic" @change="handlePhotochromaticChange" class="md-primary text-white py-0 my-0 mb-3">
                            <div class="d-flex justify-content-between">
                                <span>Fotocrom&aacute;tico</span>
                                <span class="text-right text-white">$500</span>
                            </div>
                            <span class="md-helper-text">Incluye antirreflejante sin costo extra</span>
                        </md-radio>
                        <!-- <md-field class="mt-0">
                            <label for="antireflective">Fotocrom&aacute;tico</label>
                            <md-select v-model="lenseSpecs.photochromatic" name="photochromatic" id="photochromatic" @md-selected="handlePhotochromaticChange">
                                <md-option :value="true">Con efecto fotocrom&aacute;tico</md-option>
                                <md-option :value="false">Sin efecto fotocrom&aacute;tico</md-option>
                            </md-select>
                            <span v-if="lenseSpecs.photochromatic" class="md-helper-text">
                                <md-icon>info</md-icon>
                                Incluye antirreflejante sin costo extra
                            </span>
                        </md-field> -->
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
                    <div v-if="errorMessage != null" class="col-12">
                        <div class="text-left text-warning">
                            {{errorMessage}}
                        </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                        <md-button @click.prevent="goToTab('tab-second')" class="md-raised md-primary ml-0 px-2" type="button">
                            <!-- <span>Siguiente</span> -->
                            Siguiente
                        </md-button>
                    </div>
                </form>
            </md-tab>
            <md-tab :md-active="true" id="tab-second" :md-label="windowWidth <= 540 ? 'Envío' : 'Información de envío'">
                <form class="row mt-3">
                    <div class="col-12">
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
                    <div class="col-12 mt-3 text-right">
                        <md-button @click.prevent="goToTab('tab-third')" class="md-raised md-primary ml-0 px-2" type="button">
                            <!-- <span>Siguiente</span> -->
                            Siguiente
                        </md-button>
                    </div>
                </form>
            </md-tab>
            <md-tab id="tab-third" :md-label="windowWidth <= 540 ? 'Pago' : 'Método de pago'">
                <form class="row mt-3">
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
                            <md-icon v-if="discountCode ? discountCode.value != '' : false">verified</md-icon>
                            <label>Si cuentas con uno escr&iacute;belo</label>
                            <md-input v-model="code"></md-input>
                        </md-field>
                    </div>
                    <div class="col-3">
                        <md-button @click="checkCode()" class="md-primary md-stroked mt-3">Verificar</md-button>
                    </div>
                    <div class="col-12 mt-3 text-right">
                        <md-button @click="goToPay" class="md-raised md-primary ml-0 px-2" type="submit">
                            Siguiente
                        </md-button>
                    </div>
                </form>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'PurchaseForm',
    components: {
        AddressForm: () => import('@/views/User/Addresses/AddressForm.vue')
    },
    data: ()=>({
        selectedFile: null,
        errorMessage: null,
        mountMaterialCharge: null,
        mountIndicator: null ,
        lenseMaterialCharge: null,
        lenseIndicator: null,
        photochromaticCharge: null,
        antireflectiveCharge: null,
        graduationCharge: null,
        showHelp: false,
        withGraduation: false,
        // discount code model
        code: '',
        // window width
        windowWidth: window.innerWidth,
        showLabelOne: false,
        lenseMaterialPrices: {
            'Mica': 300,
            'Policarbonato': 600,
            'Material Illicit': 1200
        }
    }),
    async mounted(){
        this.watchResize()
        let restoredLenseSpecs = this.$cookies.get('lense_specs')
        this.lenseSpecs = restoredLenseSpecs
        await this.getAddresses()
        this.addresses.forEach(address=>{
            if(address.isDefault){
                this.addressId = address.id
                return
            }
        })
    },
    beforeDestroy(){
        window.removeEventListener('resize', this.onResize)
    },
    watch: {
        windowWidth(){
            console.log("new: ", this.windowWidth)
        }
    },
    computed: {
        ...mapState('product',{
            glass: 'glass'
        }),
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
            discountCode: 'discountCode'
        }),
        isLenseMaterialValid(){
            return this.$v.lenseSpecs.lenseMaterial.required ? true : false
        },
        isMountMaterialValid(){
            return this.$v.lenseSpecs.mountMaterial.required ? true : false
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
                this.isLenseMaterialValid && 
                this.isMountMaterialValid && 
                this.isAntireflectiveValid && 
                this.isGraduationValid && 
                this.isAddressValid && 
                this.isPaymentValid
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
            }
        },
        handleChange(e){
            this.selectedFile = e.target.files[0]
            this.lenseSpecs.graduation = this.selectedFile
        },
        handleLenseMaterialChange(value){
            if(this.lenseIndicator){
                switch (this.lenseIndicator) {
                    case "Mica":
                        this.lenseSpecs.price -= 300
                        break;
                    case "Policarbonato":
                        this.lenseSpecs.price -= 600
                        break;
                    case "Material Illicit":
                        this.lenseSpecs.price -= 1200
                        break;
                }
            }
            switch (value) {
                case "Mica":
                    this.lenseMaterialCharge = 300
                    break;
                case "Policarbonato":
                    this.lenseMaterialCharge = 600
                    break;
                case "Material Illicit":
                    this.lenseMaterialCharge = 1200
                    this.lenseSpecs.antireflective ? this.lenseSpecs.price -= 300 : null
                    this.lenseSpecs.antireflective = true
                    break;
            }
            this.lenseIndicator = value
            this.lenseSpecs.price += this.lenseMaterialCharge
        },
        handleMountMaterialChange(value){
            if(this.mountIndicator){
               switch (this.mountIndicator) {
                    case "Titanio":
                        this.lenseSpecs.price -= 100
                        break;
                    case "Acero":
                        this.lenseSpecs.price -= 200
                        break;
                    case "Aluminio":
                        this.lenseSpecs.price -= 300
                        break;
                    case "Pasta":
                        this.lenseSpecs.price -= 400
                        break;
                    case "Acetato":
                        this.lenseSpecs.price -= 500
                        break;
                    case "Otros":
                        this.lenseSpecs.price -= 600
                        break;
                } 
            }
            switch (value) {
                case "Titanio":
                    this.mountMaterialCharge = 100
                    break;
                case "Acero":
                    this.mountMaterialCharge = 200
                    break;
                case "Aluminio":
                    this.mountMaterialCharge = 300
                    break;
                case "Pasta":
                    this.mountMaterialCharge = 400
                    break;
                case "Acetato":
                    this.mountMaterialCharge = 500
                    break;
                case "Otros":
                    this.mountMaterialCharge = 600
                    break;
            }
            this.mountIndicator = value
            this.lenseSpecs.price += this.mountMaterialCharge
        },
        handleAntireflectiveChange(value){
            if(this.lenseSpecs.lenseMaterial != 'Material Illicit'){
                if(value){
                    this.antireflectiveCharge = 300
                }else{
                    this.antireflectiveCharge ? this.antireflectiveCharge = -300 : null
                }
                this.lenseSpecs.price += this.antireflectiveCharge
            }
        },
        handlePhotochromaticChange(value){
            if(value){
                this.photochromaticCharge = 600
            }else{
                this.photochromaticCharge ? this.photochromaticCharge = -600 : null
            }
            this.lenseSpecs.price += this.photochromaticCharge
        },
        watchResize(){
            window.addEventListener('resize', this.onResize)
        },
        onResize(){
            this.windowWidth = window.innerWidth
        },
        checkCode(){
            this.checkForDiscountCode(this.code)
            console.log("Check!")
        },
        goToTab(tab_id){
            this.$refs.tabs.setActiveTab(tab_id)
        }
    },
    validations: {
        lenseSpecs: {
            lenseMaterial: {
                required
            },
            mountMaterial: {
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
    background: black !important;
    height: 100%;
    overflow-y: auto;
    min-height: 725px;
    max-height: 100vH;
    form{
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
        ::v-deep .md-radio-label{
            width: 100% !important;
        }
    }
    ::v-deep .md-tabs{
        max-width: 800px;
        margin: 0 auto;
        .md-tab-nav-button{
            color: white !important;
        } 
        .md-tabs-navigation{
            background: transparent !important;
        }
        .md-tabs-content{
            background: transparent !important;
        }
    }
}
</style>