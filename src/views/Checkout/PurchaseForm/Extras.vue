<template>
    <div>
        <div class="extras-step">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <template v-for="gd in extras">
                        <div :key="gd.value" class="col-12">
                            <md-radio @change="onChange(gd)" class="md-primary" v-model="extra" :value="gd.value">
                                <div class="d-flex-column justify-content-between">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="text-white custom-radio-label">{{gd.label}}</span>
                                        <span v-if="gd.value == 'Antirreflejante' && (lenseSpecs.lenseMaterial == 'Poliverga' || lenseSpecs.graduation_type == 'neutros')" class="text-right text-white custom-radio-price"><del>{{gd.price == 'GRATIS' ? 'GRATIS' : '$'+gd.price}}</del> GRATIS</span>
                                        <span v-else class="text-right text-white custom-radio-price">{{gd.price == 'GRATIS' ? 'GRATIS' : '$'+gd.price}}</span>
                                    </div>
                                    <span class="f-100 md-helper-text text-white custom-radio-helper">{{gd.text}}</span>
                                </div>
                            </md-radio>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    name: 'Extras',
    data: () => ({
        extras: [
            {
                value: 'antireflective',
                label: 'Antirreflejante',
                price: 600,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            },
            {
                value: 'photochromatic',
                label: 'Fotocromático',
                price: 1200,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            }
        ],
        extra: null
    }),
    mounted(){
        console.log("Mounted extras!")
        this.extra = this.lenseSpecs.extra
    },
    computed: {
        ...mapFields('order',{
            extrasCurrentPrice: 'extrasCurrentPrice',
            lenseSpecs: 'lenseSpecs'
        }),
    },
    methods: {
        onChange(value){
            if(this.lenseSpecs.lenseMaterial == 'Poliverga' || this.lenseSpecs.graduation_type == 'neutros'){
                if(value.value == 'antireflective'){
                    this.extrasCurrentPrice = 0
                }else{
                    this.extrasCurrentPrice = value.price == 'GRATIS' ? 0 : value.price
                }
            }else{
                this.extrasCurrentPrice = value.price == 'GRATIS' ? 0 : value.price
            }
            this.lenseSpecs.extra = value.value
        }
    }
}
</script>

<style lang="scss" scoped>
.extras-step{
    .custom-radio{
        &-label{
            font-size: 18px;
        }
        &-price{
            font-size: 16px;
        }
        &-helper{
            font-size: 16px;
            line-height: 1.4em;
        }
    }
    ::v-deep .md-radio{
        margin-bottom: 10px;
        max-width: 500px;
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
    ::v-deep .md-radio-label{
        width: 100% !important;
        height: auto !important;
    }
}
</style>