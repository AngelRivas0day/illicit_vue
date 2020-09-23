<template>
    <div id="banner">
        <div v-if="banners.length > 0" class="banner-inner">
            <carousel
                class="carousel"
                :items="1"
                :nav="false"
                :dots="true"
                :loop="true"
                :mouseDrag="true"
                :touchDrag="true"
                :pullDrag="true"
                :navSpeed="2000"
                :autoplay="true"
                :autoplaySpeed="false"
                :autoplayHoverPause="true"
            >
                <template v-for="slide in banners">
                    <div :key="slide.id" class="slide">
                        <div class="slide-inner">
                            <div class="slide-inner__content">
                                <h1 class="slide__title">
                                    <span>
                                        {{ slide.title }}
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
        console.log(this.banners)
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
.slide{
    .slide-inner{
        position: relative;
        .slide-inner__content{
            position: absolute;
            left: 0;
            top: 60%;
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
                display: block;
                width: auto;
                max-width: 200px;
                transition: all .3s;
                text-align: center;
                color: black;
                background-color: transparent;
                text-decoration: none;
                font-size: 14px;
                position: relative;
                z-index: 1;
                &:after{
                    transition: all .3s;
                    z-index: -1;
                    position: absolute;
                    content: '';
                    background-color: #2ec5c5;
                    width: 30%;
                    height: 100%;
                    left: 0px;
                    top: 50%;
                    transform: translateY(-50%);
                    // border-radius: 100%;
                }
                &:hover:after{
                    width: 100%;
                    height: 100%;
                    // border-radius: ;
                }
                &:hover{
                    color: white;
                }
                // @include main-button('false');
            }
            @media screen and (min-width: 768px){
                left: 10%;
                top: 30%;
                .slide__title{
                    width: 70%;
                    margin-bottom: 30px;
                    text-align: left;
                    span{
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
        // height: 60%;
        .main-carousel{

        }
    }
}

::v-deep .owl-nav{
    position: absolute !important;
    margin: 0 !important;
    top: -50px !important;
    left: 0px;
    ::v-deep .owl-prev, .owl-next{ // these are just to override the main styles of the buttons
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 0px !important;
        background: inherit !important;
    }
    ::v-deep .owl-prev.custom, .owl-next.custom{
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
    }
    ::v-deep .owl-next.custom{
        background-color: white !important;
        color: black !important;
    }
    ::v-deep .owl-prev.custom{
        background-color: black !important;
        color: white !important;
    }
    @media screen and (min-width: 768px){
        left: 20%;
    }
}

::v-deep .owl-dots{
    position: absolute;
    top: -33px;
    right: 0px;
    @media screen and (min-width: 768px){
        right: 20px;
    }
}

.carousel{
    .slide__title{
        transition: all 3s;
    }
    ::v-deep .owl-item.active{
        .slide__title{
            opacity: 1;
        }
    }
     ::v-deep .owl-item:not(.active){
        .slide__title{
            opacity: 0;
        }
    }
}
</style>
