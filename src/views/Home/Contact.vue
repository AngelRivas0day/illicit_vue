<template>
    <div class="contact">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 offset-md-6 col-md-6 text-right">
                    <h3 class="contact-title">Cont&aacute;ctanos</h3>
                    <p class="contact-text mb-3">Tu opini&oacute;n nos interesa.</p>
                    <button @click="goToContact" class="contact-button">
                        <div>Env&iacute;a tu mensaje</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    methods: {
        goToContact(){
            this.$router.push({name: 'Contact'})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

@mixin main-call-to-action($bg-color, $text-color){
    border: 1.5px solid #{$text-color};
    height: 35px;
    width: 140px;
    padding: 0;
    background-color: transparent;
    position: relative;
    border: none !important;
    &:hover div::before{
        height: 100%;
    }
    &:hover div::after{
        width: 100%;
    }
    div{
        position: relative;
        width: 100%;
        height: 100%;
        color: $text-color;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $main-green;
        &:after, &:before{
            transition: .2s all;
            position: absolute;
            content: '';
            background: #{$bg-color};
        }
        &:after{
            width: 0%;
            height: 1px;
            top: 0;
            left: 0;
        }
        &:before{
            width: 1px;
            height: 0%;
            top: 0;
            left: 0;
        }
    }
    &:after, &:before{
        position: absolute;
        content: '';
        background: #{$bg-color};
    }
    &:after{
        width: 100%;
        height: 1px;
        bottom: 0;
        right: 0;
    }
    &:before{
        width: 1px;
        height: 100%;
        bottom: 0;
        right: 0;
    }
}

.contact{
    padding: 50px 0;
    background: #f7f7f7;
    @media #{$break-medium}{
        padding: 150px 0;
    }
    button{
        @include main-call-to-action($main-green, $main-green) 
    }
}
</style>