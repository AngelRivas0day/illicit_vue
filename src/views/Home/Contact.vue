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

.contact{
    padding: 50px 0;
    background: #f7f7f7;
    @media #{$break-medium}{
        padding: 150px 0;
    }
    button{
        @include secondary-button-br($main-green, $main-green) 
    }
}
</style>