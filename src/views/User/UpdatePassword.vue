<template>
	<div>
		<md-card class="my-4">
			<md-card-header>
				<div class="md-title">Actualizar contraseña</div>
			</md-card-header>
			<md-card-content>
				<form class="row">
					<div class="col-12" v-if="errorMessage">
						<request-error-message
							:message="errorMessage"
							@closed-message="errorMessage = null"
						/>
					</div>
					<div class="col-12">
						<md-field
							:class="{ 'md-invalid': $v.form.currentPassword.$invalid && $v.form.currentPassword.$dirty }"
						>
							<label>Contraseña actual</label>
							<md-input
								@blur="$v.form.currentPassword.$touch"
								v-model="form.currentPassword"
								type="password"
							></md-input>
							<span class="md-error" v-if="!$v.form.currentPassword.required">
								La contraseña actual es requerida.
							</span>
						</md-field>
					</div>
					<div class="col-12">
						<md-field
							:class="{ 'md-invalid': $v.form.newPassword.$invalid && $v.form.newPassword.$dirty }"
						>
							<label>Nueva contraseña</label>
							<md-input
								@blur="$v.form.newPassword.$touch"
								v-model="form.newPassword"
								type="password"
							></md-input>
							<span class="md-error" v-if="!$v.form.newPassword.required">
								La nueva contraseña es requerida.
							</span>
						</md-field>
					</div>
					<div class="col-12">
						<md-field
							:class="{ 'md-invalid': $v.form.confirmNewPassword.$invalid && $v.form.confirmNewPassword.$dirty }"
						>
							<label>Confirmar nueva contraseña</label>
							<md-input
								@blur="$v.form.confirmNewPassword.$touch"
								v-model="form.confirmNewPassword"
								type="password"
							></md-input>
							<span class="md-error" v-if="!$v.form.confirmNewPassword.required">
								La confirmaci&oacute;n de la nueva contrase&ntilde;a es requerida.
							</span>
							<span class="md-error" v-if="!$v.form.confirmNewPassword.sameAs">
								Las contrase&ntilde;as no coinciden.
							</span>
						</md-field>
					</div>
				</form>
			</md-card-content>
			<md-card-actions>
				<md-button
					:disabled="$v.form.$invalid || loading"
					class="md-primary md-dense md-raised"
					@click="onSubmit"
				>
					Actualizar
				</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>


<script>
import {required, sameAs} from "vuelidate/lib/validators";
import {getAuth, signInWithEmailAndPassword, updatePassword} from "firebase/auth";
import RequestErrorMessage from "@/components/RequestErrorMessage.vue";
import FirebaseAuthTranslate from "@/mixins/firebaseAuthTranslate";

export default {
	name: "UpdatePassword",
	components: {RequestErrorMessage},
	mixins: [FirebaseAuthTranslate],
	data: () => ({
		form: {
			currentPassword: null,
			newPassword: null,
			confirmNewPassword: null,
		},
		loading: false,
		errorMessage: null,
	}),
	methods: {
		/**
		 * @description
		 * The `onSubmit` method verifies the current password and then updates the password
		 * if the current password is correct.
		 * @returns {Promise<void>}
		 */
		async onSubmit() {
			try {
				const auth = getAuth();
				const user = auth.currentUser;
				this.loading = true;
				this.errorMessage = null;

				// Verify the current password
				await signInWithEmailAndPassword(auth, user.email, this.form.currentPassword);

				// Update the password
				await updatePassword(user, this.form.newPassword);

				// Sign in again with the updated password
				await signInWithEmailAndPassword(auth, user.email, this.form.newPassword);

				// Reset the form and show a success message
				this.form = {
					currentPassword: null,
					newPassword: null,
					confirmNewPassword: null,
				};
				this.loading = false;
				this.$v.form.$reset();
				this.$notify({
					group: 'user',
					type: 'success',
					text: 'Contraseña actualizada correctamente.',
				})
			} catch (error) {
				this.errorMessage = this.translateFireBaseAuthError(error?.code);
				this.loading = false;
			}
		},
	},
	validations: {
		form: {
			currentPassword: {
				required: required
			},
			newPassword: {
				required: required,
			},
			confirmNewPassword: {
				required: required,
				sameAs: sameAs('newPassword'),
			}
		}
	}
}
</script>
