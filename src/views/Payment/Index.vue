<template>
	<div class="payment">
		<BaseLoading v-if="isLoading" />
		<component v-if="!isLoading" :is="activeComponent" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'PaymentLayout',
	components: {
		CardPayment: () => import('./CardPayment/Index.vue'),
		StorePayment: () => import('./StorePayment/Index.vue'),
		BaseLoading: () => import('@/components/BaseLoading.vue'),
	},
	mounted() {
		if (this.paymentMethod == 'store') {
			this.activeComponent = 'StorePayment'
		} else if (this.paymentMethod == 'card') {
			this.activeComponent = 'CardPayment'
		}
	},
	data: () => ({
		activeComponent: '',
	}),
	computed: {
		...mapState('order', {
			paymentMethod: 'paymentMethod',
			isLoading: 'isLoading',
		}),
	},
}
</script>

<style></style>
