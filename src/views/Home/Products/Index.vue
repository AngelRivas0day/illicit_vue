<template>
    <div class="our-products">
        <div class="our-products__content">
            <h1><span>nuestros</span><br>productos</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus labore neque ipsam corporis! Dolorum alias maxime voluptates quisquam, vitae fuga earum blanditiis deleniti eligendi dolores, in, necessitatibus omnis ad quibusdam quos reprehenderit sed repudiandae enim quia?<br>Itaque deserunt cum provident enim aliquid illum, expedita obcaecati. Alias harum odit minus, praesentium blanditiis tenetur tempore voluptatibus nostrum, autem excepturi in quae perferendis!</p>
        </div>
        <div class="our-products__image">
            <img :src="image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data: () => ({
        image: '../../assets/img/isometric_glasses.jpeg'
    })
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/vars";

.our-products{
    @include flex("column","center","center");
    padding: 20px 15px;
    .our-products__content{
        flex: 1;
        h1{
            text-transform: uppercase;
            color: black;
            font-weight: bold;
            font-size: 45px;
            line-height: 3rem;
            margin-bottom: 20px;
            span{
                color: white;
                -webkit-text-fill-color: white; /* Will override color (regardless of order) */
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: black;
            }
        }
        p{
            font-size: 16px;
        }
    }
    .our-products__image{
        flex: 1;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    @media #{$break-medium}{
        @include flex("row","stretch","center");
        padding: 80px 25px;
         .our-products__content{
        flex: 1;
        h1{
            font-size: 60px;
            line-height: 4rem;
            margin-bottom: 25px;
        }
        p{
            font-size: 17px;
        }
    }
    }
}
</style>