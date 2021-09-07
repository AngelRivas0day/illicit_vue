<template>
    <div class="container" v-if="offers.length !== 0">
        <h2 class="text-center offers-title">
            <span>Dale un ojo a nuestras ofertas</span>
        </h2>
        <div class="offers">
            <template v-for="offer in offers">
                <div :key="offer.glassesID" class="offer-container">
                    <div class="offer-image">
                        <img :src="offer.designs[0].mainImage" alt="Promotional image">
                    </div>
                    <div class="offer-data">
                        <div class="data-inner">
                            <div class="data-title">
                                {{ offer.name }}
                            </div>
                            <div class="data-description">
                                {{ offer.description }}
                            </div>
                            <div class="data-button">
                                <button @click="goToOffer(offer.glassesID, offer.slug)">
                                    <div>
                                        Ver oferta
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: "Offers",
    async mounted() {
        await this.getPromotions()
        console.log('offers: ',this.offers)
    },
    methods: {
        ...mapActions('offer', {
            getPromotions: 'getPromotions'
        }),
        goToOffer(id, slug) {
            this.$router.push({name: 'Product', params: { id, slug }})
        }
    },
    computed: {
        ...mapState('offer', {
            offers: 'offers',
            loading: 'loading',
            error: 'error'
        })
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.offers {
    &-title {
        padding: 0 15px;
        font-size: 30px;
        @media #{$break-medium} {
            font-size: 35px;
        }
    }
    .offer-container {
        &:nth-child(even) {
            flex-direction: column-reverse;
        }
        display: flex;
        flex-direction: column;
        @media #{$break-medium} {
            justify-content: space-around;
            flex-direction: row;
            align-items: center;
        }
        .offer-image {
            flex: 1;
            text-align: center;
            margin: 0 15px;
            @media #{$break-medium} {
                margin-right: 15px;
                img {
                    width: 450px !important;
                    height: 450px !important;
                }
            }
            img {
                object-fit: contain;
                margin: 0 auto;
                height: 300px;
                width: 330px;
            }
        }
        .offer-data {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 15px;
            @media #{$break-medium} {
                margin-left: 15px;
            }
            .data-inner {
                width: 450px;
                .data-title {
                    margin-bottom: 15px;
                    font-size: 22px;
                    @media #{$break-medium} {
                        font-size: 25px;
                    }
                }
                .data-description {
                    margin-bottom: 25px;
                    font-size: 15px;
                    @media #{$break-medium} {
                        font-size: 17px;
                    }
                }
                .data-button {
                    button {
                        @include small-button('black', 'white', 'black')
                    }
                }
            }
        }
    }
}
</style>
