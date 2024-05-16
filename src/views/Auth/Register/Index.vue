<template>
	<div class="auth__form">
		<div class="form-top w-100">
			<div class="row">
				<div class="col-6">
					<p class="ml-5">Registro</p>
				</div>
				<div class="col-6 text-right">
					<p class="mr-5">ILLICIT</p>
				</div>
			</div>
		</div>
		<form @submit.prevent="onSubmit" class="row">
			<div v-if="loading" class="col-12 mb-3">
				<md-progress-bar md-mode="indeterminate"></md-progress-bar>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6">
				<md-field :class="{ 'md-invalid': $v.form.name.$invalid && $v.form.name.$dirty }">
					<md-icon class="md-primary">account_circle</md-icon>
					<label>Nombre</label>
					<md-input @blur="$v.form.name.$touch" v-model="form.name"></md-input>
					<span class="md-error" v-if="!$v.form.name.required">El nombre es requerido.</span>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6">
				<md-field :class="{ 'md-invalid': $v.form.lastName.$invalid && $v.form.lastName.$dirty }">
					<md-icon class="md-primary">account_circle</md-icon>
					<label>Apellido</label>
					<md-input @blur="$v.form.lastName.$touch" v-model="form.lastName"></md-input>
					<span class="md-error" v-if="!$v.form.lastName.required">El apellido es requerido.</span>
				</md-field>
			</div>
			<div class="col-12">
				<md-field :class="{ 'md-invalid': $v.form.birthDay.$invalid && $v.form.birthDay.$dirty }">
					<md-icon class="md-primary">event</md-icon>
					<label>Fecha de nacimiento</label>
					<md-input @blur="$v.form.birthDay.$touch" v-model="form.birthDay" type="date"></md-input>
					<span class="md-error" v-if="!$v.form.birthDay.required">La fecha de nacimiento es requerida.</span>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field :class="{ 'md-invalid': $v.form.email.$invalid && $v.form.email.$dirty }">
					<md-icon class="md-primary">alternate_email</md-icon>
					<label>Correo</label>
					<md-input @blur="$v.form.email.$touch" v-model="form.email"></md-input>
					<span class="md-error" v-if="!$v.form.email.required">El correo es requerido.</span>
					<span class="md-error" v-if="!$v.form.email.email">El correo no es válido.</span>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field :class="{ 'md-invalid': $v.form.phoneNumber.$invalid && $v.form.phoneNumber.$dirty }">
					<md-icon class="md-primary">smartphone</md-icon>
					<label>N&uacute;mero de tel&eacute;fono</label>
					<md-input @blur="$v.form.phoneNumber.$touch" v-model="form.phoneNumber" v-mask="'+## ###-###-####'"></md-input>
					<span class="md-error" v-if="!$v.form.phoneNumber.required">El n&uacute;mero es requerido.</span>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field :class="{ 'md-invalid': $v.form.password.$invalid && $v.form.password.$dirty }">
					<md-icon class="md-primary">vpn_key</md-icon>
					<label>Contrase&ntilde;a</label>
					<md-input @blur="$v.form.password.$touch" type="password" v-model="form.password"></md-input>
					<span class="md-error" v-if="!$v.form.password.required">La contrase&ntilde;a es requerida.</span>
					<span class="md-error" v-if="!$v.form.password.minLength">La contrase&ntilde;a debe tener al menos 6 caracteres.</span>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field
					:class="{ 'md-invalid': $v.form.repeatedPassword.$invalid && $v.form.repeatedPassword.$dirty }">
					<md-icon class="md-primary">done</md-icon>
					<label>Repetir contrase&ntilde;a</label>
					<md-input @blur="$v.form.repeatedPassword.$touch" type="password" v-model="form.repeatedPassword"></md-input>
					<span class="md-error" v-if="!$v.form.repeatedPassword.required">La contrase&ntilde;a es requerida.</span>
					<span class="md-error" v-if="!$v.form.repeatedPassword.sameAsPassword">Las contrase&ntilde;as no coinciden.</span>
					<span class="md-error" v-if="!$v.form.repeatedPassword.minLength">La contrase&ntilde;a debe tener al menos 6 caracteres.</span>
				</md-field>
			</div>
			<div v-if="errorMessage" class="col-12 mb-4 text-center">
				<span class="text-danger">{{ errorMessage }}</span>
			</div>
			<div class="col-6 main-buttons-container">
				<md-button
					@click="changeForm"
					class="md-primary md-stroked"
					type="button"
					:disabled="loading"
				>
					Iniciar sesi&oacute;n
				</md-button>
			</div>
			<div class="col-6">
				<md-button
					:disabled="$v.form.$invalid || loading"
					class="md-primary md-raised"
					type="submit"
				>Registrarse
				</md-button>
			</div>
			<SocialLogin/>
		</form>
		<div class="form-bottom w-100">
			<div class="row">
				<div class="col-6">
					<router-link class="button-action ml-5" to="/">
						T&eacute;rminos y condiciones
					</router-link>
				</div>
				<div class="col-6 text-right">
					<router-link class="button-action mr-5" to="/">
						Pol&iacute;tica de privacidad
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {required, minLength, sameAs, email} from "vuelidate/lib/validators";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import SocialLogin from '../SocialLogin'
import {Post} from '@/api/api'
import FirebaseAuthTranslate from "@/mixins/firebaseAuthTranslate";

