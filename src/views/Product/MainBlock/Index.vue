<template>
    <div class="main-block">
        <div class="main-block__info">
            <div class="info__body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <h1 class="info__title">{{glass.name}}</h1>
                    <md-button @click="addFav({id: glass.id, name: glass.name})" class="md-icon-button ml-4">
                        <md-icon :class="{'is-fav': isFavorite, 'not-fav': !isFavorite}" class="md-fav">favorite</md-icon>
                    </md-button>
                </div>
                <span class="info__price">${{glass.price}}</span>
                <ul class="info__colors-selector">
                    <template v-for="c in glass.designs">
                        <li @click="setDesign(c)" :key="c.name" :style="'background-color:'+c.color.hex+';'"></li>
                    </template>
                </ul>
                <p class="info__desc">
                    {{glass.description}}
                </p>
            </div>
            <div class="info__actions">
                <button @click="buy()" class="info__buy">COMPRAR</button>            
            </div>
        </div>
        <div
            class="main-block__image"
            :class="[isTransition ? 'animate' : 'no-animate']"
        >
            <img v-lazy="currentDesign.images[0]" alt="">
        </div>
        <div
            class="main-block__image"
            :class="[isTransition ? 'animate' : 'no-animate']"
        >
            <img v-lazy="currentDesign.images[1]" alt="">
        </div>
        <div
            class="main-block__image"
            :class="[isTransition ? 'animate' : 'no-animate']"
        >
            <img v-lazy="currentDesign.images[2]" alt="">
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import transition from '@/mixins/transition'
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'MainBlock',
    mixins: [transition],
    computed: {
        ...mapState('product',{
            glass: 'glass'
        }),
        ...mapState('favorites',{
            favorites: 'favorites'
        }),
        ...mapGetters('user',{
            isLoggedIn: 'isLoggedIn'
        }),
        ...mapFields('order',{
            lenseSpecs: 'lenseSpecs'
        })
    },
    mounted(){
        this.favorites.forEach(fav => {
            if(fav.id == this.glass.id){
                this.isFavorite = true
            }
        })
        this.transition(()=>{
            this.currentDesign = {
                name: this.glass.designs[0].name,
                hex: this.glass.designs[0].color.hex,
                image: this.glass.designs[0].mainImage,
                images: this.glass.designs[0].images
            }
            this.lenseSpecs.design = this.currentDesign
        })
    },
    data: ()=>({
        currentDesign: {},
        isFavorite: false,
    }),
    methods: {
        ...mapActions('favorites',{
            addFavorite: 'addFavorite',
            deleteFavorite: 'deleteFavorite'
        }),
        buy(){
            this.$router.push({
                name: 'Checkout',
                params: { slug: this.glass.slug }
            })
        },
        setDesign(design){
            this.transition(() => {
                this.currentDesign = {
                    name: design.name,
                    hex: design.color.hex,
                    image: design.mainImage,
                    images: design.images
                }
                this.lenseSpecs.design = this.currentDesign // vuex binding
            })
        },
        addFav({id, name}){
            if(this.isFavorite){
                this.deleteFavorite({id, name})
                    .then(()=>{
                        this.isFavorite = false
                    })
            }else{
                this.addFavorite({id, name})
                    .then(()=>{
                        this.isFavorite = true
                    })
            }
        }
    },
    watch: {
        glass(){
            this.currentDesign = this.glass.designs[0]
            // console.log(this.currentDesign)
            this.lenseSpecs = { // vuex binding
                name: this.glass.name,
                price: this.glass.price,
                slug: this.glass.slug,
                magnification: 'test'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/vars';

.main-block{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &__info{
        flex: -1;
        order: -1; // this is meant to make the mobile layout order
        @include flex("column","flex-start","flex-end");
        width: 100%;
        height: 50vH;
        box-sizing: border-box;
        padding: 15px;
        .info__body{
            .info__title{

            }
            .md-fav{
                &.is-fav{
                    color: red !important;
                }
                &.not-fav{
                    color: rgba(33,33,33,.3) !important;
                }
            }
            .info__price{

            }
            .info__colors-selector{
                list-style: none;
                padding: 0;
                margin: 15px 0;
                display: flex;
                flex-direction: row;
                li{
                    width: 14px;
                    height: 14px;
                    border-radius: 100%;
                    margin-right: 8px;
                    cursor: pointer;
                }
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
            order: -2;
            width: 50%;
            height: 100vH;
            .info__actions{
                margin-bottom: 50px !important;
                .info__buy{
                }
            }
        }
    }
    &__image{
        position: relative;
        height: 50vH;
        width: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:after{
            content: '';
            transition: ease-out .6s;
            position: absolute;
            top: 0;
            right: 0;
            background: black;
            z-index: 1;
            height: 100%;
            width: 0px;
        }
        &.animate{
            &:after{
                width: 100%;
                left: 0;
            }
        }
        @for $i from 1 to 4{
            &:nth-child(#{$i}){
                @if $i == 1 {
                    order: -1;
                } @else if $i == 2 {
                    order: -2;
                } @else {
                    order: $i;
                }
            }
        }
        @media #{$break-medium}{
            order: initial;
            height: 100vH;
            width: 50%;
            order: inherit;
        }
    }
}
</style>