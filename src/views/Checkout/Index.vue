<template>
    <div class="checkout">
        test
    </div>
</template>

<script>
export default {
    name: 'Checkout',
    mounted(){
        this.fetchData();
    },
    methods: {
        fetchData(){
            console.log(this.$router.params.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.checkout{
    background: #333;
    padding: 30px 0;
    box-shadow: inset 2px 0px 300px -121px rgba(0,0,0,0.3);
}
</style>
