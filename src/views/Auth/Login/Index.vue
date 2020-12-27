<template>
    <div class="auth__form">
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
            <div v-if="isLoading" class="col-12">
                <md-progress-bar md-mode="indeterminate"></md-progress-bar>
            </div>
            <div class="col-xs-12 col-sm-12">
                <md-field>
                    <md-icon v-if="!success" class="md-primary">warning</md-icon>
                    <md-icon v-if="success" class="md-accent">alternate_email</md-icon>
                    <label>Correo</label>
                    <md-input v-model="form.email"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12">
                <md-field>
                    <md-icon v-if="!success" class="md-primary">warning</md-icon>
                    <md-icon v-if="!isPasswordValid && success" class="md-accent">vpn_key</md-icon>
                    <md-icon v-if="isPasswordValid && success" class="md-accent">done</md-icon>
                    <label>Contrase&ntilde;a</label>
                    <md-input type="password" v-model="form.password"></md-input>
                </md-field>
            </div>
            <div v-if="!success" class="col-12 mb-4 text-center">
                <span class="text-danger">{{ errMessage }}</span>
            </div>
            <div class="col-6">
                <md-button @click="changeForm" class="login-button" type="button">Registrarse</md-button>
            </div>
            <div class="col-6">
                <md-button :disabled="!isFormValid" class="register-button" type="submit">Iniciar sesi&oacute;n</md-button>
            </div>
            <SocialLogin />
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
import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import SocialLogin from '../SocialLogin'

export default {
    name: 'Login',
    components: {
        SocialLogin
    },
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        errors: [],
        submitStatus: null
    }),
    methods: {
        ...mapActions('user',{
            login:'login'
        }),
        onSubmit(e){
            e.preventDefault();
            this.login({
                email: this.form.email,
                password: this.form.password
            })
            .then(resp=>{
                console.log(resp)
                this.$router.push({name: 'User'})
            })
            .catch(err=>{
                console.log(err)
            })
        },
        changeForm(){
            this.$emit('clicked', 'Register')
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
        },
        ...mapState('user',{
            success: 'success',
            isLoading: 'isLoading',
            errMessage: 'errMessage'
        })
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

    .auth__form{
        flex: 1;
        background: white;
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.65);
        @include center-layout;
        justify-content: space-between;
        .form-top{
            margin-top: 55px;
            @media #{$break-large}{
                margin-top: 30px;
            }
        }
        .form-bottom{
            margin-bottom: 30px;
            a{
                color: #2ec5c5 !important;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        form{
            width: 90%;
            .button-action{
                font-weight: 100 !important;
                text-transform: none !important;
                text-align: center;
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
            @media #{$break-medium}{
                width: 60% !important;
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