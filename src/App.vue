<template>
	<div id="app">
		<notifications position="top left" class="mt-1" group="user" />
		<MainLayout />
	</div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
export default {
	name: 'app',
	components: { MainLayout },
	mounted() {
		document.title = 'Illicit Óptica - Inicio'
	},
}
</script>

<style lang="scss">

#app {
	overflow-x: hidden;
	width: 100%;
}
</style>
