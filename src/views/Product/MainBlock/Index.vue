<template>
    <div class="main-block">
        <div class="main-block__info">
            <div class="info__body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <h1 class="info__title">{{glass.name}}</h1>
                    <md-button @click="addFavorite({id: glass.id, name: glass.name})" class="md-icon-button ml-4">
                        <md-icon :class="{'md-primary': isFavorite, 'not-fav': !isFavorite}" class="md-fav">favorite</md-icon>
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
        <template v-for="d in glass.designs">
            <div
                v-for="i in d.images"
                :key="i" v-show="d.name == currentDesign.name"
                class="main-block__image"
            >
                <img v-lazy="i" alt="">
            </div>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'MainBlock',
    computed: {
        ...mapState('product',{
            glass: 'glass'
        }),
        ...mapState('favorites',{
            favorites: 'favorites'
        })
    },
    updated(){
        this.favorites.forEach(fav => {
            if(fav.id == this.glass.id){
                this.isFavorite = true
            }
        })
    },
    data: ()=>({
        currentDesign: {},
        isFavorite: false
    }),
    methods: {
        ...mapActions('favorites',{
            addFavorite: 'addFavorite'
        }),
        buy(){
            this.$router.push({
                name: 'Checkout',
                params: { id: this.glass.id }
            })
        },
        setDesign(design){
            console.log(design)
            this.currentDesign = design
        }
    },
    watch: {
        glass(){
            this.currentDesign = this.glass.designs[0]
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
        order: 1; // this is meant to make the mobile layout order
        @include flex("column","flex-start","flex-end");
        width: 100%;
        height: 50vH;
        box-sizing: border-box;
        padding: 15px;
        .info__body{
            .info__title{

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
            .md-fav{
                &.not-fav{
                    color: rgba(0,0,0,.4)
                }
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
            order: initial;
            order: inherit;
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
        order: 1;
        height: 50vH;
        width: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:first-of-type{
            order: -2;
        }
        @media #{$break-medium}{
            order: initial;
            height: 100vH;
            width: 50%;
        }
    }
}
</style>