<template>
    <div class="product">
        <MainBlock />
        <Features />
    </div>
</template>

<script>
import MainBlock from './MainBlock/Index'
import Features from './Features/Index'
import store from '@/store'

export default {
    name: 'Product',
    components: {MainBlock,Features},
    mounted(){
        this.itemId = this.$route.params.id
        this.fetchData();
    },
    data: () => ({
        itemId: null,
        product: {}
    }),
    methods: {
        fetchData(){
            console.log(this.$route.params.id);
            store.dispatch('loading/isLoading',null,{root:true})
            store.dispatch('product/getGlass', this.itemId, {root:true})
                .then(resp=>{
                    console.log("Lente desde vuex: ",resp)
                })
                .catch(err=>{
                    console.log("Error desde vuex: ", err)
                })
                .finally(()=>{
                    store.dispatch('loading/notLoading',null,{root:true})
                })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>