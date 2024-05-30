<script>
import transition from "@/mixins/transition";
import filters from "@/mixins/filters";

export default {
    name: "ProductDetails",
    mixins: [transition, filters],
    props: {
        product: {
            type: Object,
            required: true,
        },
        isAddedToFavorites: {
            type: Boolean,
            required: false,
            default: false,
        },
        loadingFavorites: {
            type: Boolean,
            required: false,
            default: false,
        },
        hasOffer: {
            type: Boolean,
            required: false,
            default: false,
        },
        offerPrice: {
            type: Number,
            required: false,
            default: 0,
        },
        loadingOffer: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    mounted() {
        this.changeDesign(this.product.designs?.[0]);
    },
    data: () => ({
        currentDesign: null,
    }),
    computed: {
        categories() {
            return this.product.categories
                ? this.product.categories.join(", ")
                : "Cargando...";
        },
    },
    methods: {
        changeDesign(design) {
            if (!design) return;
            this.transition(() => {
                this.currentDesign = {
                    name: design.name,
                    hex: design.color.hex,
                    image: design.mainImage,
                    images: design.images,
                };
                this.$emit("changeDesign", this.currentDesign);
            });
        },
    },
};
</script>

<template>
    <div class="main-block">
        <div class="main-block__info">
            <div class="info__body">
                <div
                    class="d-flex flex-row justify-content-between align-items-center"
                >
                    <div class="mb-2">
                        <h1 class="info__title mb-0">{{ product.name }}</h1>
                        <span class="text-muted">{{ categories }}</span>
                    </div>
                    <md-button
                        :disabled="loadingFavorites"
                        @click="$emit('toggleFavorite')"
                        class="md-icon-button ml-4"
                    >
                        <md-icon
                            :class="{
                                'is-fav': isAddedToFavorites,
                                'not-fav': !isAddedToFavorites,
                            }"
                            class="md-fav"
                            >favorite</md-icon
                        >
                    </md-button>
                </div>
                <span class="info__price">
                    <template v-if="hasOffer">
                        <div class="text-muted text-decoration-line-through">
                            {{ product.price | currency }}
                        </div>
                        {{ offerPrice | currency }}
                    </template>
                    <template v-else>
                        {{ product.price | currency }}
                    </template>
                </span>
                <ul class="info__colors-selector">
                    <li
                        v-for="design in product.designs"
                        :key="design.name"
                        @click="changeDesign(design)"
                        :style="{ backgroundColor: design.color.hex }"
                        :class="
                            currentDesign.name === design.name ? 'active' : ''
                        "
                    ></li>
                </ul>
                <p class="info__desc">
                    {{ product.description }}
                </p>
                <div class="info__actions">
                    <button
                        :disabled="loadingOffer"
                        @click="$emit('goToCheckout')"
                        class="info__buy"
                    >
                        COMPRAR
                    </button>
                </div>
            </div>
        </div>
        <template v-if="currentDesign">
            <div
                v-for="image in currentDesign.images"
                :key="image"
                class="main-block__image"
                :class="isTransitioning ? 'animate' : 'no-animate'"
            >
                <img
                    v-lazy="image"
                    alt="Imagén del diseño seleccionado del producto"
                />
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/css/vars";

.main-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &__info {
        flex: -1;
        order: -1; // this is meant to make the mobile layout order
        @include flex("column", "flex-start", "flex-end");
        width: 100%;
        height: 50vh;
        box-sizing: border-box;
        padding: 15px;
        .info__body {
            // .info__title{

            // }
            .md-fav {
                &.is-fav {
                    color: red !important;
                }
                &.not-fav {
                    color: rgba(33, 33, 33, 0.3) !important;
                }
            }
            .info__price {
                display: flex;
                flex-direction: row;
                div {
                    margin-right: 10px;
                }
            }
            .info__colors-selector {
                list-style: none;
                padding: 0;
                margin: 15px 0;
                display: flex;
                flex-direction: row;
                li {
                    width: 14px;
                    height: 14px;
                    border-radius: 100%;
                    margin-right: 8px;
                    cursor: pointer;
                }
            }
            // .info__desc{

            // }
        }
        .info__actions {
            .info__buy {
                @include small-button("black", "white", "black");
            }
        }
        @media #{$break-medium} {
            order: -2;
            width: 50%;
            height: 100vh;
            .info__actions {
                margin-bottom: 50px !important;
                // .info__buy{
                // }
            }
        }
    }
    &__image {
        position: relative;
        height: 50vh;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:after {
            content: "";
            transition: ease-out 0.6s;
            position: absolute;
            top: 0;
            right: 0;
            background: black;
            z-index: 1;
            height: 100%;
            width: 0px;
        }
        &.animate {
            &:after {
                width: 100%;
                left: 0;
            }
        }
        @for $i from 1 to 4 {
            &:nth-child(#{$i}) {
                @if $i == 1 {
                    order: -1;
                } @else if $i == 2 {
                    order: -2;
                } @else {
                    order: $i;
                }
            }
        }
        @media #{$break-medium} {
            order: initial;
            height: 100vh;
            width: 50%;
            order: inherit;
        }
    }
}
</style>
