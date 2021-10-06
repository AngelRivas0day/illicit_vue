<template>
	<div class="loader" :class="{ fullScreen: fullScreen }">
		<md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
	</div>
</template>

<script>
export default {
	name: 'TransparentLoading',
	props: {
		fullScreen: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style lang="scss">
.loader {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.fullScreen {
		min-height: 100vh;
	}
}
</style>
