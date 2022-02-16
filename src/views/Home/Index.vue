<template>
	<div class="home-page">
		<Banner />
		<Brands />
		<Steps />
		<Products />
		<Categories />
		<Offers />
		<Contact />
	</div>
</template>

<script>
import Banner from './Banner'
import Products from './Products'
import Brands from './Brands'
import Categories from './Categories'
import Contact from './Contact'
import Offers from './Offers'
import Steps from './Steps.vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Home',
	components: { Banner, Products, Brands, Categories, Contact, Offers, Steps },
	mounted() {
		document.title = 'Illicit Óptica - Inicio'
		this.unsetWhiteIcons()
	},
	computed: {
		...mapState('background', {
			whiteIcons: 'whiteIcons',
		}),
	},
	methods: {
		...mapActions('background', {
			unsetWhiteIcons: 'unsetWhiteIcons'
		})
	}
}
</script>

<style lang="scss">
.home-page {
	background: #f7f7f7;
}
</style>
