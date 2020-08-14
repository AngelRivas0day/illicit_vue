<template>
    <div class="product">
        <MainBlock />
        <Features />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Features from './Features/Index'
import { mapActions } from 'vuex'

export default {
    name: 'Product',
    components: {MainBlock,Features},
    mounted(){
        this.itemId = this.$route.params.id
        this.fetchData(this.itemId);
    },
    data: () => ({
        itemId: null,
        product: {}
    }),
    methods: {
        ...mapActions('product',{
            fetchData: 'getGlass'
        })
    }
}
</script>

<style lang="scss" scoped>
</style>