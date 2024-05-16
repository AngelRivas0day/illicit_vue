<template>
    <div class="home-page">
        <Banner />
        <Brands />
        <Products />
        <Categories :categories="categories" />
        <Contact />
    </div>
</template>

<script>
import Banner from './Banner'
import Products from './Products'
import Brands from './Brands'
import Categories from './Categories'
import Contact from './Contact'
import {mapActions} from "vuex";
import {Get} from "@/api/api";

export default {
    name: 'Home',
    components: {Banner,Products,Brands,Categories,Contact},
	data: () => ({
		activeEvents: [],
		upComingEvents: [],
		banners: [],
		categories: [],
	}),
	async mounted() {
		this.unsetWhiteIcons();
		await this.fetchData();
	},
	methods: {
		...mapActions('background', {
			unsetWhiteIcons: 'unsetWhiteIcons',
		}),
		async fetchData() {
			let [
				{data:banners},
				{data:upComingEvents},
				{data:activeEvents},
				{data:categories},
			] = await Promise.all([
				Get({
					endpoint: 'banners',
					useToken: false,
				}),
				Get({
					endpoint: 'events/up-coming',
					useToken: false,
				}),
				Get({
					endpoint: 'events/active',
					useToken: false,
				}),
				Get({
					endpoint: 'categories',
					useToken: false,
				}),
			]);
			this.banners = banners;
			this.upComingEvents = upComingEvents;
			this.activeEvents = activeEvents;
			this.categories = categories;
		},
	},
}
</script>

<style>

</style>
