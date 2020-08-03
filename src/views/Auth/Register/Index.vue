<template>
    <div class="register">
        <md-card class="register-card">
            <md-card-header>
                <div class="md-title">Registro</div>
            </md-card-header>
            <md-card-content>
                <form @submit="onSubmit" class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field>
                            <md-icon class="md-accent">account_circle</md-icon>
                            <label>Nombre</label>
                            <md-input v-model="form.firstName"></md-input>
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
                            <!-- <md-icon v-if="!arePasswordsEqual" class="md-accent">vpn_key</md-icon>
                            <md-icon v-if="arePasswordsEqual" class="md-accent">done</md-icon> -->
                            <label>Contrase&ntilde;a</label>
                            <md-input type="password" v-model="form.password"></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <md-field>
                            <!-- <md-icon v-if="!arePasswordsEqual" class="md-accent">warning</md-icon>
                            <md-icon v-if="arePasswordsEqual" class="md-accent">done</md-icon> -->
                            <label>Repetir contrase&ntilde;a</label>
                            <md-input type="password" v-model="form.repeatedPassword"></md-input>
                        </md-field>
                    </div>
                    <div class="col-12">
                        {{!$v.form.password.required}}
                        <md-button type="submit">Registrarse</md-button>
                    </div>
                </form>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import {
    required,
    minLength,
    sameAs,
    email
} from 'vuelidate/lib/validators'

export default {
    name: 'Register',
    data: () => ({
        form: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatedPassword: ''

        },
        errors: []
    }),
    methods: {
        onSubmit(){
            if(this.errors.length == 0){
                console.log("No errors")
            }
        }
    },
    validations: {
        form: {
            firstName: {
                required,
                minLength: minLength(3)
            },
            lastName: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatedPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.register{
    background: #dadada;
    @include center-layout;
    &-card{
        width: 80%;
        @media #{$break-medium}{
            width: 40%;
        }
    }
}
</style>