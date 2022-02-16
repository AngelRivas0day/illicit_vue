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
	},
	mounted() {
		document.title = 'Illicit Óptica - Cuenta'
		if (!localStorage.getItem('token')) {
			this.$router.push({ name: 'Auth' })
		}
		this.unsetWhiteIcons()
	},
	components: {
		TopNav: () => import('./TopNav/Index'),
		Tabs,
	},
}
</script>

<style></style>
