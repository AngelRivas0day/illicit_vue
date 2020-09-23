<template>
    <div class="d-flex justify-content-between align-items-start flex-column h-100">
        <div class="purchase-item">
            <div class="item-card">
                <div class="card-image mb-3">
                    <img :src="lenseSpecs.design.image" alt="">
                </div>
                <div class="card-specs">
                    <ul>
                        <li><span>Modelo: </span>{{lenseSpecs.name}}</li>
                        <li class="d-flex align-items-center">
                            <span>Dise&ntilde;o: </span>
                            <div :style="'background-color:'+lenseSpecs.design.hex+';'" class="circle ml-2"></div>
                        </li>
                        <li><span>Material: </span>{{material}}</li>
                        <li><span>Antirreflejante: </span>{{antireflective}}</li>
                        <li><span>Graduaci&oacute;n: </span>{{graduation}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="purchase-pricing">
            <div class="delivery-info">
                <small>
                    Sin precio de envio
                </small>
                <md-icon class="info-icon">help</md-icon>
                <md-tooltip md-direction="right">El precio de envio viene dado por la direcci&oacute;n de env&iacute;o</md-tooltip>
            </div>
            
            <p><span>Subtotal: </span>${{lenseSpecs.price}}</p>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'PurchaseItem',
    computed: {
        ...mapState('order', {
            lenseSpecs: 'lenseSpecs'
        }),
        material(){
            return this.lenseSpecs.material ? this.lenseSpecs.material : 'Selecciona uno'
        },
        antireflective(){
            return this.lenseSpecs.antireflective == true ? 'Con antirreflejante' : 'Sin antirreflejante'
        },
        graduation(){
            return this.lenseSpecs.graduation != null ? 'Guardada' : 'Sin guardar'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.purchase-item{
    padding: 50px 15px;
    .item-card{
        .card-image{
            width: 100px;
            height: 100px;
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }   
        }
        .card-specs{
            ul{
                padding: 0;
                margin: 0;
                list-style: none;
                li{
                    font-weight: 100;
                    font-size: 15px;
                    margin-bottom: 5px;
                    span{
                        font-weight: bold;
                    }
                    .circle{
                        width: 14px;
                        height: 14px;
                        border-radius: 100%;
                        // margin-right: 8px;
                    }
                    &.subtotal{
                        p{
                            font-size: 24px;
                            span{

                            }
                        }
                    }
                }
            }
        }
    }
}
.purchase-pricing{
    padding: 15px;
    p{
        margin-top: 10px;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 0;
        span{

        }
    }
    small{
        font-size: 14px;
        color: black;
    }
    .info-icon{
        color: black;
        font-size: 18px !important;
    }
    .delivery-info{
        cursor: pointer;
    }
}
</style>