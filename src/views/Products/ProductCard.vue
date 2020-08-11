<template>
    <div class="product__card">
        <div @click="openProduct(product)" class="card__image">
            <img :src="product.designs[0].mainImage" alt="">
            <div class="card__image--hover">
                <span>{{product.name}}</span>
            </div>
        </div>
        <div class="card__colors">
            <ul class="colors__list">
                <template v-for="design in product.designs">
                    <li :key="design.name" :click="setColor(design)" class="list__item" :style="'background-color:'+design.color.hex"></li>
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
    methods: {
        setColor(color){
            console.log(color)
        },
        openProduct(product){
            console.log(product)
            let id = product.id
            this.$router.push({
                name: 'Product',
                params: { id }
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
    padding: 15px;
    max-width: 370px;
    display: block;
    margin: 0 auto 25px auto;
    .card__image{
        position: relative;
        height: 170px;
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
            display: none;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            span{

            }
        }
        &:hover .card__image--hover{
            display: block !important;
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