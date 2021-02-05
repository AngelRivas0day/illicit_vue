<template>
    <div class="product">
        <MainBlock />
        <Specs />
        <FaceMeasure />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Specs from './Specs/Index'
import FaceMeasure from './FaceMeasure/Index'
import { mapActions } from 'vuex'

export default {
    name: 'Product',
    components: {
        MainBlock,
        Specs,
        FaceMeasure
    },
    mounted(){
        let itemId = this.$route.params.id
        // this function sets the glass item inside
        // the product module e.x state.glass
        this.getGlass(itemId)
    },
    data: () => ({
        itemId: null,
    }),
    methods: {
        ...mapActions('product',{
            getGlass: 'getGlass'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>