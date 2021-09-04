<template>
    <div class="contact">
        <div class="contact__banner">
            <h1 v-title>CON<br>TACTO</h1>
        </div>
        <div class="contact__form">
            <div v-if="emailSentStatus == true" class="form-success">
                <div class="row">
                    <div class="col-12">
                        <md-empty-state
                        class="text-white"
                        md-icon="mark_email_read"
                        md-label="Mensaje envíado"
                        md-description="Tu opinión nos importa. Te contestaremos en menos de 48 horas.">
                            <md-button to="/" class="md-primary md-raised text-decoration-none">Volver al inicio</md-button>
                        </md-empty-state>
                    </div>
                </div>
            </div>
            <div v-if="emailSentStatus == false" class="form-error">
                <div class="row">
                    <div class="col-12">
                        <md-empty-state
                        class="text-white"
                        md-icon="mark_email_read"
                        md-label="Error al envíar mensaje"
                        md-description="Ha ocurrido un error. Por favor inténtalo más tarde. Tu opinión nos importa.">
                            <md-button to="/" class="md-primary md-raised text-decoration-none">Volver al inicio</md-button>
                        </md-empty-state>
                    </div>
                </div>
            </div>
            <div v-if="emailSentStatus == null" class="form-inner">
                <form class="form-row">
                    <div class="col-xs-12 col-sm-12">
                        <md-field>
                            <label>Nombre</label>
                            <md-input v-model="form.fullName" required></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field>
                            <label for="movie">Asunto</label>
                            <md-select v-model="form.matter" required>
                                <md-option value="fight-club">Fight Club</md-option>
                                <md-option value="godfather">Godfather</md-option>
                                <md-option value="godfather-ii">Godfather II</md-option>
                                <md-option value="godfather-iii">Godfather III</md-option>
                                <md-option value="godfellas">Godfellas</md-option>
                                <md-option value="pulp-fiction">Pulp Fiction</md-option>
                                <md-option value="scarface">Scarface</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field>
                            <label>Email</label>
                            <md-input v-model="form.email" required></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <md-field>
                            <label>Mensaje</label>
                            <md-textarea v-model="form.message" md-counter="200" md-autogrow required></md-textarea>
                        </md-field>
                    </div>
                </form>
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
                    <button class="send-button" @click="onSubmit">
                        <span v-if="!isLoading">ENVIAR</span>
                        <span v-else>ENVIANDO...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
    name: 'Contact',
    mounted() {
        document.title = 'Illicit Óptica - Contacto'
        this.setWhiteIcons()
    },
    destroyed(){
        this.unsetWhiteIcons()
        this.emailSentStatus = null
    },
    data: () => ({
        form: {
            fullName: '',
            matter: '',
            email: '',
            message: ''
        }
    }),
    computed:{
        ...mapFields('user', {
            isLoading: 'isLoading',
            emailSentStatus: 'emailSentStatus'
        })
    },
    methods: {
        ...mapActions('user',{
            sendEmail: 'sendEmail'
        }),
        ...mapActions('background',{
           setWhiteIcons: 'setWhiteIcons',
           unsetWhiteIcons: 'unsetWhiteIcons' 
        }),
        async onSubmit(){
            await this.sendEmail(this.form)
            this.resetForm()
        },
        resetForm(){
           this.form = {
                fullName: '',
                matter: '',
                email: '',
                message: ''
            } 
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
@import "@/assets/css/buttonTheme";

.contact{
    @include flex("column","stretch","center");
    min-height: 100vH;
    &__banner{
        flex: 1;
        background:
        linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6))
        ,url("../../assets/img/contacto_bg.jpg");
        background-size: cover;
        h1{
            margin: 55px 30px;
            position: relative;
            color: white;
            font-weight: 100;
            font-size: 36px !important;
            &:after{
                position: absolute;
                content: '';
                bottom: -10px;
                left: 5px;
                width: 20%;
                height: 3px;
                background: red;
            }
        }
    }
    &__form{
        flex: 2;
        background-color: black;
        position: relative;
        @include flex("row","center","center");
        .form-inner{
            width: 100%;
            padding: 0 25px;
            display: block;
            margin: 0 auto;
            .form-row{
                padding-bottom: 80px;
            }
        }
        .form-action{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100vW;
            padding: 0 0 0 25px;
            @include flex("row","center","space-between");
            .action__media{
                flex: 1;
                ul{
                    li{
                        color: white;
                        margin-bottom: 9px;
                        i{
                            width: 30px;
                        }
                    }
                }
            }
            .action__send{
                flex: 1;
                text-align: right;
                .send-button{
                    background-color: white;
                    width: 100%;
                    height: 70px;
                    color: black !important;
                    border: 0 !important;
                }
            }
            @media #{$break-medium}{
                width: 50vW;
                .action__send{
                    .send-button{
                        width: 70%;
                    }
                }
            }
        }
        .form-success{
            ::v-deep .md-empty-state-icon{
                color: rgba(223,223,223,.8) !important;
            }
        }
    }
    @media #{$break-medium}{
        @include flex("row","stretch","center");
        height: 100vH;
        &__banner{
            flex: 1;
            h1{
                font-size: 76px !important;
            }
        }
        &__form{
            flex: 1;
        }
    }
}
</style>
