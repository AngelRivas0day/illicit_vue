<template>
    <div class="auth">
        <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="auth__register">
                    <md-button to="/registro" class="md-dense md-raised md-primary">Registro</md-button>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="auth__login">
                    <md-button to="/login" class="md-dense md-raised md-primary">Log in</md-button>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'Auth'
}
</script>

<style lang="scss" scoped>
.extendable{
    display: flex;
    justify-content: center;
    align-items: center;
}
.auth{
    &__register{
        @extend .extendable;
    }
    &__login{
        @extend .extendable;
    }
}
</style>