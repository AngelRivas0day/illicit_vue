<script>
export default {
    name: "AuthWrapper",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<template>
    <div class="auth">
        <div class="auth__form">
            <div class="auth__form__header">
                <slot name="header"></slot>
            </div>
            <div v-if="loading" class="w-100 my-2">
                <md-progress-bar md-mode="indeterminate"></md-progress-bar>
            </div>
            <slot></slot>
            <div class="auth__form__footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div v-responsive.lg.xl class="auth__image">
            <div class="image__logo"></div>
            <img src="@/assets/img/login_bg.jpg" alt="" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/_vars";
.auth {
    background: #dadada;
    &__form__header {
        margin-top: 60px;
        width: 100%;
    }
    &__form__footer {
        margin-bottom: 30px;
        width: 100%;
        a {
            //color: #2ec5c5 !important;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .auth__form {
        flex: 1;
        background: white;
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.65);
        @include center-layout;
        justify-content: space-between;
    }
    &__image {
        flex: 1;
    }
    @media #{$break-medium} {
        min-height: 100vh;
        @include flex("row", "stretch", "center");
        &__image {
            position: relative;
            .image__logo {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.6);
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>
