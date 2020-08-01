<template>
    <div class="products">
    <div class="products__header">
        <div class="header-inner">
           <img src="https://source.unsplash.com/1600x900?glasses,white" alt="">
        </div>
    </div>
    <div class="products__content">
        <div class="container">
            <div class="row">
                <template v-if="glasses.length">
                    <div v-for="glass in glasses" :key="glass.id" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                        <ProductCard :product="glass" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
    name: 'Products',
    components: {ProductCard},
    data: () => ({
        glasses:[
            {
                id: 1,
                name: 'Rodia Raskolnikov',
                price: 3200,
                colors: [
                {
                    color: 'Blanco',
                    value: '#9B3A3A',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                },
                {
                    color: 'Green',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 2,
                name: 'Rodion Romanovich',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 3,
                name: 'Rasumikin Deltov',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#dadada',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 4,
                name: 'Fiodor Pulske',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 5,
                name: 'Rodia Raskolnikov',
                price: 3200,
                colors: [
                {
                    color: 'Blanco',
                    value: '#9B3A3A',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                },
                {
                    color: 'Green',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 6,
                name: 'Rodion Romanovich',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 7,
                name: 'Rasumikin Deltov',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#dadada',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            },
            {
                id: 8,
                name: 'Fiodor Pulske',
                price: 3200,
                colors: [
                {
                    color: 'Blue',
                    value: '#467417',
                    images: [
                    "...",
                    "...",
                    "..."
                    ]
                }
                ],
                image: "/assets/img/mockups/transparent_glasses.png"
            }
        ]
    })
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/vars";

.products {
    position: relative;
    z-index: 100;
    background-color: white;
    &__header {
        top: 0;
        left: 0;
        height: 30vh;
        position: fixed;
        width: 100%;
        z-index: 10;
        .header-inner {
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
    &__content {
        margin-top: calc(30vh - 50px);
        position: relative;
        z-index: 20;
        background-color: white;
        -webkit-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        padding: 50px 0;
        // box-sizing: content-box;
    }
}
</style>
