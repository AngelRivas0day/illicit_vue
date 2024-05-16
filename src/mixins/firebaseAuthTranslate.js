export default {
	methods: {
		translateFireBaseAuthError(code) {
			switch (code) {
				case 'auth/invalid-email':
					return 'El correo electrónico no es válido.';
				case 'auth/user-disabled':
					return 'El usuario correspondiente al correo electrónico dado ha sido desactivado.';
				case 'auth/user-not-found':
					return 'No hay ningún usuario correspondiente al correo electrónico dado.';
				case 'auth/wrong-password':
					return 'La contraseña es inválida para el correo electrónico dado, o la cuenta correspondiente al correo electrónico no tiene una contraseña establecida.';
				case 'auth/email-already-in-use':
					return 'Ya existe una cuenta con la dirección de correo electrónico dada.';
				case 'auth/operation-not-allowed':
					return 'Estás intentando iniciar sesión con un método que no está habilitado en tu configuración de Autenticación de Firebase.';
				case 'auth/too-many-requests':
					return 'Las solicitudes están bloqueadas desde un dispositivo debido a una actividad inusual. También puede ser lanzado cuando el servidor está ocupado y no pudo manejar la solicitud.';
				case 'auth/network-request-failed':
					return 'Se produjo un error de red (como tiempo de espera, conexión interrumpida o host inalcanzable).';
				case 'auth/weak-password':
					return 'La contraseña es demasiado débil.';
				case 'auth/requires-recent-login':
					return 'Esta operación es sensible y requiere autenticación reciente. Vuelve a iniciar sesión antes de intentar esta solicitud.';
				default:
					return 'Ha ocurrido un error desconocido.';
			}
		}
	}
}
