<template>
	<div class="orders">
		<OrderDetails v-if="showDialog && currentOrder" :order="currentOrder" />
		<div v-if="orders">
			<md-table v-model="orders" @md-selected="onSelect">
				<md-table-row slot="md-table-row" slot-scope="{ item }" @click="onSelect(item)">
					<md-table-cell md-label="Producto" md-sort-by="Producto">{{ item.specs.name }}</md-table-cell>
					<md-table-cell md-label="Antirreflejante" md-sort-by="Antirreflejante">{{ item.specs.antireflective == 'true' ? 'Si' : 'No' }}</md-table-cell>
					<md-table-cell md-label="Precio" md-sort-by="Precio">$ {{ item.specs.price }}</md-table-cell>
					<md-table-cell md-label="Fecha" md-sort-by="Fecha">{{ item.createdAt }}</md-table-cell>
					<md-table-cell md-label="Envio" md-sort-by="Envio">
						<span
							:class="{
								'text-success': item.orderStatus == 'ENTREGADO',
								'text-warning': item.orderStatus == 'PENDIENTE',
							}"
							>{{ item.orderStatus }}</span
						>
					</md-table-cell>
					<md-table-cell md-label="Pago" md-sort-by="Pago">
						<span :class="{ 'text-success': item.paymentStatus == 'PAGADO' }">{{ item.paymentStatus }}</span>
					</md-table-cell>
				</md-table-row>
			</md-table>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
	name: 'OrdersList',
	components: {
		OrderDetails: () => import('./OrderDetails.vue'),
	},
	async mounted() {
		await this.getOrders()
		this.orders
			.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
			.map((order) => {
				order.createdAt = this.formatDate(order.createdAt)
				return order
			})
		this.verifyQueryParams()
	},
	data: () => ({
		currentOrder: null,
	}),
	methods: {
		...mapActions('orders', {
			getOrders: 'getOrders',
		}),
		formatDate(date) {
			let d = new Date(date)
			const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
			const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
			const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
			return `${da}/${mo}/${ye}`
		},
		onSelect(item) {
			if (item) {
				this.currentOrder = item
				this.showDialog = true
			} else {
				this.showDialog = false
				this.currentOrder = null
			}
		},
		verifyQueryParams() {
			if (this.$route.query.orderId) {
				let item = this.orders.find(i => i.id == this.$route.query.orderId)
				if (item)
					this.onSelect(item)
			}
		}
	},
	computed: {
		...mapFields('orders', {
			orders: 'orders',
			showDialog: 'showDialog',
		}),
	},
}
</script>

<style lang="scss" scoped>
.md-table-row {
	cursor: pointer !important;
}
</style>
