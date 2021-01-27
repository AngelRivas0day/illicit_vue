<template>
    <div class="product">
        <MainBlock />
        <Features />
        <Specs />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Features from './Features/Index'
import Specs from './Specs/Index'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Product',
    components: {
        MainBlock,
        Features,
        Specs
    },
    mounted(){
        let itemId = this.$route.params.id
        console.log(itemId)
        // this.glasses.forEach(glass => {
        //     if(itemSlug == glass.slug){
                this.getGlass(itemId)
        //     }
        // })
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
            getGlass: 'getGlass'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>