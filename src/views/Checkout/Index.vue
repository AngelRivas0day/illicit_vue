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
	mounted() {
		document.title = 'Illicit Óptica - Pago'
	},
	components: {
		PurchaseForm,
		PurchaseItem,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.checkout {
	width: 100vw;
	@include flex('column', 'stretch', 'center');
	@media #{$break-large} {
		@include flex('row', 'stretch', 'center');
	}
	&-item {
		height: auto;
		@media #{$break-large} {
			flex: 1;
			width: 250px;
			min-width: 250px;
			height: 100vh;
		}
	}
	&-specs {
		flex: 3;
		@media #{$break-large} {
			width: calc(100vh - 250px);
		}
	}
}
</style>
