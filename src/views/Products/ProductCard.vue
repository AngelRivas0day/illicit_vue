<template>
    <div class="product__card">
        <div @click="openProduct(product)" class="card__image">
            <img :src="product.designs[designIndex].mainImage" alt="">
            <div class="card__image--hover">
                <span class="name">{{product.name}}</span>
                <span v-if="hasOffer" class="price"><div class="text-muted text-decoration-line-through">${{product.price}}</div> ${{offerPrice}}</span>
                <span v-else class="price">${{product.price}}</span>
            </div>
        </div>
        <div class="card__colors">
            <ul class="colors__list">
                <template v-for="(design, i) in product.designs">
                    <li :key="design.name" @click="designIndex = i" class="list__item" :style="'background-color:'+design.color.hex"></li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    mounted(){
        if(typeof this.product.offer != "undefined"){
            this.hasOffer = true
            this.offerPrice = this.product.price - this.product.offer.value
        }
    },
    data: () => ({
        designIndex: 0,
        hasOffer: false,
        offerPrice: 0
    }),
    methods: {
        openProduct({id, slug}){
            this.$router.push({
                name: 'Product',
                params: { id, slug }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/vars";

.product__card{ // main card container
    background-color: $gray;
    box-sizing: border-box;
    padding: 0 0 15px 0;
    max-width: 370px;
    display: block;
    margin: 0 auto 25px auto;
    overflow: hidden;
    background: transparent;
    .card__image{
        position: relative;
        height: 190px;
        width: 100%;
        // background-color: gray;
        margin-bottom: 12px;
        cursor: pointer;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform: scale(1.6);
        }
        &--hover{
            z-index: 999;
            opacity: 0;
            display: flex;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            transition: ease-in-out .4s all;
            span{
                position: relative;
                font-weight: 300;
                letter-spacing: 2px;
                z-index: 10;
                &.price{
                    letter-spacing: inherit;
                }
                &.name{
                    // margin-top: 39px;
                }
            }
           &:after{
                z-index: -1;
                position: absolute;
                content: '';
                width: 100%;
                background: rgba(255,255,255,.7);
                height: calc(100% + 39px);
                left: 50%;
                top: 0;
                transform: translateX(-50%);
            }
        }
        &:hover .card__image--hover{
            opacity: 1;
            display: flex !important;
            transition: ease-in-out .4s all;
        }
    }
    .card__colors{ // colors container
        .colors__list{ // ul
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
            .list__item{
                width: 12px;
                height: 12px;
                border-radius: 100%;
                margin: 0 4px;
                cursor: pointer;
            }
        }
    }
}
</style>