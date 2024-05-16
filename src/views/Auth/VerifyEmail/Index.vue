<template>
	<div class="verify-email-container">
		<h1>¡Hola, {{ userName }}!</h1>
		<p>
			Se ha enviado un correo de verificación a <strong>{{ userEmail }}</strong>. Por favor, verifica tu correo para poder acceder a tu cuenta.
		</p>
	</div>
</template>

<script>
import {getAuth, sendEmailVerification, signOut} from 'firebase/auth'

export default {
	name: 'VerifyEmail',
	data: () => ({
		userName: null,
		userEmail: null,
		errorMessage: null,
	}),
	async mounted() {
		const auth = getAuth();
		const user = auth.currentUser;
		this.userName = user.displayName;
		this.userEmail = user.email;
		await sendEmailVerification(auth.currentUser)
			.catch((error) => {
				this.errorMessage = this.translateEmailVerificationErrorToSpanish(error.code);
			});
		await signOut(auth);
	},
	translateEmailVerificationErrorToSpanish(errorCode) {
		switch (errorCode) {
			case 'auth/argument-error':
				return 'Los argumentos proporcionados no son válidos.';
			case 'auth/invalid-user-token':
				return 'La credencial del usuario ya no es válida. El usuario debe iniciar sesión de nuevo.';
			case 'auth/user-token-expired':
				return 'El token del usuario ha expirado. El usuario debe iniciar sesión de nuevo.';
			case 'auth/too-many-requests':
				return 'La solicitud fue bloqueada debido a actividad inusual. El usuario debe intentarlo de nuevo después de un tiempo.';
			case 'auth/user-disabled':
				return 'La cuenta del usuario ha sido deshabilitada por un administrador.';
			case 'auth/user-not-found':
				return 'El usuario correspondiente al token proporcionado no existe.';
			case 'auth/operation-not-allowed':
				return 'El tipo de cuenta correspondiente al token proporcionado no está habilitado. Habilita el tipo de cuenta en la consola de Firebase, en la pestaña Auth.';
			default:
				return 'Ha ocurrido un error desconocido.';
		}
	}
};
</script>

<style lang="scss" scoped>
.verify-email-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		text-align: center;
	}
	p {
		font-size: 1.5rem;
		text-align: center;
		margin-left: 1rem;
		margin-right: 1rem;
	}
}
</style>
