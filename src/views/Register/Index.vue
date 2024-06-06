<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Post } from "@/services/api";
import FirebaseAuthTranslate from "@/mixins/firebaseAuthTranslate";
import AuthWrapper from "@/components/AuthWrapper.vue";

export default {
    name: "Register",
    components: {
        AuthWrapper,
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
                await createUserWithEmailAndPassword(
                    auth,
                    this.form.email,
                    this.form.password,
                );
                // Crear el cliente en la base de datos para almacenar la información adicional
                await Post({
                    endpoint: "clients",
                    data: {
                        name: this.form.name,
                        last_name: this.form.lastName,
                        phone_number: this.form.phoneNumber,
                        birth_day: this.form.birthDay,
                    },
                    useToken: true,
                });

                // Sync the users favorite products with the database
                const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                if (favorites.length > 0) {
                    await Post({
                        endpoint: "clients/favorites/sync",
                        data: favorites,
                        useToken: true,
                    });
                    localStorage.removeItem("favorites");
                }

                this.loading = false;
                // Redirigir al usuario a la página de verificación de correo electrónico
                await this.$router.push({ name: "RegisterWelcome" });
            } catch (error) {
                this.errorMessage = this.translateFireBaseAuthError(error?.code);
                this.loading = false;
            }
        },
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

<template>
    <div id="register">
        <auth-wrapper :loading="loading">
            <template v-slot:header>
                <div class="row">
                    <div class="col-6">
                        <p class="ml-5">Registro</p>
                    </div>
                    <div class="col-6 text-right">
                        <p class="mr-5">ILLICIT</p>
                    </div>
                </div>
            </template>
            <form @submit.prevent="onSubmit" class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field
                        :class="{
                            'md-invalid': $v.form.name.$invalid && $v.form.name.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">account_circle</md-icon>
                        <label>Nombre</label>
                        <md-input
                            @blur="$v.form.name.$touch"
                            v-model="form.name"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.name.required"
                            >El nombre es requerido.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.lastName.$invalid && $v.form.lastName.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">account_circle</md-icon>
                        <label>Apellido</label>
                        <md-input
                            @blur="$v.form.lastName.$touch"
                            v-model="form.lastName"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.lastName.required"
                            >El apellido es requerido.</span
                        >
                    </md-field>
                </div>
                <div class="col-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.birthDay.$invalid && $v.form.birthDay.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">event</md-icon>
                        <label>Fecha de nacimiento</label>
                        <md-input
                            @blur="$v.form.birthDay.$touch"
                            v-model="form.birthDay"
                            type="date"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.birthDay.required"
                            >La fecha de nacimiento es requerida.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid': $v.form.email.$invalid && $v.form.email.$dirty,
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
                        <span class="md-error" v-else-if="!$v.form.email.email"
                            >El correo no es válido.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.phoneNumber.$invalid &&
                                $v.form.phoneNumber.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">smartphone</md-icon>
                        <label>N&uacute;mero de tel&eacute;fono</label>
                        <md-input
                            @blur="$v.form.phoneNumber.$touch"
                            v-model="form.phoneNumber"
                            v-mask="'+## ###-###-####'"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.phoneNumber.required"
                            >El n&uacute;mero es requerido.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.password.$invalid && $v.form.password.$dirty,
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
                            >La contrase&ntilde;a es requerida.</span
                        >
                        <span class="md-error" v-else-if="!$v.form.password.minLength"
                            >La contrase&ntilde;a debe tener al menos 6 caracteres.</span
                        >
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <md-field
                        :class="{
                            'md-invalid':
                                $v.form.repeatedPassword.$invalid &&
                                $v.form.repeatedPassword.$dirty,
                        }"
                    >
                        <md-icon class="md-primary">done</md-icon>
                        <label>Repetir contrase&ntilde;a</label>
                        <md-input
                            @blur="$v.form.repeatedPassword.$touch"
                            type="password"
                            v-model="form.repeatedPassword"
                        ></md-input>
                        <span class="md-error" v-if="!$v.form.repeatedPassword.required"
                            >La contrase&ntilde;a es requerida.</span
                        >
                        <span
                            class="md-error"
                            v-else-if="!$v.form.repeatedPassword.sameAsPassword"
                            >Las contrase&ntilde;as no coinciden.</span
                        >
                        <span
                            class="md-error"
                            v-else-if="!$v.form.repeatedPassword.minLength"
                            >La contrase&ntilde;a debe tener al menos 6 caracteres.</span
                        >
                    </md-field>
                </div>
                <div v-if="errorMessage" class="col-12 mb-4 text-center">
                    <span class="text-danger">{{ errorMessage }}</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 login-button-col">
                    <md-button
                        @click="$router.push({ name: 'Login' })"
                        class="md-primary md-stroked d-block mx-auto"
                        type="button"
                        :disabled="loading"
                    >
                        Iniciar sesi&oacute;n
                    </md-button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-button
                        :disabled="$v.form.$invalid || loading"
                        :loading="loading"
                        class="md-primary md-raised d-block mx-auto"
                        type="submit"
                    >
                        Registrarse
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
#register {
    form {
        width: 90%;

        .login-button-col {
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

        [class*="-button"]:not(.md-icon-button) {
            min-width: 150px;
        }

        @media #{$break-medium} {
            width: 60% !important;
        }
    }
}
</style>
