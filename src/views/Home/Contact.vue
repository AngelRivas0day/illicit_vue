<template>
    <div class="contact">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
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
    padding: 160px 0;
    // background: 
    //     linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    //     url('../../assets/img/papper-min.png');
    // background-position: center;
    // background-size: cover;
    background: #f7f7f7;
    @media #{$break-medium}{
        padding: 130px 0;
    }
    &-title{
        font-size: 30px;
        margin-bottom: 10px;
        color: #222;
        text-transform: uppercase;
        @media #{$break-medium}{
            font-size: 45px;
            // overflow: hidden;
            // -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
            // -webkit-text-stroke-width: 2px;
            // -webkit-text-stroke-color: #dadada;
        }
    }
    &-text{
        color: #222;
    }
    button{
        @include secondary-button-br($main-green, $main-green) 
    }
}
</style>