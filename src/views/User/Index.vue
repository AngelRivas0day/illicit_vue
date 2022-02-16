<template>
	<div class="profile">
		<TopNav />
		<Tabs />
	</div>
</template>

<script>
import Tabs from './Tabs'
import { mapActions } from 'vuex'
export default {
	name: 'User',
	methods: {
		...mapActions('background', {
			unsetWhiteIcons: 'unsetWhiteIcons',
		}),
		...mapActions('user', {
			setTab: 'setTab',
		}),
		verifyQueryParams() {
			if (this.$route.query.goToOrders)
				this.setTab('UserHistory')
		}
	},
	mounted() {
		document.title = 'Illicit Óptica - Cuenta'
		if (!localStorage.getItem('token')) {
			this.$router.push({ name: 'Auth' })
		}
		this.unsetWhiteIcons()
		this.verifyQueryParams()
	},
	components: {
		TopNav: () => import('./TopNav/Index'),
		Tabs,
	},
}
</script>

<style></style>
