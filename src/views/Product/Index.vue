<template>
    <div class="product">
        <template v-if="isLoading">
            <SkeletonProduct />
        </template>
        <template v-else>
            <MainBlock />
            <Specs />
        </template>
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Specs from './Specs/Index'
import SkeletonProduct from './SkeletonProduct'
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'Product',
    components: {
        MainBlock,
        Specs,
        SkeletonProduct
    },
    async mounted(){
        this.unsetWhiteIcons()
        let { id } = this.$route.params
        await this.getGlass(id)
        this.lenseSpecs = { // vuex binding
            id: this.glass.id,
            name: this.glass.name,
            slug: this.glass.slug,
        }
        if(this.glass.offer)
            this.lenseSpecs.price = parseInt(this.glass.price) - parseInt(this.glass.offer.value)
        else
            this.lenseSpecs.price = parseInt(this.glass.price) 
    },
    computed: {
        ...mapState('product',{
            isLoading: 'isLoading',
            glass: 'glass'
        }),
        ...mapFields('order',{
            lenseSpecs: 'lenseSpecs'
        })
    },
    methods: {
        ...mapActions('product',{
            getGlass: 'getGlass',
        }),
        ...mapActions('background', {
            unsetWhiteIcons: 'unsetWhiteIcons'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
