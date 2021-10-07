<template>
	<div>
		<md-dialog-confirm
			:md-active.sync="showDialog"
			md-title="Parece que no has iniciado sesión"
			md-content="Para poder hacer tu compra tienes que iniciar sesión. Es muy rápido hacerlo."
			md-confirm-text="Iniciar sesión"
			md-cancel-text="Cancelar"
			@md-cancel="onCancel"
			@md-confirm="onConfirm"
		/>
		<div class="main-block">
			<div class="main-block__info" :class="{'product__offer': hasOffer}">
				<div class="info__body">
					<div class="d-flex flex-row justify-content-between align-items-center">
						<div class="mb-2">
							<h1 class="info__title mb-0">{{ glass.name }}</h1>
							<span class="text-muted">{{ categories }}</span>
						</div>
						<md-button @click="addFav({ id: glass.id, name: glass.name })" class="md-icon-button ml-4">
							<md-icon :class="{ 'is-fav': isFavorite, 'not-fav': !isFavorite }" class="md-fav">favorite</md-icon>
						</md-button>
					</div>

					<span v-if="hasOffer" class="info__price">
						<div class="text-muted text-decoration-line-through">${{ glass.price }}</div>
						${{ offerPrice }}
					</span>
					<span v-else class="info__price">${{ glass.price }}</span>

					<ul class="info__colors-selector">
						<template v-for="c in glass.designs">
							<li @click="setDesign(c)" :key="c.name" :style="'background-color:' + c.color.hex + ';'"></li>
						</template>
					</ul>
					<p class="info__desc">
						{{ glass.description }}
					</p>
				</div>
				<div class="info__actions">
					<button @click="buy()" class="info__buy">COMPRAR</button>
				</div>
			</div>
			<div v-if="currentDesign" class="main-block__image" :class="[isTransition ? 'animate' : 'no-animate']">
				<img v-lazy="currentDesign.images[0]" alt="" />
			</div>
			<div v-if="currentDesign" class="main-block__image" :class="[isTransition ? 'animate' : 'no-animate']">
				<img v-lazy="currentDesign.images[1]" alt="" />
			</div>
			<div v-if="currentDesign" class="main-block__image" :class="[isTransition ? 'animate' : 'no-animate']">
				<img v-lazy="currentDesign.images[2]" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import transition from '@/mixins/transition'
import { mapFields } from 'vuex-map-fields'

export default {
	name: 'MainBlock',
	mixins: [transition],
	computed: {
		...mapState('product', {
			glass: 'glass',
			isLoading: 'isLoading',
		}),
		...mapState('favorites', {
			favorites: 'favorites',
		}),
		...mapGetters('user', {
			isLoggedIn: 'isLoggedIn',
		}),
		...mapFields('order', {
			lenseSpecs: 'lenseSpecs',
		}),
		categories() {
			return this.glass.categories ? this.glass.categories.join(', ') : 'Cargando...'
		},
	},
	mounted() {
		this.currentDesign = this.glass.designs[0]
		this.favorites.forEach((fav) => {
			if (fav.id == this.glass.id) {
				this.isFavorite = true
			}
		})
		this.transition(() => {
			this.currentDesign = {
				name: this.glass.designs[0].name,
				hex: this.glass.designs[0].color.hex,
				image: this.glass.designs[0].mainImage,
				images: this.glass.designs[0].images,
			}
			this.lenseSpecs.design = JSON.stringify(this.currentDesign)
		})
		if (this.glass.offer) {
			this.hasOffer = true
			this.offerPrice = this.glass.price - this.glass.offer.value
		}
	},
	data: () => ({
		currentDesign: null,
		isFavorite: false,
		showDialog: false,
		hasOffer: false,
		offerPrice: 0,
	}),
	methods: {
		...mapActions('favorites', {
			addFavorite: 'addFavorite',
			deleteFavorite: 'deleteFavorite',
		}),
		buy() {
			if (this.isLoggedIn) {
				this.$router.push({
					name: 'Checkout',
					params: { id: this.glass.id, slug: this.glass.slug },
				})
				this.$cookies.set('lense_specs', JSON.stringify(this.lenseSpecs))
			} else {
				this.$cookies.set('origin-url', `productos/${this.glass.id}/${this.glass.slug}`)
				this.showDialog = true
			}
		},
		onCancel() {
			this.showDialog = false
		},
		onConfirm() {
			this.$router.push({ name: 'Auth' })
		},
		setDesign(design) {
			this.transition(() => {
				this.currentDesign = {
					name: design.name,
					hex: design.color.hex,
					image: design.mainImage,
					images: design.images,
				}
				this.lenseSpecs.design = JSON.stringify(this.currentDesign) // vuex binding
			})
		},
		addFav({ id, name }) {
			if (this.isFavorite) {
				this.deleteFavorite(id).then(() => {
					this.isFavorite = false
				})
			} else {
				this.addFavorite({ id, name }).then(() => {
					this.isFavorite = true
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/vars';

.main-block {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	&__info {
		position: relative;
		flex: -1;
		order: -1; // this is meant to make the mobile layout order
		@include flex('column', 'flex-start', 'flex-end');
		width: 100%;
		height: 50vh;
		box-sizing: border-box;
		padding: 15px;
		.info__body {
			// .info__title{

			// }
			.md-fav {
				&.is-fav {
					color: red !important;
				}
				&.not-fav {
					color: rgba(33, 33, 33, 0.3) !important;
				}
			}
			.info__price {
				display: flex;
				flex-direction: row;
				div {
					margin-right: 10px;
				}
			}
			.info__colors-selector {
				list-style: none;
				padding: 0;
				margin: 15px 0;
				display: flex;
				flex-direction: row;
				li {
					width: 14px;
					height: 14px;
					border-radius: 100%;
					margin-right: 8px;
					cursor: pointer;
				}
			}
			// .info__desc{

			// }
		}
		.info__actions {
			.info__buy {
				@include small-button('black', 'white', 'black');
			}
		}
		@media #{$break-medium} {
			order: -2;
			width: 50%;
			height: 100vh;
			.info__actions {
				margin-bottom: 50px !important;
				// .info__buy{
				// }
			}
		}
		&.product__offer {
			&:after {
				content: '';
				width: 70px;
				height: 70px;
				position: absolute;
				background-image: url('../../../assets/img/icons/sale.png');
				background-size: contain;
				bottom: 0px;
				right: 0px;
				z-index: 600;
				transform: rotateZ(-40deg);
			}
		}
	}
	&__image {
		position: relative;
		height: 50vh;
		width: 100%;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&:after {
			content: '';
			transition: ease-out 0.6s;
			position: absolute;
			top: 0;
			right: 0;
			background: black;
			z-index: 1;
			height: 100%;
			width: 0px;
		}
		&.animate {
			&:after {
				width: 100%;
				left: 0;
			}
		}
		@for $i from 1 to 4 {
			&:nth-child(#{$i}) {
				@if $i == 1 {
					order: -1;
				} @else if $i == 2 {
					order: -2;
				} @else {
					order: $i;
				}
			}
		}
		@media #{$break-medium} {
			order: initial;
			height: 100vh;
			width: 50%;
			order: inherit;
		}
	}
}
</style>