export default {
	name: "Register",
	components: {
		SocialLogin
	},
	mixins: [FirebaseAuthTranslate],
	data: () => ({
		form: {
			name: null,
			lastName: null,
			birthDay: null,
			email: null,
			password: null,
			repeatedPassword: null,
			phoneNumber: null,
		},
		errorMessage: null,
		loading: false,
	}),
	methods: {
		/**
		 * @description
		 * El método `onSubmit` se encarga de enviar los datos del formulario al servidor
		 * de Firebase para autenticar al usuario.
		 *
		 * Adicionalmente, el método se encarga de crear un cliente en la base de datos de Firebase
		 * para almacenar la información adicional del usuario.
		 * @return {Promise<void>}
		 */
		async onSubmit() {
			try {
				const auth = getAuth();
				this.errorMessage = null;
				this.loading = true;
				// Crear el usuario en Firebase
				await createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
				// Crear el cliente en la base de datos para almacenar la información adicional
				await Post({
					endpoint: 'clients',
					data: {
						name: this.form.name,
						last_name: this.form.lastName,
						phone_number: this.form.phoneNumber,
						birth_day: null,
					},
					useToken: true,
				})
				this.loading = false;
				// Redirigir al usuario a la página de verificación de correo electrónico
				await this.$router.push({name: 'VerifyEmail'});
			} catch (error) {
				this.errorMessage = this.translateFireBaseAuthError(error?.code);
				this.loading = false;
			}
		},
		changeForm() {
			this.$emit('clicked', 'Login')
		}
	},
	validations: {
		form: {
			name: {
				required,
			},
			lastName: {
				required,
				minLength: minLength(3),
			},
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: minLength(6),
			},
			phoneNumber: {
				required,
			},
			birthDay: {
				required,
			},
			repeatedPassword: {
				required,
				sameAsPassword: sameAs("password"),
				minLength: minLength(6),
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

input[type="date"]:in-range::-webkit-datetime-edit-year-field, input[type="date"]:in-range::-webkit-datetime-edit-month-field, input[type="date"]:in-range::-webkit-datetime-edit-day-field, input[type="date"]:in-range::-webkit-datetime-edit-text {
	color: transparent;
}

.auth {
	background: #dadada;
	&__form {
		flex: 1;
		background: white;
		box-shadow: inset 2px 0 300px -121px rgba(0, 0, 0, 0.65);
		@include center-layout;
		justify-content: space-between;

		.form-top {
			margin-top: 60px;
		}

		.form-bottom {
			margin-bottom: 30px;

			a {
				color: #2ec5c5 !important;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		form {
			width: 90%;

			.button-action {
				font-weight: 100 !important;
				text-transform: none !important;
				text-align: center;
			}

			.main-buttons-container button {
				margin: 0 auto !important;
				display: block;
			}

			[class*="-button"] {
				min-width: 150px;
			}

			@media #{$break-medium}{
				width: 60% !important;
			}
		}
	}
}
</style>
