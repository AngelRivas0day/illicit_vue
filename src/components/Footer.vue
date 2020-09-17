<template>
    <div class="footer">
        <div class="footer-inner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <ul class="footer__list">
                            <li>Lorem ipsum </li>
                            <li>dolor sit</li>
                            <li>amet consectetur</li>
                            <li>aditis</li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <ul class="footer__list">
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.footer{
    background: black;
    &-inner{
        padding: 40px 0;
    }
    &__list{
        padding: 0;
        margin: 0;
        list-style: none;
        li{
            color: #dadada;
            margin-bottom: 20px;
            a{

            }
        }
    }
}
</style>