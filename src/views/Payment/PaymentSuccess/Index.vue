<template>
    <div>
        <div class="payment-success">
            <div class="payment-success__title mb-4">Compra exitosa</div>
            <div class="payment-success__message mb-3">Los detalles han sido enviados a tu WhatsApp o tambi&eacute;n puedes consultarlos aqu&iacute;:</div>
            <div class="from-top fancy-button" @click="goToOrders">Ver detalles</div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PaymentSuccess',
    async mounted(){
        let { order_id } = this.$route.query
        if(order_id){
            await this.confirm(order_id)
        }
    },
    methods: {
        ...mapActions('user',{
            setTab: 'setTab'
        }),
        ...mapActions('order',{
            confirmPayment: 'confirmPayment'
        }),
        goToOrders(){
            this.setTab('UserHistory')
            this.$router.push({name: 'User'})
        },
        async confirm(order_id){
            console.log("order id: ", order_id)
            await this.confirmPayment(order_id)
        }
    }
}
</script>

<style lang="scss" scoped>
.payment-success{
    box-shadow: inset 2px 0px 300px -121px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vH;
    width: 100%;
    &__title{
        font-family: 'Poiret One', cursive;
        font-size: 35px;
        span{
            font-weight: bold;
        }
    }
    &__message{
        font-family: 'Raleway', sans-serif;
        span{
            font-weight: bold;
        }
    }
    .fancy-button{
        position: relative;	
        padding: 10px 25px;
        padding-right: 25px;
        font-size: 16px;
        color: black;
        letter-spacing: .3rem;
        text-transform: uppercase;
        transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);	
        cursor: pointer;
        user-select: none;
        z-index: 99;
        &:before, &:after {
            content: '';
            position: absolute;	
            transition: inherit;
            z-index: -1;
        }
        &:hover {
            color: white;
            transition-delay: .5s;
        }
        &:hover:before {
            transition-delay: 0s;
        }

        &:hover:after {
            background: black;
            transition-delay: .35s;
        }
        &:before, 
        &:after {
            left: 0;
            height: 0;
            width: 100%;
        }

        &:before {
            bottom: 0;	
            border: 1px solid black;
            border-top: 0;
            border-bottom: 0;
        }

        &:after {
            top: 0;
            height: 0;
        }

        &:hover:before,
        &:hover:after {
            height: 100%;
        }
    }
}
</style>