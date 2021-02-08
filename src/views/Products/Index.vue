<template>
    <div class="products">
        <div class="products__header">
            <div class="header-inner">
                <img src="https://source.unsplash.com/1600x900?glasses,white" alt="">
                <div class="header-content">
                    <h2 class="header-title">{{category}}</h2>
                </div>
            </div>
        </div>
        <div class="products__content">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="filters-container mb-0">
                            <md-list class="md-list-filter">
                                <md-list-item class="md-list-filter-item" :md-ripple="false" md-expand>
                                    <md-icon class="md-list-item-icon">filter_list</md-icon>
                                    <span class="md-list-item-text">Filtros</span>
                                    <md-list class="md-list-filters" slot="md-expand">
                                        <md-list-item>
                                            <div class="filters w-100 row">
                                                <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                                    <div class="filter-title">Marca</div>
                                                    <div class="filter-options">
                                                        <md-chip
                                                            class="option"
                                                            v-for="b in brands" 
                                                            :key="b.value"
                                                            @click="onChangeBrand(b)"
                                                            md-clickable
                                                        >{{b.label}}</md-chip>
                                                    </div>
                                                </div>
                                                 <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                                    <div class="filter-title">Precio</div>
                                                    <div class="filter-options">
                                                        <md-chip
                                                            class="option"
                                                            v-for="r in ranges" 
                                                            :key="r.value"
                                                            @click="onChangeMaterial(r)"
                                                            md-clickable
                                                        >{{r.label}}</md-chip>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                                    <div class="filter-title">Material</div>
                                                    <div class="filter-options">
                                                        <md-chip
                                                            class="option"
                                                            v-for="m in materials"
                                                            :key="m.value"
                                                            @click="onChangeRange(m)"
                                                            md-clickable
                                                        >{{m.label}}</md-chip>
                                                    </div>
                                                </div>
                                            </div>
                                        </md-list-item>
                                    </md-list>
                                </md-list-item>
                            </md-list>
                        </div>
                    </div>
                    <template v-if="glasses.length">
                        <template v-for="glass in glasses">
                            <div
                                :key="glass.id"
                                v-if="(glass.designs.length) > 0"
                                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                            >
                                <template>
                                    <ProductCard :product="glass" />
                                </template>
                            </div>
                        </template>
                    </template>
                    <div class="col-12 text-center">
                        <button @click="getData" class="see-more">
                            <span>ver m&aacute;s</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Products',
    components: {ProductCard},
    computed: {
        ...mapState('product',{
            glasses: 'glasses',
            isLoading: 'isLoading'
        })
    },
    async mounted(){
        this.category = this.$route.params.category
        await this.getData()
    },
    data: ()=>({
        brands: [
            {value: 'brand_name_1', label: 'Arnette'},
            {value: 'bvlgari', label: 'Bvlgary'},
            {value: 'costa', label: 'Costa'},
            {value: 'armani', label: 'Armani'},
            {value: 'channel', label: 'Channel'},
            {value: 'coach', label: 'Coach'},
            {value: 'giorgo_armany', label: 'Giorgo Armani'},
            {value: 'burberry', label: 'Burberry'},
            {value: 'dolce_gabbana', label: 'Dolce Gabbana'}
        ],
        materials: [
            {value: 'poli', label: 'Policarbonato'},
            {value: 'plas', label: 'Plástico'},
            {value: 'alum', label: 'Aluminio'}
        ],
        ranges: [
            {value: '200-400', label: '$200 - $400'},
            {value: '401-600', label: '$401 - $600'},
            {value: '601-800', label: '$601 - $800'}
        ],
        selectedBrand: null,
        selectedMaterial: null,
        selectedRange: null,
        category: null
    }),
    methods: {
        ...mapActions('product',{
            getData: 'getGlasses'
        }),
        onChangeBrand(v){
            console.log("Value: ", v)
            this.selectedBrand = v
        },
        onChangeMaterial(v){
            console.log("Value: ", v)
            this.selectedMaterial = v
        },
        onChangeRange(v){
            console.log("Value: ", v)
            this.selectedRange = v
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.products {
    position: relative;
    z-index: 5;
    background-color: white;
    &__header {
        top: 0;
        left: 0;
        height: 80vh;
        position: relative;
        width: 100%;
        z-index: 10;
        overflow: hidden;
        .header-inner {
            height: 100%;
            background: rgba(33,33,33,.5);
            img {
                position: relative;
                z-index: -1;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            .header-content{
                position: absolute;
                z-index: 99;
                left: 20px;
                top: calc(80vH / 2);
                transform: translateY(-50%);
                .header-title{
                    font-size: 40px;
                    text-transform: uppercase;
                    color: $main-green;
                    @media #{$break-medium}{
                        font-size: 80px;
                    }
                }
            }
        }
    }
    &__content {
        min-height: 100vH;
        // margin-top: calc(30vh - 50px);
        position: relative;
        z-index: 20;
        background-color: white;
        -webkit-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        padding: 50px 0;
        // box-sizing: content-box;
        .see-more{
            @include call-to-action-2(black);
        }
        .filters-container{
            .md-list-filter{
                background: transparent !important;
                .md-list-item-icon{
                    margin-right: 10px !important;
                }
                .md-list-filters{
                    background: transparent !important;
                    .filters{
                        .filter-title{
                            font-size: 16px;
                            margin: 0 0 4px 10px;
                        }
                        .filter-options{
                            padding: 0;
                            list-style: none;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            .option{
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.md-list-item-expand{
    border: 0px !important;
}
::v-deep .md-list-item-content{
    &:hover{
        background: transparent !important;
    }
}
</style>
