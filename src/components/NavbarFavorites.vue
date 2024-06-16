<script>
export default {
	name: "NavbarFavorites",
	props: {
		whiteIcons: {
			type: Boolean,
			required: false,
			default: false,
		},
		favorites: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
}
</script>

<template>
	<md-menu md-align-trigger>
		<md-button md-menu-trigger class="mb-0 md-icon-button md-dense mr-3">
			<md-icon :style="{ color: whiteIcons ? 'white' : '#333333' }">favorite</md-icon>
		</md-button>
		<md-menu-content>
			<md-menu-item
				v-for="option in favorites"
				:key="option.id"
				@click="$router.push({ name: 'Product', params: { id: option.glassId } })"
			>
				{{ option.glassName }}
			</md-menu-item>
			<md-menu-item v-if="favorites.length === 0">
				<span style="white-space: break-spaces;">
					No has agregado productos a favoritos
				</span>
			</md-menu-item>
		</md-menu-content>
	</md-menu>
</template>

<style scoped lang="scss">

</style>
