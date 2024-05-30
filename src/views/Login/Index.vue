<script>
import AuthWrapper from "@/components/AuthWrapper.vue";
import { required, email } from "vuelidate/lib/validators";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import FirebaseAuthTranslate from "@/mixins/firebaseAuthTranslate";

export default {
    name: "Login",
    components: { AuthWrapper },
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
                const auth = getAuth();
                this.loading = true;
                this.errorMessage = null;
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    this.form.email,
                    this.form.password,
                );
                if (user.emailVerified === false) {
                    await sendEmailVerification(user);
                    await signOut(auth);
                    this.errorMessage =
                        "Por favor, verifica tu correo electrónico.";
                    this.loading = false;
                    return;
                }
                this.loading = false;
                await this.$router.push({ name: "Account" });
            } catch (error) {
                this.errorMessage = this.translateFireBaseAuthError(
                    error?.code,
                );
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
    },
    validations: {
        form: {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
        },
    },
};
</script>

<template>
    <div id="login">
        <md-dialog-prompt
            :md-active.sync="showForgotMyPasswordDialog"
            v-model="forgotMyPasswordEmail"
            md-title="Olvidé mi contraseña"
            md-input-placeholder="Correo electrónico"
            md-confirm-text="Envíar correo de recuperación"
            md-cancel-text="Cancelar"
            @md-confirm="sendForgotMyPasswordEmail"
        />
        <auth-wrapper :loading="loading">
            <template v-slot:header>
                <div class="row">
                    <div class="col-6">
                        <p class="ml-5">Inicio de sesi&oacute;n</p>
                    </div>
                    <div class="col-6 text-right">
                        <p class="mr-5">ILLICIT</p>
                    </div>
                </div>
            </template>
            <form @submit.prevent="onSubmit" class="row">
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.email.$invalid && $v.form.email.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">alternate_email</md-icon>
                        <label>Correo</label>
                        <md-input
                            @blur="$v.form.email.$touch"
                            v-model="form.email"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.email.required"
                            >El correo es requerido.</span
                        >
                        <span class="md-error" v-if="!$v.form.email.email"
                            >El correo no es válido.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.password.$invalid &&
                                $v.form.password.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">vpn_key</md-icon>
                        <label>Contrase&ntilde;a</label>
                        <md-input
                            @blur="$v.form.password.$touch"
                            type="password"
                            v-model="form.password"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.password.required"
                            >La contraseña es requerida.</span
                        >
                    </md-field>
                </div>
                <div v-if="errorMessage" class="col-12 mb-4 text-center">
                    <span class="text-danger">{{ errorMessage }}</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 register-button-col">
                    <md-button
                        @click="$router.push({ name: 'Register' })"
                        class="md-primary d-block mx-auto"
                        type="button"
                        :disabled="loading"
                    >
                        Registrarse
                    </md-button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-button
                        :disabled="$v.form.$invalid || loading"
                        class="md-primary md-raised md-primary d-block mx-auto"
                        type="submit"
                    >
                        Iniciar sesi&oacute;n
                    </md-button>
                </div>
                <div class="col-12">
                    <md-button
                        @click="showForgotMyPasswordDialog = true"
                        class="md-primary md-dense d-block mx-auto"
                        style="font-size: 12px; margin: 20px 0 0 0"
                    >
                        Olvid&eacute; mi contrase&ntilde;a
                    </md-button>
                </div>
            </form>
            <template v-slot:footer>
                <div class="row">
                    <div class="col-6">
                        <router-link class="button-action ml-5" to="/"
                            >T&eacute;rminos y codiciones</router-link
                        >
                    </div>
                    <div class="col-6 text-right">
                        <router-link class="button-action mr-5" to="/"
                            >Pol&iacute;tica de privacidad</router-link
                        >
                    </div>
                </div>
            </template>
        </auth-wrapper>
    </div>
</template>

<style lang="scss">
@import "@/assets/css/_vars";
#login {
    form {
        width: 90%;

        .register-button-col {
            display: none;
            @media #{$break-medium} {
                display: block;
            }
        }

        .button-action {
            font-weight: 100 !important;
            text-transform: none !important;
            text-align: center;
        }

        [class*="-button"] {
            min-width: 150px;
        }

        @media #{$break-medium} {
            width: 60% !important;
        }
    }
}
</style>
