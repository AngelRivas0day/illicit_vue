<template>
	<div class="top-nav">
		<md-tabs md-alignment="centered">
			<md-tab v-for="tab in tabs" :key="tab.id" :md-icon="tab.icon" :md-label="tab.label" @click="setTab(tab.component)"></md-tab>
		</md-tabs>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'TopNav',
	methods: {
		...mapActions('user', {
			setTab: 'setTab',
		}),
	},
	data: () => ({
		tabs: [
			{ id: 'tab-user-info', icon: 'account_circle', label: 'Perfil', component: 'UserInfo' },
			{ id: 'tab-user-history', icon: 'receipt_long', label: 'Compras', component: 'UserHistory' },
			{ id: 'tab-user-coupons', icon: 'local_offer', label: 'Cupones', component: 'UserCoupons' },
		],
	}),
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.top-nav {
	position: relative;
	width: 100;
	background: white;
	padding-top: 50px;
}
</style>
