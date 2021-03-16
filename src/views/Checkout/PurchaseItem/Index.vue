<template>
    <div class="d-flex justify-content-between align-items-start flex-column h-100">
        <div class="purchase-item">
            <div class="item-card">
                <div class="card-image mb-3">
                    <img :src="design.image" alt="">
                </div>
                <div class="card-specs">
                    <ul>
                        <li class="d-flex align-items-center">
                            <span>Dise&ntilde;o: &nbsp;</span>
                            <div class="ml-1">{{design.name}}</div>
                            <div class="mx-1">-</div>
                            <div :style="'background-color:'+design.hex+';'" class="circle"></div>
                        </li>
                        <li><span>Tipo de graduaci&oacute;n: </span> {{lenseSpecs.graduation_type}}</li>
                        <li><span>Antirreflejante: </span>{{antireflective}}</li>
                        <li><span>Fotocrom&aacute;tico: </span> test</li>
                        <li><span>Lente: </span> lente material</li>
                        <li><span>Mountura: </span> montura</li>
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
            
            <p><span>Subtotal: </span>${{finalPrice}}</p>
        </div>
    </div>
</template>

<script>
import {mapFields} from 'vuex-map-fields'

export default {
    name: 'PurchaseItem',
    mounted(){
        // this.specs = JSON.parse(this.lenseSpecs)
        this.design = this.lenseSpecs.design ? JSON.parse(this.lenseSpecs.design) : {}
        this.initalPrice = this.lenseSpecs.price
        if(this.glass.offer){
            this.hasOffer = true
            this.initalPrice = this.glass.price - this.glass.offer.value
        }else{
           this.initalPrice = this.lenseSpecs.price 
        }
    },
    beforeDestroy(){
        this.lenseSpecs.price = this.finalPrice
    },
    data:()=>({
        design: {},
        initalPrice: 0,
        hasOffer: false,
        offerPrice: 0
    }),
    computed: {
        ...mapFields('order', {
            lenseSpecs: 'lenseSpecs',
            lenseMaterialCurrentPrice: 'lenseMaterialCurrentPrice',
            graduationCurrentPrice: 'graduationCurrentPrice',
            extrasCurrentPrice: 'extrasCurrentPrice'
        }),
        ...mapFields('product',{
            glass: 'glass'
        }),
        material(){
            return this.lenseSpecs.material ? this.lenseSpecs.material : 'Selecciona uno'
        },
        antireflective(){
            return this.lenseSpecs.antireflective == true ? 'Con antirreflejante' : 'Sin antirreflejante'
        },
        graduation(){
            return this.lenseSpecs.graduation_type ? this.lenseSpecs.graduation_type : 'Selecciona una'
        },
        finalPrice(){
            return this.initalPrice + this.lenseMaterialCurrentPrice + this.graduationCurrentPrice + this.extrasCurrentPrice
        }
    },
    watch: {
        finalPrice(){
            this.lenseSpecs.price = this.finalPrice
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