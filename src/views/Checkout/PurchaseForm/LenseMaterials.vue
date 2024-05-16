<template>
    <div>
        <div class="lense-materials-step">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <template v-for="gd in lense_materials">
                        <div :key="gd.value" class="col-12">
                            <md-radio @change="onChange(gd)" class="md-primary" v-model="lense_material" :value="gd.value">
                                <div class="d-flex-column justify-content-between">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="text-white custom-radio-label">{{gd.label}}</span>
                                        <span class="text-right text-white custom-radio-price">{{gd.price == 'GRATIS' ? 'GRATIS' : '$'+gd.price}}</span>
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
    name: 'LenseMaterials',
    mounted(){
        this.lense_material = this.lenseSpecs.lenseMaterial
    },
    data: () => ({
        lense_materials: [
            {
                value: 'mica',
                label: 'Mica',
                price: 'GRATIS',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            },
            {
                value: 'policarbonato',
                label: 'Policarbonato',
                price: 300,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            },
            {
                value: 'poliverga',
                label: 'Poliverga',
                price: 1000,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            }
        ],
        lense_material: null
    }),
    computed: {
        ...mapFields('order',{
            lenseMaterialCurrentPrice: 'lenseMaterialCurrentPrice',
            lenseSpecs: 'lenseSpecs'
        })
    },
    methods: {
        onChange(value){
            this.lenseMaterialCurrentPrice = value.price == 'GRATIS' ? 0 : value.price
            this.lenseSpecs.lenseMaterial = value.value
        }
    }
}
</script>

<style lang="scss" scoped>
.lense-materials-step{
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
    //::v-deep .md-radio{
    //    margin-bottom: 10px;
    //    max-width: 500px;
    //}
    //::v-deep .md-radio .md-radio-container{
    //    border-color: #fff !important;
    //}
    //::v-deep .md-field.md-theme-default:after {
    //    background-color: white !important;
    //}
    //::v-deep .md-field.md-theme-default:before {
    //    background-color: white !important;
    //}
    //::v-deep .md-radio-label{
    //    width: 100% !important;
    //    height: auto !important;
    //}
}
</style>
