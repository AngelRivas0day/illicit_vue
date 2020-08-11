<template>
    <div class="products">
    <div class="products__header">
        <div class="header-inner">
           <img src="https://source.unsplash.com/1600x900?glasses,white" alt="">
        </div>
    </div>
    <div class="products__content">
        <div class="container">
            <div class="row">
                <template v-if="glasses.length">
                    <div v-for="glass in glasses" :key="glass.id" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                        <template v-if="(glass.designs.length) > 0">
                            <ProductCard :product="glass" />
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProductCard from './ProductCard'
import store from '@/store'
import { getGlasses } from '@/api/products'

export default {
    name: 'Products',
    components: {ProductCard},
    data: () => ({
        glasses: [],
        start: 0,
        limit: 20
    }),
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            store.dispatch('loading/isLoading',null,{root:true})
            getGlasses(this.start, this.limit)
                .then(resp=>{
                    console.log(resp)
                    this.glasses = resp.data
                })
                .catch(err=>{
                    console.log(err)
                })
                .finally(()=>{
                    store.dispatch('loading/notLoading',null,{root:true})
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/vars";

.products {
    position: relative;
    z-index: 5;
    background-color: white;
    &__header {
        top: 0;
        left: 0;
        height: 30vh;
        position: fixed;
        width: 100%;
        z-index: 10;
        overflow: hidden;
        .header-inner {
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
    &__content {
        min-height: 100vH;
        margin-top: calc(30vh - 50px);
        position: relative;
        z-index: 20;
        background-color: white;
        -webkit-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        padding: 50px 0;
        // box-sizing: content-box;
    }
}
</style>
