<template>
	<div>
		<div v-if="brands.length > 0">
			<carousel
				class="carousel"
				:nav="false"
				:dots="false"
				:loop="true"
				:mouseDrag="false"
				:touchDrag="false"
				:pullDrag="false"
				:navSpeed="1500"
				:autoplay="true"
				:autoplaySpeed="false"
				:autoplayHoverPause="false"
				:responsive="{
					0: {
						items: 1,
					},
					576: {
						items: 4,
					},
					992: {
						items: 6,
					},
				}"
			>
				<template v-for="(brand, i) in brands">
					<div class="brand-item" :key="i">
						<img :src="brand" alt="" />
					</div>
				</template>
			</carousel>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Brands',
	computed: {
		...mapState('brands', {
			brands: 'brands',
			error: 'error',
			isLoading: 'isLoading',
		}),
	},
	async mounted() {
		await this.getBrands()
	},
	methods: {
		...mapActions('brands', {
			getBrands: 'getBrands',
		}),
	},
}
</script>

<style lang="scss" scoped>
.carousel {
	padding: 30px 0;
	.brand-item {
		height: 100px;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
}
</style>
