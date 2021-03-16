<template>
    <div class="product">
        <template v-if="isLoading">
            <SkeletonProduct />
        </template>
        <template v-else>
            <MainBlock />
            <Specs />
            <FaceMeasure />
        </template>
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Specs from './Specs/Index'
import FaceMeasure from './FaceMeasure/Index'
import SkeletonProduct from './SkeletonProduct'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Product',
    components: {
        MainBlock,
        Specs,
        FaceMeasure,
        SkeletonProduct
    },
    async mounted(){
        let { id } = this.$route.params
        await this.getGlass(id)
    },
    beforeDestroy(){
        this.clearData()
    },
    computed: {
        ...mapState('product',{
            isLoading: 'isLoading'
        })
    },
    methods: {
        ...mapActions('product',{
            getGlass: 'getGlass',
            clearData: 'clearData'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>