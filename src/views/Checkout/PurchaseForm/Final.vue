<template>
	<div>
		<md-dialog class="dialog" :md-active.sync="showDialog" @md-closed="getAddresses">
			<md-dialog-title>Direcci&oacute;n de env&iacute;o</md-dialog-title>
			<AddressForm ref="form" :isCheckout="true" />
			<md-dialog-actions>
				<md-button @click="showDialog = false" class="md-stroked md-basic md-dense mr-2">Cancelar</md-button>
				<md-button @click="submitChildForm" type="submit" class="md-primary md-raised md-dense mr-0">Guardar</md-button>
			</md-dialog-actions>
		</md-dialog>
		<div class="final-step">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 mb-4">
						<div class="row no-gutters ml-0">
							<div class="col-12">
								<md-button @click="showDialog = true" class="md-secondary-button md-primary md-stroked ml-0 mb-3">Nueva direcci&oacute;n</md-button>
							</div>
							<div v-if="addresses.length != 0" class="col-12">
								<div v-for="ad in addresses" :key="ad.id" class="w-100">
									<md-radio @change="onChangeAddress" v-model="addressId" :value="ad.id" class="text-white md-primary my-2">
										{{ `${ad.state}, ${ad.city}. ${ad.street} #${ad.extNumber} ${ad.intNumber ? 'int. ' + ad.intNumber : ''}` }}
										&nbsp;
										<small>{{ ad.isDefault ? '(Default)' : '' }}</small>
									</md-radio>
								</div>
							</div>
							<div v-else class="col-12">
								<p class="text-white text-warning">No hay direcciones registradas</p>
							</div>
						</div>
					</div>
					<div v-if="lenseSpecs.graduation_type == 'monofocal'" class="col-12 mb-3">
						<p class="mb-2 text-white">Recuerda actualizar tu graduaci&oacute;n por lo menos una vez al a&ntilde;o</p>
						<div>
							<div class="ml-0 d-flex align-items-center justify-content-start w-100 text-center" id="app">
								<div class="py-5 px-5 border" @dragover="dragover" @dragleave="dragleave" @drop="drop">
									<input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" class="d-none" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
									<label v-if="this.filelist.length == 0" for="assetsFieldHandle" class="d-block cursor-pointer">
										<div class="text-white">Arrastra un archivo o <u style="cursor: pointer">selecciona uno aqu&iacute;</u></div>
									</label>
									<ul class="unstyled-list m-0 p-0" v-if="this.filelist.length" v-cloak>
										<li class="text-white d-flex flex-row align-items-center justify-content-center" v-for="file in filelist" :key="file.name">
											{{ file.name }}
											<md-button @click="remove(filelist.indexOf(file))" class="md-icon-button">
												<md-icon class="text-white">clear</md-icon>
											</md-button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<p class="mt-2 text-white help-text">¿Necesitas ayuda?</p>
					</div>
					<template v-if="userType == 'store'">
						<div class="col-12">
							<h3 class="md-title text-white">Forma de pago:</h3>
						</div>
						<div class="col-12">
							<div class="row no-gutters ml0">
								<div v-for="opt in paymentOptions" :key="opt.id" class="w-100">
									<md-radio @change="onChangeOptionType" v-model="paymentOption" :value="opt.value" class="text-white md-primary my-2">
										{{ opt.label }}
									</md-radio>
								</div>
							</div>
						</div>
					</template>
					<div class="col-12">
						<h3 class="md-title text-white">Extras:</h3>
					</div>
					<div class="col-12">
						<Coupons />
					</div>
					<div class="col-xs-12 col-sm-12 col-md-10">
						<md-field>
							<label>Comentarios adicionales</label>
							<md-textarea v-model="extraComments"></md-textarea>
						</md-field>
					</div>
					<div class="col-12 text-right m-3">
						<md-button :disabled="loading" @click="goToCheckout" class="md-primary md-dense md-raised text-white m-0 mr-3">
							{{ loading ? 'Redireccionando...' : 'Ir a checkout' }}
						</md-button>
					</div>
					<StripeCheckout ref="checkoutRef" :pk="stripe_key" :session-id="session_id" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
	name: 'Final',
	delimiters: ['${', '}'], // Avoid Twig conflicts
	components: {
		StripeCheckout,
		AddressForm: () => import('@/views/User/Addresses/AddressForm.vue'),
		Coupons: () => import('./Coupons.vue'),
	},
	async mounted() {
		await this.getAddresses()
	},
	data: () => ({
		filelist: [],
		stripe_key: 'pk_test_51HJkwAD1nUNZOF3ZYIn3DEBY2QSkJdQTAYMYajExWnVXVnRBpiW1zmDJy2Ee1f3hzvmRDeu0kbmN78yMUsagfy2400HkhbwZ14',
		loading: false,
		showDialog: false,
		paymentOptions: [
			{ id: 1, label: 'Pagar al recibir en tienda.', value: 'pay_now_in_store_get_in_store' },
			{ id: 2, label: 'Pagar ahora y recibir en casa', value: 'pay_now_in_store_get_in_home' },
			{ id: 3, label: 'Pagar ahora y recibir en tienda', value: 'pay_later_in_store_get_in_store' },
		],
		paymentOption: null
	}),
	computed: {
		...mapState('order', {
			session_id: 'session_id',
			lenseSpecs: 'lenseSpecs',
			paymentStatus: 'paymentStatus',
		}),
		...mapFields('order', {
			addressId: 'addressId',
			extraComments: 'extraComments',
		}),
		...mapState('addresses', {
			addresses: 'addresses',
		}),
		...mapState('user', {
			userType: 'userType',
			storeId: 'storeId',
		}),
	},
	methods: {
		...mapActions('order', {
			createSession: 'createSession',
		}),
		...mapActions('addresses', {
			getAddresses: 'getAddresses',
		}),
		onChangeAddress(value) {
			this.addressId = value
		},
		onChangeOptionType(value) {
			this.paymentOption = value
		},
		onChange() {
			this.filelist = [...this.$refs.file.files]
		},
		remove(i) {
			this.filelist.splice(i, 1)
		},
		dragover(event) {
			event.preventDefault()
			// Add some visual fluff to show the user can drop its files
			if (!event.currentTarget.classList.contains('bg-green-300')) {
				event.currentTarget.classList.remove('bg-gray-100')
				event.currentTarget.classList.add('bg-green-300')
			}
		},
		dragleave(event) {
			// Clean up
			event.currentTarget.classList.add('bg-gray-100')
			event.currentTarget.classList.remove('bg-green-300')
		},
		drop(event) {
			event.preventDefault()
			this.$refs.file.files = event.dataTransfer.files
			this.onChange() // Trigger the onChange event manually
			// Clean up
			event.currentTarget.classList.add('bg-gray-100')
			event.currentTarget.classList.remove('bg-green-300')
		},
		async goToCheckout() {
			// refirect to stripe checkout onClick
			if (!this.addressId) {
				this.$notify({
					group: 'user',
					title: 'Ha habido un error',
					text: 'Por favor escoge o crea una dirección de envío.',
					type: 'warn',
				})	
				return
			}
			if (this.userType == 'store' && !this.paymentOption) {
				this.$notify({
					group: 'user',
					title: 'Escoge una forma de pago',
					text: 'La forma de pago es obligatoria para proceder.',
					type: 'warn',
				})
				return
			}
			if (!this.storeId && this.userType == 'store') {
				this.$notify({
					group: 'user',
					title: 'Ha habido un error',
					text: 'Reinicia el proceso y recarga la página.',
					type: 'warn',
				})	
				return
			}
			this.loading = true
			try {
				let form_data = new FormData()
				let design = JSON.parse(this.lenseSpecs.design)
				let { id } = this.$route.params
				let graduation = this.filelist[0]
				let data = {
					id: id,
					// checkout session data start
					name: this.lenseSpecs.name,
					product_description: `Estás por comprar los lentes ${this.lenseSpecs.name}. Es una buena elección.`,
					price: this.lenseSpecs.price,
					images: design.images,
					// checkout sesion data end
					design: {
						// only this props are needed from the design
						image: design.image,
						hex: design.hex,
						name: design.name,
					},
					lenseMaterial: this.lenseSpecs.lenseMaterial,
					// only one of these can be true
					antireflective: this.lenseSpecs.extra == 'antireflective' ? true : false,
					photochromatic: this.lenseSpecs.extra == 'photochromatic' ? true : false,
					// end of extra fields
					graduationType: this.lenseSpecs.graduation_type,
					graduation: graduation || null,
					extraComments: this.extraComments,
					addressId: this.addressId,
					paymentOption: null,
					storeId: null,
					deleteAddress: false,
					markAsPayed: false
				}
				if (this.userType == 'store') {
					if (this.paymentOption != 'pay_now_in_store_get_in_store')
						data.markAsPayed = true
					data.deleteAddress = true
					data.storeId = this.storeId
					data.paymentOption = this.paymentOption
				} else {
					data.paymentOption = 'card'
				}
				for (var key in data) {
					let value = data[key]
					if (typeof value == 'object' && key != 'graduation') form_data.append(key, JSON.stringify(data[key]))
					else form_data.append(key, value)
				}
				await this.createSession({
					payload: form_data, 
					cardPayment: this.userType == 'store' ? 0 : 1
				})
				if (this.userType == 'client') {
					this.$refs.checkoutRef.redirectToCheckout()
				} else if (this.userType == 'store') {
					// handle store order creation
					this.$router.push({
						name: 'PaymentSuccess',
						query: {
							confirmPayment: 0,
							pendingPayment: this.paymentStatus == 'PENDIENTE' ? 1 : 0
						}
					})
				}
			} catch {
				this.$notify({
					group: 'user',
					title: 'Ha habido un error',
					text: 'Ha habido un error al crear tu order. Por favor inténtalo más tarse.',
					type: 'warn',
				})
			} finally {
				this.loading = false
			}
		},
		async submitChildForm() {
			await this.$refs.form.onSubmit(null)
			this.showDialog = false
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.dialog {
	max-width: 700px;
	margin: 0 auto;
}
.final-step {
	::v-deep .md-radio .md-radio-container {
		border-color: #fff !important;
	}
	p {
		font-size: 18px;
		&.help-text {
			font-size: 16px;
		}
	}
}
</style>
