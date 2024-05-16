<template>
	<div class="auth__form">
		<md-dialog-prompt
			:md-active.sync="showForgotMyPasswordDialog"
			v-model="forgotMyPasswordEmail"
			md-title="Olvidé mi contraseña"
			md-input-placeholder="Correo electrónico"
			md-confirm-text="Envíar correo de recuperación"
			md-cancel-text="Cancelar"
			@md-confirm="sendForgotMyPasswordEmail"
		/>
		<div class="form-top w-100">
			<div class="row">
				<div class="col-6">
					<p class="ml-5">Inicio de sesi&oacute;n</p>
				</div>
				<div class="col-6 text-right">
					<p class="mr-5">ILLICIT</p>
				</div>
			</div>
		</div>
		<form @submit.prevent="onSubmit" class="row">
			<div v-if="loading" class="col-12">
				<md-progress-bar md-mode="indeterminate"></md-progress-bar>
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
				<md-field :class="{ 'md-invalid': $v.form.password.$invalid && $v.form.password.$dirty }">
					<md-icon class="md-primary">vpn_key</md-icon>
					<label>Contrase&ntilde;a</label>
					<md-input @blur="$v.form.password.$touch" type="password" v-model="form.password"></md-input>
					<span class="md-error" v-if="!$v.form.password.required">La contraseña es requerida.</span>
				</md-field>
			</div>
			<div v-if="errorMessage" class="col-12 mb-4 text-center">
				<span class="text-danger">{{ errorMessage }}</span>
			</div>
			<div class="col-6 main-buttons-container">
				<md-button
					@click="changeForm"
					class="md-primary"
					type="button"
					:disabled="loading"
				>
					Registrarse
				</md-button>
			</div>
			<div class="col-6">
				<md-button
					:disabled="$v.form.$invalid || loading"
					class="md-primary md-raised"
					type="submit"
				>
					Iniciar sesi&oacute;n
				</md-button>
			</div>
			<div class="col-12" style="text-align: center;">
				<md-button
					@click="showForgotMyPasswordDialog = true"
					class="md-primary md-dense"
					style="font-size: 12px; margin: 20px 0 0 0;"
				>
					Olvid&eacute; mi contrase&ntilde;a
				</md-button>
			</div>
			<SocialLogin/>
		</form>
		<div class="form-bottom w-100">
			<div class="row">
				<div class="col-6">
					<router-link class='button-action ml-5' to="/">T&eacute;rminos y codiciones</router-link>
				</div>
				<div class="col-6 text-right">
					<router-link class='button-action mr-5' to="/">Pol&iacute;tica de privacidad</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import SocialLogin from '../SocialLogin'
import {
	getAuth,
	signInWithEmailAndPassword,
	sendEmailVerification,
	signOut,
	sendPasswordResetEmail
} from 'firebase/auth'
import FirebaseAuthTranslate from "@/mixins/firebaseAuthTranslate";

export default {
	name: 'Login',
	components: {SocialLogin},
	mixins: [FirebaseAuthTranslate],
	data: () => ({
		form: {
			email: null,
			password: null,
		},
		errorMessage: null,
		loading: false,
		forgotMyPasswordEmail: null,
		showForgotMyPasswordDialog: false,
	}),
	methods: {
		/**
		 * @description
		 * Este método es activado cuando el usuario envía el formulario de inicio de sesión.
		 * Maneja el proceso de inicio de sesión utilizando la Autenticación de Firebase.
		 *
		 * @async
		 * @returns {Promise<void>}
		 */
		async onSubmit() {
			try {
				// Get the Firebase Auth instance
				let auth = getAuth();
				// Set loading state to true to indicate that the login process has started.
				this.loading = true;
				// Reset any previous error messages
				this.errorMessage = null;
				// Attempt to sign in the user with the provided email and password.
				let {user} = await signInWithEmailAndPassword(
					auth,
					this.form.email,
					this.form.password
				)
				// If the user's email is not verified
				if (user.emailVerified === false) {
					// Send a verification email to the user
					await sendEmailVerification(user);
					// Sign out the user
					await signOut(auth);
					// Display a message asking the user to verify their email
					this.errorMessage = "Por favor, verifica tu correo electrónico.";
					// Set loading state to false as the login process has ended
					this.loading = false;
					// Exit the function
					return;
				}
				// Set loading state to false as the login process has ended
				this.loading = false;
				// Redirect the user to the User section
				await this.$router.push({name: "User"});
			} catch (error) {
				// If an error occurs during sign in, translate the error message to Spanish and display it
				this.errorMessage = this.translateFireBaseAuthError(error?.code);
				// Set loading state to false as the login process has ended
				this.loading = false;
			}
		},
		/**
		 * @description
		 * El método `sendForgotMyPasswordEmail` se encarga de enviar un correo electrónico de restablecimiento de contraseña
		 * al usuario con el correo electrónico proporcionado.
		 * @return {Promise<void>}
		 */
		async sendForgotMyPasswordEmail() {
			if (!this.forgotMyPasswordEmail) return;
			await sendPasswordResetEmail(getAuth(), this.forgotMyPasswordEmail);
		},
		/**
		 * @description
		 * El método `changeForm` se encarga de emitir un evento para cambiar el formulario de inicio de sesión
		 * al formulario de registro.
		 */
		changeForm() {
			this.$emit('clicked', 'Register')
		}
	},
	validations: {
		form: {
			email: {
				required,
				email,
			},
			password: {
				required,
			}
		},
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_vars';

.auth__form {
	flex: 1;
	background: white;
	box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.65);
	@include center-layout;
	justify-content: space-between;

	.form-top {
		margin-top: 60px;
	}

	.form-bottom {
		margin-bottom: 30px;

		a {
			//color: #2ec5c5 !important;
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
</style>
