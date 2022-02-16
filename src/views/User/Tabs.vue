<template>
	<div class="tabs">
		<!-- <keep-alive> -->
		<component :is="activeTab" />
		<!-- </keep-alive> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Tabs',
	components: {
		UserInfo: () => import('./UserInfo/Index'),
		UserHistory: () => import('./UserHistory/Index'),
	},
	computed: {
		...mapState('user', {
			activeTab: 'activeTab',
		}),
	},
}
</script>

<style lang="scss">
.tabs {
	min-height: 100vh;
	width: 100%;
	padding: 20px 30px;
}
</style>
