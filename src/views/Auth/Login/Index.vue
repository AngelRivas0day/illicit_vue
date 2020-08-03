<template>
    <div class="login">
        <md-card class="login-card">
            <md-card-header>
                <div class="md-title">Log in</div>
            </md-card-header>
            <md-card-content>
                <form action="" class="row">
                    <div class="col-xs-12 col-sm-12">
                        <md-field>
                            <md-icon class="md-accent">alternate_email</md-icon>
                            <label>Correo</label>
                            <md-input v-model="form.email"></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <md-field>
                            <md-icon class="md-accent">vpn_key</md-icon>
                            <label>Contrase&ntilde;a</label>
                            <md-input type="password" v-model="form.password"></md-input>
                        </md-field>
                    </div>
                </form>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        }
    })
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_vars';

.login{
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