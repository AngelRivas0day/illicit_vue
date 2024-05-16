<template>
	<div>
		<md-card class="my-4">
			<md-card-header>
				<div class="md-title">Detalles de la cuenta</div>
			</md-card-header>
			<md-card-content>
				<form class="row">
					<div class="col-12" v-if="errorMessage">
						<request-error-message
							:message="errorMessage"
							@closed-message="errorMessage = null"
						/>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field>
							<md-tooltip md-direction="bottom">
								El correo electr&oacute;nico no puede ser modificado.
							</md-tooltip>
							<label>
								Correo electr&oacute;nico
							</label>
							<md-input v-model="email" disabled></md-input>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field>
							<md-tooltip md-direction="bottom">
								La fecha de nacimiento no puede ser modificada.
							</md-tooltip>
							<label>
								Fecha de nacimiento
							</label>
							<md-input v-model="birthDay" disabled></md-input>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field :class="{ 'md-invalid': $v.form.name.$invalid && $v.form.name.$dirty }">
							<label>Nombre</label>
							<md-input @blur="$v.form.name.$touch" v-model="form.name"></md-input>
							<span class="md-error" v-if="!$v.form.name.required">
								El nombre es requerido.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field :class="{ 'md-invalid': $v.form.last_name.$invalid && $v.form.last_name.$dirty }">
							<label>Apellido</label>
							<md-input @blur="$v.form.last_name.$touch" v-model="form.last_name"></md-input>
							<span class="md-error" v-if="!$v.form.last_name.required">
								El apellido es requerido.
							</span>
						</md-field>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<md-field
							:class="{ 'md-invalid': $v.form.phone_number.$invalid && $v.form.phone_number.$dirty }">
							<label>Tel&eacute;fono</label>
							<md-input
								@blur="$v.form.phone_number.$touch"
								v-model="form.phone_number"
								v-mask="'+## ## #### ####'"
							></md-input>
							<span class="md-error" v-if="!$v.form.phone_number.required">
								El tel&eacute;fono es requerido.
							</span>
						</md-field>
					</div>
				</form>
			</md-card-content>
			<md-card-actions>
				<md-button
					:disabled="loading || $v.form.$invalid"
					class="md-raised md-primary md-dense"
					@click="onSubmit"
				>
					{{ loadingSubmit ? 'Guardando...' : 'Guardar' }}
				</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {Get, Patch} from "@/api/api";
import RequestErrorMessage from "@/components/RequestErrorMessage.vue";

export default {
	name: "Settings",
	components: {RequestErrorMessage},
	async mounted() {
		await this.fetchData();
	},
	data: () => ({
		loading: false,
		loadingSubmit: false,
		form: {
			name: null,
			last_name: null,
			phone_number: null,
		},
		email: null,
		birthDay: null,
		errorMessage: null,
	}),
	methods: {
		/**
		 * @description
		 * The `fetchData` method will fetch only the settings of the user.
		 * It is called when the user saves any changes in the settings.
		 * @return {Promise<void>}
		 */
		async fetchData() {
			try {
				this.errorMessage = null;
				this.loading = true;
				let { data: settings } = await Get({
					endpoint: 'clients',
					useToken: true,
				});
				let {
					email,
					birth_day,
					...restOfSettings
				} = settings;
				this.form = restOfSettings
				this.email = email;
				this.birthDay = birth_day;
				this.loading = false;
			} catch (error) {
				this.errorMessage = error.response ?
					error.response.data:
					error.message;
				this.loading = false;
			}
		},
		/**
		 * @description
		 * The `onSubmit` method will call the API to update the settings of the user.
		 * It is called when the user saves any changes in the settings, after
		 * the `fetchData` method is called.
		 * @return {Promise<void>}
		 */
		async onSubmit() {
			try {
				this.errorMessage = null;
				this.loading = true;
				this.loadingSubmit = true;
				await Patch({
					endpoint: 'clients',
					data: this.form,
					useToken: true,
				})
				this.loadingSubmit = false;
				// ?: The fetchData method will set the loading to false.
				await this.fetchData();
			} catch (error) {
				this.errorMessage = error.response ?
					error.response.data:
					error.message;
				this.loading = false;
				this.loadingSubmit = false;
			}
		},
	},
	validations: {
		form: {
			name: {
				required,
			},
			last_name: {
				required,
			},
			phone_number: {
				required,
			},
		}
	},}
</script>

<style scoped lang="scss">

</style>
