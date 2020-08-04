<template>
    <div class="auth">
        <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="auth__register">
                    <router-link to="/registro" class="auth-button register">Registro</router-link>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="auth__login">
                    <router-link to="/login" class="auth-button login">Log in</router-link>
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
@import '@/assets/css/_vars';

.extendable{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.auth{
    &__register{
        @extend .extendable;
    }
    &__login{
        @extend .extendable;
    }
    .auth-button{
        border: 1px solid $main-green;
        color: $main-green;
        width: 100% !important;
        padding: 7px 0px;
        margin: 0 5px;
        box-sizing: border-box;
        text-align: center;
        text-decoration: none !important;
        transition: all .3s;
        z-index: 1;
        position: relative;
        &:after{
            transition: all .3s;
            z-index: -1;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 0px;
            width: 100%;
        }
        &:hover:after{
            height: 100%;
            bottom: 0;
            top: inherit;
        }
        &.register{
            &:hover{
                color: white;
            }
            &:after{
                background: $main-green;
            } 
        }
        &.login{
            color: white;
            background: $main-green;
            &:hover{
                color: $main-green;
            }
            &:after{
                background: white;
            }
        }   
    }
}
</style>