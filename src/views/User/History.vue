<template>
	<div>
		<md-card class="my-4">
			<md-card-header>
				<div class="md-title">Historial de compras</div>
			</md-card-header>
			<md-card-content>
				<template v-if="history.length === 0">
					<md-empty-state
						md-icon="shopping_cart"
						md-label="No tienes ninguna compra registrada."
						md-description="Al realizar compras, podrás verlas aquí."
					></md-empty-state>
				</template>
				<template v-else>
				</template>
			</md-card-content>
		</md-card>
	</div>
</template>

<script>
import {Get} from "@/api/api";

export default {
	name: "History",
	async mounted() {
		await this.fetchData();
	},
	data: () => ({
		loading: false,
		history: [],
	}),
	methods: {
		/**
		 * @description
		 * The `fetchData` method will fetch the user's order history.
		 * @return {Promise<void>}
		 */
		async fetchData() {
			this.loading = true;
			let { data: history } = await Get({
				endpoint: 'orders/me',
				useToken: true,
			});
			this.history = history;
			this.loading = false;
		},
	},
}
</script>

<style scoped lang="scss">

</style>
