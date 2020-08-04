<template>
    <div class="login">
        <div class="login__form">
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
            <form @submit="onSubmit" class="row">
                <div class="col-xs-12 col-sm-12">
                    <md-field>
                        <md-icon class="md-accent">alternate_email</md-icon>
                        <label>Correo</label>
                        <md-input v-model="form.email"></md-input>
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
                <div class="col-6">
                    <md-button to="/registro" class="login-button" type="button">Registrarse</md-button>
                </div>
                <div class="col-6">
                    <md-button :disabled="isFormValid" class="register-button" type="submit">Iniciar sesi&oacute;n</md-button>
                </div>
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
        <div class="login__image">
            <div class="image__logo">
                <!-- <img src="" alt=""> -->
            </div>
            <img src="@/assets/img/login_bg.jpg" alt="">
        </div>
    </div>
</template>

<script>
import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        errors: [],
        submitStatus: null
    }),
    methods: {
        onSubmit(){
            if(this.errors.length == 0){
                console.log("No errors")
            }
        }
    },
    computed: {
        isPasswordValid(){
            if(this.$v.form.password.minLength & this.$v.form.password.required){
                return true
            }else{
                return false
            }
        },
        isFormValid(){
            if(this.isPasswordValid){
                return true
            }else{
                return false
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_vars';

.login{
    background: #dadada;
    &__form{
        flex: 1;
        background: white;
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.65);
        @include center-layout;
        justify-content: space-between;
        .form-top{
            margin-top: 30px;
        }
        .form-bottom{
            margin-bottom: 30px;
            a{
                color: #2ec5c5 !important;
            }
        }
        form{
            width: 90%;
            .button-action{
                font-weight: 100 !important;
                text-transform: none !important;
            }
            [class*="-button"]{
                min-width: 150px;
            }
            .register-button{
                display: block;
                margin: 0 auto;
                width: 60%;
                background: #2ec5c5 !important;
                color: black;
            }
            .login-button{
                display: block;
                margin: 0 auto;
                width: 60%;
                border: 1.2px solid #2ec5c5;
                color: black;
            }
        }
    }
    &__image{
        flex: 1;
    }
    @media #{$break-medium}{
        height: 100vH;
        @include flex("row","stretch","center");
        &__form{
            form{
                width: 60%;
            }
        }
        &__image{
            position: relative;
            .image__logo{
                width: 30px;
                height: 30px;
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(255,255,255,.6);
            }
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
}

::v-deep .md-field.md-theme-default{
    color: black !important;
    input{
        -webkit-text-fill-color: #333333 !important;
    }
    i:after{
        height: 0px !important;
    }
}

::v-deep .md-field.md-theme-default label{
    color: black !important;
}

::v-deep .md-field.md-theme-default.md-focused .md-icon{
    color: #2ec5c5 !important;
}

::v-deep .md-field.md-theme-default:after {
    background-color: black !important;
}

::v-deep .md-field.md-theme-default:before {
    background-color: black !important;
}
</style>