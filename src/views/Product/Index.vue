<template>
    <div class="product">
        <MainBlock />
        <Features />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Features from './Features/Index'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Product',
    components: {
        MainBlock,
        Features
    },
    mounted(){
        let itemSlug = this.$route.params.slug
        this.glasses.forEach(glass => {
            if(itemSlug == glass.slug){
                this.fetchData(glass.id)
            }
        })
    },
    data: () => ({
        itemId: null,
        product: {}
    }),
    computed: {
        ...mapState('product',{
            glasses: 'glasses'
        })
    },
    methods: {
        ...mapActions('product',{
            fetchData: 'getGlass'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>