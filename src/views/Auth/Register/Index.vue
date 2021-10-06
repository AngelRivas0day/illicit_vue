<template>
	<div class="auth__form">
		<div class="form-top mt-5 w-100">
			<div class="row mt-3">
				<div class="col-6">
					<p class="ml-5">Registro</p>
				</div>
				<div class="col-6 text-right">
					<p class="mr-5">ILLICIT</p>
				</div>
			</div>
		</div>
		<form @submit="onSubmit" class="row">
			<div v-if="isLoading" class="col-12 mb-3">
				<md-progress-bar md-mode="indeterminate"></md-progress-bar>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6">
				<md-field>
					<md-icon class="md-accent">account_circle</md-icon>
					<label>Nombre</label>
					<md-input v-model="form.name"></md-input>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6">
				<md-field>
					<md-icon class="md-accent">account_circle</md-icon>
					<label>Apellido</label>
					<md-input v-model="form.lastName"></md-input>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field>
					<md-icon class="md-accent">alternate_email</md-icon>
					<label>Correo</label>
					<md-input v-model="form.email"></md-input>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field>
					<md-icon class="md-accent">phone</md-icon>
					<label>N&uacute;mero de telefono</label>
					<md-input v-model="form.model" v-mask="'+## ###-###-####'"></md-input>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field>
					<md-icon v-if="!isPasswordValid" class="md-accent">vpn_key</md-icon>
					<md-icon v-if="isPasswordValid" class="md-accent">done</md-icon>
					<label>Contrase&ntilde;a</label>
					<md-input type="password" v-model="form.password"></md-input>
				</md-field>
			</div>
			<div class="col-xs-12 col-sm-12">
				<md-field>
					<md-icon v-if="!isRepeatedPasswordValid" class="md-accent">warning</md-icon>
					<md-icon v-if="isRepeatedPasswordValid" class="md-accent">done</md-icon>
					<label>Repetir contrase&ntilde;a</label>
					<md-input type="password" v-model="form.repeatedPassword"></md-input>
				</md-field>
			</div>
			<div v-if="!success" class="col-12 mb-4 text-center">
				<span class="text-danger">{{ errMessage }}</span>
			</div>
			<div class="col-6">
				<md-button @click="changeForm" class="login-button" type="button"> Iniciar sesi&oacute;n </md-button>
			</div>
			<div class="col-6">
				<md-button :disabled="!isFormValid" class="register-button" type="submit">Registrarse</md-button>
			</div>
			<SocialLogin />
		</form>
		<div class="form-bottom w-100">
			<div class="row">
				<div class="col text-center">
					<span class="button-action fake-link" @click="goToPrivacy">Pol&iacute;tica de privacidad</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import SocialLogin from '../SocialLogin'

export default {
	name: 'Register',
	components: {
		SocialLogin,
	},
	data: () => ({
		form: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			phone: '',
		},
		repeatedPassword: '',
		errors: [],
		submitStatus: null,
	}),
	methods: {
		...mapActions('user', {
			register: 'register',
		}),
		onSubmit(e) {
			e.preventDefault()
			const user = {
				name: this.form.name,
				lastName: this.form.lastName,
				email: this.form.email,
				password: this.form.password,
			}
			this.register(user)
				.then()
				.catch(() => {
					this.$notify({
						group: 'user',
						title: 'Ha habido un error',
						text: 'Ha habido un error al registrarte. Por favor inténtalo más tarse.',
						type: 'warn',
					})
				})
		},
		changeForm() {
			this.$emit('clicked', 'Login')
		},
		goToPrivacy() {
			window.open('https://www.iubenda.com/privacy-policy/79149079', '_blank')
		},
	},
	computed: {
		...mapState('user', {
			isLoading: 'isLoading',
			success: 'success',
			errMessage: 'errMessage',
		}),
		isRepeatedPasswordValid() {
			if (this.$v.form.repeatedPassword.sameAsPassword && this.$v.form.repeatedPassword.minLength & this.$v.form.repeatedPassword.required) {
				return true
			} else {
				return false
			}
		},
		isPasswordValid() {
			if (this.$v.form.password.sameAsRepeatedPassword && this.$v.form.password.minLength & this.$v.form.password.required) {
				return true
			} else {
				return false
			}
		},
		isFormValid() {
			if (this.isRepeatedPasswordValid && this.isPasswordValid) {
				return true
			} else {
				return false
			}
		},
	},
	validations: {
		form: {
			name: {
				required,
				minLength: minLength(3),
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
				sameAsRepeatedPassword: sameAs('repeatedPassword'),
			},
			repeatedPassword: {
				required,
				sameAsPassword: sameAs('password'),
				minLength: minLength(6),
			},
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.auth {
	background: #dadada;
	&__form {
		flex: 1;
		background: white;
		box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.65);
		@include center-layout;
		justify-content: space-between;
		.form-top {
			margin-top: 55px;
			@media #{$break-large} {
				margin-top: 30px;
			}
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
			[class*='-button'] {
				min-width: 150px;
			}
			.register-button {
				display: block;
				margin: 0 auto;
				width: 60%;
				background: #2ec5c5 !important;
				color: black;
			}
			.login-button {
				display: block;
				margin: 0 auto;
				width: 60%;
				border: 1.2px solid #2ec5c5;
				color: black;
			}
			@media #{$break-medium} {
				width: 60% !important;
			}
		}
	}
}

::v-deep .md-field.md-theme-default {
	color: black !important;
	input {
		-webkit-text-fill-color: #333333 !important;
	}
	i:after {
		height: 0px !important;
	}
}

::v-deep .md-field.md-theme-default label {
	color: #333333 !important;
}

::v-deep .md-field.md-theme-default.md-focused .md-icon {
	color: #333333 !important;
}

::v-deep .md-field.md-theme-default:after {
	background-color: #333333 !important;
}

::v-deep .md-field.md-theme-default:before {
	background-color: #2ec5c5 !important;
}
</style>
