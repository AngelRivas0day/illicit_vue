<template>
    <div class="main-block">
        <div class="main-block__info">
            <div class="info__body">
                <h1 class="info__title">{{productInfo.name}}</h1>
                <span class="info__price">${{productInfo.price}}</span>
                <ul class="info__colors-selector">
                    <li></li>
                </ul>
                <p class="info__desc">
    
                </p>
            </div>
            <div class="info__actions">
                <button @click="buy()" class="info__buy">COMPRAR</button>            
            </div>
        </div>
        <div class="main-block__image">
            <img src="" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainBlock',
    props: {
        productImages: {
            type: Array,
            required: true
        },
        productInfo: {
            type: Object,
            required: true
        }
    },
    methods: {
        buy(){
            console.log("Buy!");
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/vars';

.main-block{
    &__info{
        order: 1; // this is meant to make the mobile layout order
        @include flex("column","flex-start","flex-end");
        width: 100%;
        height: 50vH;
        box-sizing: border-box;
        padding: 15px;
        .info__body{
            .info__title{

                }
                .info__price{

                }
                .info__colors-selector{

                }
                .info__desc{

                }
            }
            .info__actions{
                .info__buy{
                    position: relative;
                    transition: all .4s;
                    padding: 9px 25px;
                    border: none;
                    background-color: transparent;
                    color: black;
                    z-index: 1;
                    &:after{
                        transition: all .3s;
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 2px;
                        background-color: black;
                        z-index: -1;
                    }
                    &:hover{
                        color: white;
                    }
                    &:hover:after{
                        width: 100% !important;
                    }
                }
            }
            @media #{$break-large}{
                order: inherit;
                width: 50%;
                height: 100vH;
                .info__actions{
                    margin-bottom: 50px !important;
                    .info__buy{
                    }
                }
            }
    }
}
</style>