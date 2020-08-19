<template>
    <div class="auth">
        <div class="auth__form">
            <!-- <keep-alive> -->
                <component @clicked="changeComponent" :is="activeComponent" />
            <!-- </keep-alive> -->
        </div>
        <div v-responsive.lg.xl class="auth__image">
            <div class="image__logo">
                <!-- <img src="" alt=""> -->
            </div>
            <img src="@/assets/img/login_bg.jpg" alt="">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Auth',
    components: { 
        Login: () => import(/* webpackChunkName: "LoginComponent" */'./Login/Index'),
        Register: () => import(/* webpackChunkName: "RegisterComponent" */'./Register/Index')
    },
    computed: {
        ...mapState('user',{
            isLoading: 'isLoading'
        })
    },
    data: () => ({
        activeComponent: 'Login'
    }),
    methods: {
        changeComponent(component){
            this.activeComponent = component
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.auth{
    background: #dadada;
    .auth__form{
        flex: 1;
    }
    &__image{
        flex: 1;
    }
    @media #{$break-medium}{
        height: 100vH;
        @include flex("row","stretch","center");
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