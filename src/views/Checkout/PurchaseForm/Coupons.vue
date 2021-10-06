<template>
	<div>
		<div class="container-fluid mx-0 px-0 mb-4">
			<div class="row no-gutters">
				<div class="col-12">
					<h2 class="md-title text-white">Cupones:</h2>
				</div>
				<template v-if="coupons.length != 0">
					<template v-for="c in coupons">
						<div v-show="dirtyCoupons && validDiscountCode ? selectedCouponId == c.id : true" :key="c.id" class="col-xs-12 col-sm-12 col-md-4">
							<md-card :class="{ active: selectedCouponId == c.id }" class="mr-3">
								<md-card-content>
									<p class="mb-0"><strong>Descuento:</strong> ${{ c.value }}</p>
								</md-card-content>
								<md-card-actions>
									<md-button class="md-dense" v-on:click="selectCoupon(c.id)">
										{{ selectedCouponId == c.id ? 'Cancelar' : 'Seleccionar' }}
									</md-button>
								</md-card-actions>
							</md-card>
						</div>
					</template>
				</template>
				<div v-if="validDiscountCode == true" class="col-12">
					<h2 class="md-title valid-coupon">Cup&oacute;n v&aacute;lido</h2>
				</div>
				<div v-if="!selectedCouponId || !validDiscountCode" class="col-12 mt-3">
					<form class="row no-gutters">
						<div class="col-xs-12 col-sm-12 col-md-6">
							<md-field>
								<label>Cup&oacute;n</label>
								<md-input v-model="coupon"></md-input>
							</md-field>
						</div>
						<div class="col-xs-2">
							<md-button @click="applyCoupon(coupon)" class="md-stroked md-primary md-dense mt-3"> Verificar </md-button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
	name: 'Coupons',
	computed: {
		...mapState('order', {
			discountCode: 'discountCode',
		}),
		...mapFields('order', {
			validDiscountCode: 'validDiscountCode',
			discountPrice: 'discountPrice',
		}),
	},
	data: () => ({
		coupons: [{ id: 'test-promo-max-uses', value: 400 }],
		selectedCouponId: null,
		dirtyCoupons: false,
		coupon: '',
	}),
	methods: {
		...mapActions('order', {
			checkForDiscountCode: 'checkForDiscountCode',
		}),
		async selectCoupon(couponId) {
			if (this.selectedCouponId == couponId) {
				this.resetDiscount()
				this.dirtyCoupons = false
				this.selectedCouponId = null
				this.validDiscountCode = false
			} else {
				this.dirtyCoupons = true
				this.selectedCouponId = couponId
				await this.applyCoupon(this.selectedCouponId)
			}
		},
		async applyCoupon(coupon) {
			await this.checkForDiscountCode(coupon)
			console.log('Valid: ', this.validDiscountCode)
			if (this.validDiscountCode) this.discountMoney()
		},
		discountMoney() {
			console.log('lmao')
			this.discountPrice = parseInt(this.discountCode.value) * -1
		},
		resetDiscount() {
			this.discountPrice = 0
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.md-card {
	cursor: pointer;
	background-color: rgba(213, 213, 213, 0.8);
	&.active {
		background-color: rgb(233, 233, 233) !important;
	}
}
.valid-coupon {
	padding: 0;
	margin: 16px 0 0 0;
	color: green;
}
</style>
