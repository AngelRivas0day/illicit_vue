<template>
	<div>
		<md-dialog class="top-dialog" :md-active.sync="showGrad">
			<md-dialog-content>
				<img :src="order.specs.graduation" alt="" />
			</md-dialog-content>
		</md-dialog>
		<md-dialog :md-active.sync="showDialog">
			<md-dialog-title>
				<div class="md-title">Detalles de compra</div>
				<div class="md-subhead">Fecha del pedido: {{ formattedDate }}</div>
			</md-dialog-title>
			<md-dialog-content id="order-details">
				<div class="order-details__resume row">
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
						<h3 class="md-title">Direcci&oacute;n de env&iacute;o</h3>
						<template v-if="order.paymentOption == 'pay_now_in_store_get_in_home' || order.paymentOption == 'card'">
							<p>{{ order.address.street }} #{{ order.address.extNumber }}</p>
							<p>{{ order.address.city }}, {{ order.address.state }}, {{ order.address.zip }}</p>
							<p>Referencias del domicilio: {{ order.address.reference }}</p>
						</template>
						<template v-else>
							<p>{{ order.store.street }} #{{ order.store.extNumber }}</p>
						</template>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
						<h3 class="md-title">Estado del pago</h3>
						<md-chip :class="{ 'md-primary': order.paymentStatus == 'PAGADO', 'md-accent': order.paymentStatus != 'PAGADO' }">{{
							order.paymentStatus == 'PAGADO' ? 'PAGADO' : 'PENDIENTE'
						}}</md-chip>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-5">
						<h3 class="md-title">Resumen de compra</h3>
						<p><span>Antirreflejante: </span>{{ order.specs.antireflective == true ? 'Con antirrflejante' : 'Sin antirreflejante' }}</p>
						<p><span>Fotocrom&aacute;tico: </span>{{ order.specs.photochromatic == true ? 'Con efecto fotocromático' : 'Sin efecto fotocromático' }}</p>
						<p><span>Lente: </span>{{ order.specs.lenseMaterial }}</p>
						<p><span>Mountura: </span>{{ glass.frameMaterial.join(', ') }}</p>
						<p><span>Diseño: </span>{{ order.specs.design.name }}</p>
						<p><span>Tipo de graduaci&oacute;n: </span>{{ order.specs.graduationType }}</p>
						<p v-if="order.specs.graduation">
							<span>Graduaci&oacute;n (imagen): </span>
							<a class="clickable" @click="showGrad = true">Ver graduaci&oacute;n</a>
						</p>
						<p><span>Total: </span> ${{ order.specs.price }}</p>
					</div>
					<template v-if="order.store">
						<div class="col-xs-12 col-sm-12 col-md-6 col-lg-5">
							<h3 class="md-title">Forma de pago</h3>
							<p>{{ formattedPaymentOption }}</p>
						</div>
					</template>
					<div class="col-12" v-if="order.extraComments">
						<h3 class="md-title">Comentarios extras</h3>
						<p>{{ order.extraComments }}</p>
					</div>
					<template v-if="order.transitData">
						<div class="col-12">
							<h3 class="md-title">Detalles de env&iacute;o</h3>
						</div>
						<div class="col-12">
							<ul class="order-details-list">
								<li class="details-item">
									<strong>Paqueter&iacute;a:</strong> {{ order.transitData.sender }}
								</li>
								<li class="details-item">
									<strong>C&oacute;digo: </strong> {{ order.transitData.code }}
								</li>
							</ul>
						</div>
					</template>
				</div>
				<div class="w-100 px-0 my-2">
					<md-divider class="w-100"></md-divider>
				</div>
				<div class="order-details__items row">
					<div class="col-12">
						<template v-if="order.orderStatus == 'PENDIENTE'">
							<h4 class="md-title">Pendiente de entregar</h4>
							<p>El paquete aún está en el proceso de entrega</p>
						</template>
						<template v-if="order.orderStatus == 'ELABORANDO'">
							<h4 class="md-title">El paquete est&aacute; siendo elaborado</h4>
							<p>El paquete ha sido entregado en la direcci&oacute;n provista</p>
						</template>
						<template v-if="order.orderStatus == 'ENVIADO'">
							<h4 class="md-title">El paquete ha sido enviado</h4>
							<p>El paquete ha sido entregado en la direcci&oacute;n provista</p>
						</template>
						<template v-if="order.orderStatus == 'ENTREGADO'">
							<h4 class="md-title">El paquete ha sido entregado</h4>
							<p>El paquete ha sido entregado en la direcci&oacute;n provista</p>
						</template>
					</div>
					<div class="col-12 mt-3">
						<div class="item-card">
							<div class="item-card__image">
								<img :src="order.specs.design.image" alt="Item del pedido" />
							</div>
							<div class="item-card__info">
								<div class="name">
									{{ order.specs.name }} -
									<div :style="'background:' + order.specs.design.hex + ';'" class="color-sample"></div>
									{{ order.specs.design.name }}
								</div>
								<p class="price">$ {{ order.specs.price }}</p>
							</div>
						</div>
					</div>
				</div>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary md-dense md-raised" @click="onClose">Volver</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'OrderDetails',
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		showGrad: false,
	}),
	mounted() {
		this.getGlass(this.order.specs.id)
		console.log('order: ', this.order)
	},
	methods: {
		...mapActions('product', {
			getGlass: 'getGlass',
		}),
		onClose() {
			this.showDialog = false
		},
	},
	computed: {
		...mapState('product', {
			glass: 'glass',
		}),
		...mapFields('orders', {
			showDialog: 'showDialog',
		}),
		formattedDate() {
			const orderDate = new Date(this.order.createdAt)
			const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate)
			const mo = new Intl.DateTimeFormat('es', { month: 'long' }).format(orderDate)
			const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(orderDate)
			return `${da} ${mo} del ${ye}`
		},
		formattedPaymentOption() {
			let code = this.order.paymentOption
			if (code == 'card')
				return 'Pago con tarjeta.'
			else if (code == 'pay_now_in_store_get_in_store')
				return 'Pagar al recibir en tienda.'
			else if (code == 'pay_now_in_store_get_in_home')
				return 'Pagar ahora y recibir en casa.'
			else if (code == 'pay_later_in_store_get_in_store')
				return 'Pagar ahora y recibir en tienda.'
			else
				return 'Pago con tarjeta.'
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.clickable {
	cursor: pointer;
	color: black !important;
	text-decoration: underline;
}
.top-dialog {
	z-index: 999 !important;
}
.md-subhead {
	opacity: 0.54;
	font-size: 14px;
	letter-spacing: 0.01em;
	line-height: 20px;
}
#order-details {
	.order-details__resume,
	.order-details__items {
		[class*='col-'] {
			margin-bottom: 20px;
			@media #{$break-medium} {
				margin-bottom: 0px;
			}
		}
		h3 {
			margin-bottom: 2px;
			font-size: 19px;
		}
		h4 {
			margin-bottom: 2px;
			font-size: 18px;
		}
		p {
			margin-bottom: 2px;
			span {
				font-weight: bold;
			}
		}
	}
	.item-card {
		display: flex;
		flex-direction: row;
		&__image {
			flex: 1;
			max-width: 100px;
			margin-right: 20px;
		}
		&__info {
			flex: 1;
			.price {
				color: red;
			}
			.name {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: row;
			}
			.color-sample {
				width: 15px;
				height: 15px;
				display: block;
				border-radius: 100%;
				margin: 0 5px;
			}
		}
	}
}
</style>
