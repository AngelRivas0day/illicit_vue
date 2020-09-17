<template>
    <div class="checkout">
        <div class="checkout-item">
            <PurchaseItem />
        </div>
        <div class="checkout-specs">
            <PurchaseForm />
        </div>
    </div>
</template>

<script>
import PurchaseForm from './PurchaseForm/Index'
import PurchaseItem from './PurchaseItem/Index'

export default {
    name: 'Checkout',
    components: {
        PurchaseForm,
        PurchaseItem
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.checkout{
    // @include flex('column','center','center');
    @media #{$break-medium}{
        @include flex('row','stretch','center');
    }
    &-item{
        height: auto;
        @media #{$break-medium}{
            flex: 1;
            width: 250px;
            min-width: 250px;
            height: 100vH;
        }
    }
    &-specs{
        flex: 3;
    }
}
</style>
