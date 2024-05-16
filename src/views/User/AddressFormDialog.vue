<template>
	<div>
		<md-dialog
			class="address-form-dialog"
			:md-active.sync="active"
			:md-fullscreen="true"
			:md-click-outside-to-close="false"
		>
			<md-dialog-title>
				<span v-if="addressId">Editar dirección</span>
				<span v-else>Añadir dirección</span>
			</md-dialog-title>
			<md-dialog-content>
				<form class="row">
					<div v-if="errorMessage" class="col-12">
						<request-error-message
							:message="errorMessage"
							@closed-message="errorMessage = null"
						/>
					</div>
					<div class="col-xs-12 col-sm-12">
						<md-switch v-model="form.default">
							Dirección de envío por defecto
						</md-switch>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-9">
						<md-field :class="{ 'md-invalid': $v.form.street.$invalid && $v.form.street.$dirty }">
							<label>Calle</label>
							<md-input @blur="$v.form.street.$touch" v-model="form.street"></md-input>
							<span class="md-error" v-if="!$v.form.street.required">
								La calle es requerida.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3">
						<md-field :class="{ 'md-invalid': $v.form.zip.$invalid && $v.form.zip.$dirty }">
							<label>ZIP</label>
							<md-input @blur="$v.form.zip.$touch" v-model="form.zip"></md-input>
							<span class="md-error" v-if="!$v.form.zip.required">
								El ZIP es requerido.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field :class="{ 'md-invalid': $v.form.extNumber.$invalid && $v.form.extNumber.$dirty }">
							<label>Número externo</label>
							<md-input @blur="$v.form.extNumber.$touch" v-model="form.extNumber"></md-input>
							<span class="md-error" v-if="!$v.form.extNumber.required">
								El número externo es requerido.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field>
							<label>Número interno</label>
							<md-input v-model="form.intNumber"></md-input>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field :class="{ 'md-invalid': $v.form.state.$invalid && $v.form.state.$dirty }">
							<label>Estado</label>
							<md-select
								@md-selected="handleStateChange($event)"
								@blur="$v.form.state.$touch"
								v-model="form.state"
								required
							>
								<md-option v-for="s in states" :key="s" :value="s">{{s}}</md-option>
							</md-select>
							<span class="md-error" v-if="!$v.form.state.required">
								El estado es requerido.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field :class="{ 'md-invalid': $v.form.city.$invalid && $v.form.city.$dirty }">
							<label>Ciudad</label>
							<md-select @blur="$v.form.city.$touch" v-model="form.city" required>
								<md-option v-for="c in cities" :key="c" :value="c">{{c}}</md-option>
								<template v-if="cities.length === 0">
									<md-option>-- Selecciona un estado --</md-option>
								</template>
							</md-select>
							<span class="md-error" v-if="!$v.form.city.required">
								La ciudad es requerida.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12">
						<md-field :class="{ 'md-invalid': $v.form.reference.$invalid && $v.form.reference.$dirty }">
							<label>Referencias</label>
							<md-textarea
								@blur="$v.form.reference.$touch"
								v-model="form.reference"
								md-autogrow
								md-counter="150"
								required
							></md-textarea>
							<span class="md-error" v-if="!$v.form.reference.required">
								Las referencias son requeridas.
							</span>
						</md-field>
					</div>
				</form>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button
					class="md-dense"
					@click="handleDialogClose()"
				>
					Cancelar
				</md-button>
				<md-button
					:disabled="loading || $v.form.$invalid || !$v.form.$anyDirty"
					class="md-raised md-primary md-dense"
					@click="onSubmit"
				>
					{{ loading ? 'Guardando...' : 'Guardar' }}
				</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>


<script>
import {required} from "vuelidate/lib/validators";
import JSONData from "@/assets/data/data.json";
import RequestErrorMessage from "@/components/RequestErrorMessage.vue";
import {Get, Patch, Post} from "@/api/api";

export default {
	name: "AddressFormDialog",
	components: {RequestErrorMessage},
	mounted() {
		this.states = Object.keys(JSONData);
	},
	data: () => ({
		loading: false,
		patchingForm: false,
		errorMessage: null,
		states: [],
		cities: [],
		form: {
			street: null,
			extNumber: null,
			intNumber: null,
			state: null,
			zip: null,
			city: null,
			reference: null,
			default: false,
		},
	}),
	watch: {
		active: function (val) {
			if (val && this.addressId)
				this.fetchData();
		}
	},
	props: {
		active: {
			type: Boolean,
			required: false,
			default: false,
		},
		addressId: {
			type: String,
			required: false,
			default: null,
		}
	},
	methods: {
		/**
		 * @description
		 * The `fetchData` method will fetch the address data to edit.
		 * It is called when the dialog is opened to edit an address.
		 * @return {Promise<void>}
		 */
		async fetchData() {
			try {
				this.loading = true;
				this.errorMessage = null;
				this.patchingForm = true;
				let { data: address } = await Get({
					endpoint: `clients/addresses/${this.addressId}`,
					useToken: true,
				});
				this.cities = JSONData[address.state];
				this.form = address;
				setTimeout(() => {
					this.patchingForm = false;
					this.loading = false;
				}, 500);
			} catch (error) {
				this.errorMessage = error.response ?
					error.response.data:
					error.message;
				this.loading = false;
				this.patchingForm = false;
			}
		},
		/**
		 * @description
		 * The `onSubmit` method will call the API to add or update an address.
		 * It is called when the user submits the address form.
		 * It will also handle the dialog close.
		 * @return {Promise<void>}
		 */
		async onSubmit() {
			try {
				let requestFn = this.addressId ?
					Patch :
					Post;
				let requestPath = this.addressId ?
					`clients/addresses/${this.addressId}`:
					'clients/addresses';
				this.loading = true;
				this.errorMessage = null;
				await requestFn({
					endpoint: requestPath,
					data: this.form,
					useToken: true,
				});
				this.loading = false;
				this.handleDialogClose(true);
			} catch (error) {
				this.errorMessage = error.response ?
					error.response.data:
					error.message;
				this.loading = false;
			}
		},
		/**
		 * @description
		 * The `handleDialogClose` method will handle the dialog close.
		 * It is called when the user clicks on the "Cancelar" button or the dialog is closed by
		 * the onSubmit method.
		 * @param {boolean} update - Whether the address was updated or not.
		 */
		handleDialogClose(update = false) {
			this.form = {
				street: null,
				extNumber: null,
				intNumber: null,
				state: null,
				zip: null,
				city: null,
				reference: null,
				default: false,
			};
			this.errorMessage = null;
			this.loading = false;
			this.$emit('update:active', !this.active);
			this.$emit('afterClosed', update);
		},
		/**
		 * @description
		 * The `handleStateChange` method will handle the state change and update the cities.
		 * It is called when the user selects a state.
		 * @param {string} state - The selected state.
		 */
		handleStateChange(state) {
			if (!state) {
				this.cities = [];
				return;
			}
			// ?: If the form is being patched, the city will not reset.
			this.form.city = this.patchingForm ?
				this.form.city:
				null;
			this.cities = JSONData[state];
		},
	},
	validations: {
		form: {
			street: {
				required,
			},
			extNumber: {
				required,
			},
			state: {
				required,
			},
			zip: {
				required,
			},
			city: {
				required,
			},
			reference: {
				required,
			},
		}
	},
}
</script>

<style scoped lang="scss">
.address-form-dialog {
	.md-dialog-title {
		@media (max-width: 600px) {
			padding: 65px 24px 0;
		}
	}
}
</style>
