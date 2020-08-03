<template>
    <div class="product">
        <MainBlock :productImages="productImages" :productInfo="productInfo" />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'

export default {
    name: 'Product',
    components: {MainBlock},
    beforeMount(){
        this.fetchData();
    },
    data: () => ({
        product: {}
    }),
    computed: {
        productImages(){
            return this.product.colors;
        },
        productInfo(){
            return {
                id: this.product.id,
                name: this.product.name,
                description: this.product.description,
                price: 2000
            };
        }
    },
    methods: {
        fetchData(){
            console.log(this.$route.params.id);
            this.product = {
                id: this.$route.params.id,
                name: 'Rodia Raskolnikov',
                description: 'Lorem ipsum dolor sit amet, consectetur aditis',
                colors: [
                    {
                        id: 1,
                        color: '#333333',
                        images: [
                            {
                                image: "",
                                lazyLoad: ""
                            }
                        ]
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>