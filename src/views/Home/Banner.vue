<template>
    <div id="banner">
        <div v-if="banners.length > 0" class="banner-inner">
            <carousel
                class="carousel"
                :items="1"
                :nav="true"
                :dots="true"
                :loop="true"
                :mouseDrag="false"
                :touchDrag="false"
                :pullDrag="false"
                :navSpeed="2000"
                :autoplay="true"
                :autoplaySpeed="false"
                :autoplayHoverPause="true"
                animateOut="fadeOut"
            >
                <template v-for="slide in banners">
                    <div :key="slide.id" class="slide">
                        <div class="slide-inner">
                            <div class="slide-inner__content">
                                <h1 class="slide__title">
                                    <span>
                                        {{ slide.title.toUpperCase() }}
                                    </span>
                                </h1>
                                <router-link
                                    class="slide__button"
                                    :to="slide.buttonUrl"
                                    >{{slide.buttonText}}</router-link
                                >
                            </div>
                            <img
                                class="slide__image"
                                :src="slide.image"
                                alt="Slide image"
                            />
                        </div>
                    </div>
                </template>
            </carousel>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: "Banner",
    mounted(){
        this.getData()
    },
    computed: {
        ...mapState('banners',{
            banners: 'banners'
        })
    },
    methods: {
        ...mapActions('banners',{
            getData: 'getBanners'
        })
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
.slide{
    .slide-inner{
        position: relative;
        .slide-inner__content{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            .slide__title{
                text-align: left;
                width: 70%;
                margin-bottom: 20px;
                line-height: 2.9rem;
                span{
                    color: white;
                    font-weight: bold;
                    font-size: 28px;
                    -webkit-text-fill-color: black; /* Will override color (regardless of order) */
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: white;
                    background-color: black;
                    padding: 4px 10px;
                }
            }
            .slide__button{
                @include simple-button("black","white",#{$main-green});
            }
            @media screen and (min-width: 768px){
                left: 10%;
                // top: 30%;
                .slide__title{
                    width: 70%;
                    margin-bottom: 30px;
                    text-align: left;
                    span{
                        overflow: hidden;
                        color: white;
                        line-height: 1em;
                        font-weight: bold;
                        font-size: 70px;
                        -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
                        -webkit-text-stroke-width: 2px;
                        -webkit-text-stroke-color: black;
                        background-color: transparent;
                    }
                }
                .slide__button{
                    padding: 8px 25px;
                    font-size: 16px;
                }
            }
        }
        .slide__image{
            height: 70vH;
            object-fit: cover;
            width: 100%;
            display: block;
            @media screen and (min-width: 768px){
                width: 80%;
                height: 60vH;
                margin-left: auto;
            }
        }
    }
}

#banner{
    height: 100vH;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: #212121;
    @media screen and (min-width: 768px){
        background-color: #FFFFFF;
        align-items: center;
        -webkit-box-shadow: inset 2px 0px 300px -121px rgba(0,0,0,0.75);
        -moz-box-shadow: inset 2px 0px 300px -121px rgba(0,0,0,0.75);
        box-shadow: inset 2px 0px 300px -121px rgba(0,0,0,0.75);
    }
    .banner-inner{
        width: 100%;
    }
}

::v-deep .owl-nav{
    position: absolute !important;
    margin: 0 !important;
    top: -50px !important;
    left: 0px;
    display: flex;
    flex-direction: row;
    .owl-prev, .owl-next{ // these are just to override the main styles of the buttons
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 0px !important;
        background: inherit !important;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        position: relative;
        &:after{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            font-size: 29px;
            font-weight: 100;
        }
    }
    .owl-next{
        background-color: white !important;
        color: white !important;
        &:after{
            content: '>';
            color: black;
        }
    }
    .owl-prev{
        background-color: black !important;
        color: black !important;
        &:after{
            content: '<';
            color: white;
        }
    }
    @media screen and (min-width: 768px){
        left: 20%;
    }
}

.carousel{
    .slide__title{
        transition: all 1s;
        position: relative;
        // &:after{
        //     transition: all 1s;
        //     position: absolute;
        //     content: '';
        //     height: 100%;
        //     left: 0;
        //     bottom: 0;
        //     background: #111;
        // }
    }
    ::v-deep .owl-item{
        animation-duration: 1s !important;
    }
    ::v-deep .owl-item.active{
        .slide__title{
            opacity: 1;
            // &:after{
            //     width: 0%;
            // }
        }
    }
    ::v-deep .owl-item.animated{
        // background: red !important;
        .slide__title{
            opacity: 1;
            // &:after{
            //     width: 0%;
            // }
        }
    }
     ::v-deep .owl-item:not(.active){
        .slide__title{
            opacity: 0;
            // &:after{
            //     width: 100%;
            // }
        }
    }
}

::v-deep .owl-dots{
    position: absolute;
    top: -31px;
    right: 10px;
}
</style>
