<template>
    <div>
        <div class="event && isActive" v-if="event">
            <div class="event__hero">
                <div class="hero--inner">
                    <div class="hero__content">
                        <div class="hero__title">{{event.name}}</div>
                    </div>
                </div>
            </div>
            <div class="event__content">
                <div class="container">
                    <div class="row">
                        <template v-for="glass in eventProducts">
                            <div
                                :key="glass.id"
                                v-if="(glass.designs.length) > 0"
                                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                            >
                                <template>
                                    <ProductCard :product="glass" />
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            no active event lol
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProductCard from './ProductCard'

export default {
    name: 'Events',
    components: {ProductCard},
    async mounted(){
        let { event_id } = this.$route.query
        await this.getEvenOffers(event_id)
        let ids = await Promise.all(this.eventOffers.map(offer=>{
            return offer.glassesID
        }))
        await this.getProducts(ids)
    },
    data: () => ({
        products: []
    }),
    computed: {
        ...mapState('events', {
            eventOffers: 'eventOffers',
            eventProducts: 'eventProducts',
            isActive: 'isActive',
            event: 'event'
        })

    },
    methods: {
        ...mapActions('events',{
            getEvenOffers: 'getEvenOffers',
            getProducts: 'getProducts'
        })
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.event{
    &__hero {
        top: 0;
        left: 0;
        height: 50vh;
        position: relative;
        width: 100%;
        z-index: 10;
        overflow: hidden;
        .hero--inner {
            height: 100%;
            background: rgba(33,33,33,.5);
            // img {
            //     position: relative;
            //     z-index: -1;
            //     height: 100%;
            //     width: 100%;
            //     object-fit: cover;
            // }
            .hero__content{
                position: absolute;
                z-index: 99;
                left: 20px;
                top: calc(50vH / 2);
                transform: translateY(-50%);
                .hero__title{
                    font-size: 40px;
                    text-transform: uppercase;
                    color: $main-green;
                    @media #{$break-medium}{
                        font-size: 80px;
                    }
                }
            }
        }
    }
    &__content{
        min-height: 100vH;
        // margin-top: calc(30vh - 50px);
        position: relative;
        z-index: 20;
        background-color: white;
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        padding: 50px 0;
    }
}
</style>