<template>
    <div class="contact">
        <div class="contact__banner">
            <h1 v-title>CON<br />TACTO</h1>
        </div>
        <div class="contact__form">
            <div v-if="sent && !errorMessage" class="form-success">
                <div class="row">
                    <div class="col-12">
                        <md-empty-state
                            md-icon="mark_email_read"
                            md-label="Mensaje envíado"
                            md-description="Tu opinión nos importa. Te contestaremos en menos de 48 horas."
                        >
                            <md-button
                                to="/"
                                class="md-primary md-raised text-decoration-none"
                                >Volver al inicio</md-button
                            >
                        </md-empty-state>
                    </div>
                </div>
            </div>
            <div v-else-if="!errorMessage" class="form-inner">
                <form class="form-row">
                    <div class="col-xs-12 col-sm-12">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.fullName.$invalid && $v.form.fullName.$dirty,
                            }"
                        >
                            <label>Nombre</label>
                            <md-input
                                @blur="$v.form.fullName.$touch"
                                v-model="form.fullName"
                                required
                            ></md-input>
                            <span v-if="!$v.form.fullName.required" class="md-error">
                                El nombre es requerido
                            </span>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.subject.$invalid && $v.form.subject.$dirty,
                            }"
                        >
                            <label>Asunto</label>
                            <md-input
                                @blur="$v.form.subject.$touch"
                                v-model="form.subject"
                                required
                            ></md-input>
                            <span v-if="!$v.form.subject.required" class="md-error">
                                El asunto es requerido
                            </span>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.email.$invalid && $v.form.email.$dirty,
                            }"
                        >
                            <label>Email</label>
                            <md-input
                                @blur="$v.form.email.$touch"
                                v-model="form.email"
                                required
                            ></md-input>
                            <span v-if="!$v.form.email.required" class="md-error">
                                El email es requerido
                            </span>
                            <span v-else-if="!$v.form.email.email" class="md-error">
                                El email no es válido
                            </span>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.message.$invalid && $v.form.message.$dirty,
                            }"
                        >
                            <label>Mensaje</label>
                            <md-textarea
                                @blur="$v.form.message.$touch"
                                v-model="form.message"
                                md-counter="200"
                                md-autogrow
                                required
                            ></md-textarea>
                            <span v-if="!$v.form.message.required" class="md-error">
                                El mensaje es requerido
                            </span>
                        </md-field>
                    </div>
                </form>
            </div>
            <div v-else-if="errorMessage" class="form-error">
                <div class="row">
                    <div class="col-12">
                        <md-empty-state
                            md-icon="error"
                            md-label="Error al envíar mensaje"
                            :md-description="errorMessage"
                        >
                            <md-button
                                @click="errorMessage = null"
                                class="md-primary md-raised text-decoration-none"
                            >
                                Recargar
                            </md-button>
                        </md-empty-state>
                    </div>
                </div>
            </div>
            <div class="form-action">
                <div class="action__media">
                    <ul class="list-unstyled">
                        <li>
                            <i class="fab fa-instagram"></i>
                            <span>Instagram</span>
                        </li>
                        <li>
                            <i class="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </li>
                    </ul>
                </div>
                <div class="action__send">
                    <button
                        :disabled="$v.form.$invalid || loading"
                        class="send-button"
                        @click="sendEmail"
                    >
                        <span v-if="!loading">ENVIAR</span>
                        <span v-else>ENVIANDO...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Post } from "@/services/api";
import { required, email } from "vuelidate/lib/validators";

export default {
    name: "Contact",
    mounted() {
        this.unsetWhiteIcons();
    },
    data: () => ({
        form: {
            fullName: null,
            subject: null,
            email: null,
            message: null,
        },
        loading: null,
        sent: false,
        errorMessage: null,
    }),
    methods: {
        ...mapActions("background", {
            unsetWhiteIcons: "unsetWhiteIcons",
        }),
        async sendEmail() {
            try {
                this.errorMessage = null;
                this.loading = true;
                await Post({
                    endpoint: "clients/contact",
                    data: this.form,
                    useToken: false,
                });
                this.sent = true;
                this.resetForm();
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.errorMessage =
                    error.response?.data?.message ||
                    "Ha ocurrido un error al enviar el mensaje. Por favor inténtalo más tarde.";
            }
        },
        resetForm() {
            this.form = {
                fullName: null,
                subject: null,
                email: null,
                message: null,
            };
        },
    },
    validations: {
        form: {
            fullName: {
                required,
            },
            subject: {
                required,
            },
            email: {
                required,
                email,
            },
            message: {
                required,
            },
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.contact {
    @include flex("column", "stretch", "center");
    min-height: 100vh;
    &__banner {
        flex: 1;
        background: linear-gradient(rgba(51, 51, 51, 0.8), rgba(51, 51, 51, 0.7)),
            url("../../assets/img/contacto_bg.jpg");
        background-size: cover;
        h1 {
            margin: 55px 30px;
            position: relative;
            color: white;
            font-weight: 100;
            font-size: 36px !important;
            &:after {
                position: absolute;
                content: "";
                bottom: -10px;
                left: 5px;
                width: 20%;
                height: 3px;
                background: red;
            }
        }
    }
    &__form {
        flex: 2;
        background-color: #fdfdfd;
        position: relative;
        @include flex("row", "center", "center");
        .form-inner {
            width: 100%;
            padding: 0 25px;
            display: block;
            margin: 0 auto;
            .form-row {
                padding-bottom: 80px;
            }
        }
        .form-action {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100vw;
            padding: 0 0 0 25px;
            @include flex("row", "center", "space-between");
            .action__media {
                flex: 1;
                ul {
                    li {
                        color: #333;
                        margin-bottom: 9px;
                        i {
                            width: 30px;
                        }
                    }
                }
            }
            .action__send {
                flex: 1;
                text-align: right;
                .send-button {
                    background-color: #333;
                    width: 100%;
                    height: 70px;
                    color: #fdfdfd !important;
                    border: 0 !important;
                    transition: 0.3s;
                    &:disabled {
                        background-color: #ccc;
                    }
                }
            }
            @media #{$break-medium} {
                width: 50vw;
                .action__send {
                    .send-button {
                        width: 70%;
                    }
                }
            }
        }
    }
    @media #{$break-medium} {
        @include flex("row", "stretch", "center");
        height: 100vh;
        &__banner {
            flex: 1;
            h1 {
                font-size: 76px !important;
            }
        }
        &__form {
            flex: 1;
        }
    }
}
</style>
