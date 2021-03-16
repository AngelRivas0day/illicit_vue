<template>
    <div>
        <div class="event-snackbar" :class="{'active':isActive && show}">
            <div class="snackbar--inner">
                <div class="snackbar__event-title">
                    Dia del padre
                </div>
                <div class="snackbar__event-actions">
                    <md-button @click="goToEvent" class="md-primary">
                        EVENT
                    </md-button>
                    <md-button @click="show = !show" class="md-icon-button">
                        <md-icon>clear</md-icon>
                    </md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'EventSnackBar',
    computed: {
        ...mapState('events', {
            event: 'event',
            isActive: 'isActive'
        })
    },
    mounted(){
        this.checkForEvents()
    },
    data: () => ({
        show: true
    }),
    methods: {
        ...mapActions('events',{
            getCurrentEvent: 'getCurrentEvent'
        }),
        async checkForEvents(){
            await this.getCurrentEvent()
        },
        goToEvent(){
            this.$router.push({name: 'EventProducts', query:{event_id: this.event.id}})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/vars";

.event-snackbar{
    position: fixed;
    width: 100%;
    height: 100px;
    z-index: 20;
    top: -100px;
    left: 0;
    // background: red;
    background: linear-gradient(to bottom,  rgba(255,255,255,.3) 20%,#1e69de 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#1e69de',GradientType=0 );
    transition: all 1s ease-in-out;
    border-bottom-right-radius: 27px;
    &.active{
        top: 0px;
    }
    .snackbar--inner{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        padding: 0 25px;
        margin: calc(100px - 55px) auto 0 auto;
        height: 55px;
        .snackbar__event-title{
            font-size: 16px;
            @media #{$break-medium}{
                font-size: 20px;
            }
        }
    }
}
</style>