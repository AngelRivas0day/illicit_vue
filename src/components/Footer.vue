<template>
    <div class="footer">
        <div class="footer-inner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <router-link to="/" class="d-flex flex-row align-items-center justify-content-start text-decoration-none mb-5">
                            <img src="@/assets/img/logo.png" class="mr-2" width="35" height="35" alt="" />
                            <h3 class="text-white my-0 py-0">ILLICIT</h3>
                        </router-link>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <ul class="footer__list huge">
                            <li>
                                <router-link class="footer-link" to="/">Inicio</router-link>
                            </li>
                            <li>
                                <router-link class="footer-link" to="/productos">Productos</router-link>
                            </li>
                            <li>
                                <router-link class="footer-link" to="/ubicaciones">Ubicaciones</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <ul class="footer__list">
                            <li>
                                 <router-link class="footer-link" to="/contacto">Contacto</router-link>
                            </li>
                            <li>
                                 <router-link class="footer-link" to="/privacidad">Aviso de privacidad</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 mt-5">
                        <div class="footer-copy text-white text-center">
                            <span>ILLICIT &copy; {{year}}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data: () => ({
        year: new Date().getFullYear()
    })
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.footer{
    position: relative;
    background: black;
    &-inner{
        padding: 60px 0;
    }
    &__list{
        padding: 0;
        margin: 0 0 35px;
        list-style: none;
        li{
            color: #dadada;
            margin-bottom: 12px;
            &:last-of-type{
                margin-bottom: 0px !important;
            }
            .footer-link{
                color: white;
                text-decoration: none !important;
            }
        }
        &.huge{
            li{
                font-size: 24px;
                margin-bottom: 20px;
            }
            @media #{$break-medium}{
                font-size: 30px;
            }
        }
        @media #{$break-medium}{
            margin: 0;
        }
    }
}
</style>