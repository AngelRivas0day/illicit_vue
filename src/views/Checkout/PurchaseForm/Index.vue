<template>
    <div class="checkout-main">
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
        <div v-if="!lastStep" class="container-fluid checkout__container">
            <div class="row">
                <div class="col-md-12 col-lg-4">
                    <div class="image-container d-flex align-items-center justify-content-center">
                        <img class="step-image" src="http://via.placeholder.com/350x350" alt="">
                    </div>
                </div>
                <div class="col-md-12 col-lg-8">
                    <md-tabs @md-changed="onTabChange" ref="tabs">
                        <md-tab id="tab-first" :md-label="windowWidth <= 540 ? 'Graduación' : 'Graduación'">
                            <Graduation />
                            <div class="d-block w-100 text-right">
                                <md-button @click="goToTab('tab-second')" class="md-primary md-raised md-dense">Siguiente</md-button>
                            </div>
                        </md-tab>
                        <md-tab id="tab-second" :md-label="windowWidth <= 540 ? 'Armazón' : 'Armazón'">
                            <MountMaterials />
                            <div class="d-block w-100 text-right">
                                <md-button @click="goToTab('tab-third')" class="md-primary md-raised md-dense">Siguiente</md-button>
                            </div>
                        </md-tab>
                        <md-tab id="tab-third" :md-label="windowWidth <= 540 ? 'Lente' : 'Lente'">
                            <LenseMaterials />
                            <div class="d-block w-100 text-right">
                                <md-button @click="goToTab('tab-fourth')" class="md-primary md-raised md-dense">Siguiente</md-button>
                            </div>
                        </md-tab>
                        <md-tab id="tab-fourth" :md-label="windowWidth <= 540 ? 'Extras' : 'Extras'">
                            <Extras v-if="activeTab == 'tab-fourth'" />
                            <div class="d-block w-100 text-right">
                                <md-button @click="goToTab('last')" class="md-primary md-raised md-dense">Siguiente</md-button>
                            </div>
                        </md-tab>
                    </md-tabs>
                </div>
            </div>
        </div>
        <div v-if="lastStep" class="container-fluid checkout__last-step">
            <div class="row no-gutters">
                <div class="col-xs-12 col-sm-12 col-md-8">
                    <div class="row last-step--inner">
                        <div class="col-12 mb-5">
                            <button @click="lastStep = false" class="go-back">
                                <div class="go-back--inner d-flex flex-row align-items-center justify-content-center">
                                    <md-icon class="mr-1 text-white icon">keyboard_arrow_left</md-icon>
                                    <span class="text-white label">atr&aacute;s</span>
                                </div>
                            </button>
                        </div>
                        <div class="col-12">
                            <Final />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'PurchaseForm',
    components: {
        AddressForm:    () => import('@/views/User/Addresses/AddressForm.vue'),
        Graduation:     () => import('./Graduation'),
        MountMaterials: () => import('./MountMaterials'),
        LenseMaterials: () => import('./LenseMaterials'),
        Extras:         () => import('./Extras'),
        Final:          () => import('./Final')
    },
    data: ()=>({
        showHelp: false,
        withGraduation: false,
        windowWidth: window.innerWidth,
        lastStep: false,
        activeTab: null
    }),
    async mounted(){
        this.watchResize()
        // let restoredLenseSpecs = this.$cookies.get('lense_specs')
        // this.lenseSpecs = restoredLenseSpecs
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
        })
    },
    methods: {
        ...mapActions('addresses',{
           getAddresses:'getAddresses'
        }),
        ...mapActions('order',{
           createOrder:'createOrder',
           checkForDiscountCode: 'checkForDiscountCode'
        }),
        watchResize(){
            window.addEventListener('resize', this.onResize)
        },
        onResize(){
            this.windowWidth = window.innerWidth
        },
        // checkCode(){
        //     this.checkForDiscountCode(this.code)
        // },
        goToTab(tab_id){
            this.validateTab(tab_id)
        },
        onTabChange(e){
            this.validateTab(e)
        },
        validateTab(value){
            let valid = false
            switch(value){
                case "tab-second":
                    valid = this.lenseSpecs.graduation_type != undefined
                    break;
                case "tab-fourth":
                    valid = this.lenseSpecs.lenseMaterial != undefined
                    break;
                case 'last':
                    valid = this.lenseSpecs.extra != undefined 
                    break;
                default:
                    valid = true
                    break;
            }
            if(valid){
                if(value == 'last'){
                    this.lastStep = true
                }else{
                    this.$refs.tabs.setActiveTab(value)
                    this.activeTab = value
                }
            }else{
                switch(value){
                    case 'tab-second':
                        this.$refs.tabs.setActiveTab('tab-first') 
                        this.activeTab = 'tab-first'
                        break;
                    case 'tab-fourth':
                        this.$refs.tabs.setActiveTab('tab-third') 
                        this.activeTab = 'tab-third'
                        break;
                }
            }
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


.checkout-main{
    padding: 0;
    box-sizing: border-box;
    background-color: #222222;
    min-height: calc(100vH - 120px);
    @media #{$break-large}{ 
        padding: 60px 0;
        min-height: initial;
    }
    .checkout__container{
        width: 100%;
        ::v-deep .md-tabs{
            max-width: 800px;
            //  @media #{$break-large}{ 
            //     max-width: 600px;
            // }
            // margin: 0 auto;
            .md-tab-nav-button{
                color: white !important;
            } 
            .md-tabs-navigation{
                background: transparent !important;
                // pointer-events: none !important;
            }
            .md-tabs-content{
                background: transparent !important;
            }
        }
        .image-container{
            height: auto;
            padding: 20px 0;
            @media #{$break-large}{
                min-height: calc(100vH - 120px);
            }
            .step-image{
                width: 350px;
                height: 350px;
                object-fit: contain;
            }
        }
    }
    .checkout__last-step{
        padding: 60px 0;
        box-sizing: border-box;
        background-color: #222222;
        min-height: calc(100vH - 120px);
        .last-step--inner{
            max-width: 800px;
        }
        .go-back{
            border: none;
            background-color: transparent;
            .icon{
                font-size: 22px !important;
            }
            .label{
                font-size: 18px;
            }
        }
    }
}
</style>