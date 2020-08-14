<template>
    <form class="account-form form row">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <md-icon class="md-accent">account_circle</md-icon>
                <label>Nombre</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <md-icon class="md-accent">account_circle</md-icon>
                <label>Apellido</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <md-icon class="md-accent">alternate_email</md-icon>
                <label>Correo</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <md-icon class="md-accent">local_phone</md-icon>
                <label>Tel&eacute;fono</label>
                <md-input></md-input>
            </md-field>
        </div>
    </form>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/css/_vars';
.account-form{
    @include white_form;
}
</style>