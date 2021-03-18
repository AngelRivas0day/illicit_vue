<template>
    <div v-if="isActive">
        <md-dialog :md-active.sync="show">
            <md-dialog-title>{{event.name}}</md-dialog-title>
            <md-dialog-content>
                Lorem ipsum dolor sit amet, consectetur adipis
                Lorem ipsum dolor sit amet, consectetur adipis
                Lorem ipsum dolor sit amet, consectetur adipis
            </md-dialog-content>
            <md-dialog-actions class="text-right">
                <md-button  @click="show = !show" class="md-primary md-stroked md-dense">
                    Cerrar
                </md-button>
                <md-button @click="goToEvent" class="md-primary md-raised md-dense">
                    Ver m&aacute;s
                </md-button>
            </md-dialog-actions>
        </md-dialog>
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
        show: false
    }),
    methods: {
        ...mapActions('events',{
            getCurrentEvent: 'getCurrentEvent'
        }),
        async checkForEvents(){
            await this.getCurrentEvent()
            if(this.$cookies.get('view_event')){
                this.show = false
            }
            if(!this.$cookies.get('view_event')){
                this.show = true
                this.$cookies.set('view_event', 'true')
            }
        },
        goToEvent(){
            this.$router.push({name: 'EventProducts', query:{event_id: this.event.id}})
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/vars";

.md-dialog{
    max-width: 600px !important;
    margin: 0 auto !important;
    ::v-deep .md-dialog-container{
        padding-top: 30px;
        @media #{$break-small}{
            padding-top: 0px;
        }
    }
}

// .event-snackbar{
//     position: fixed;
//     width: 100%;
//     height: 100px;
//     z-index: 20;
//     top: -100px;
//     left: 0;
//     // background: red;
//     background: linear-gradient(to bottom,  rgba(255,255,255,.3) 20%,#1e69de 100%);
//     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#1e69de',GradientType=0 );
//     transition: all 1s ease-in-out;
//     border-bottom-right-radius: 27px;
//     &.active{
//         top: 0px;
//     }
//     .snackbar--inner{
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;
//         max-width: 1200px;
//         width: 100%;
//         padding: 0 25px;
//         margin: calc(100px - 55px) auto 0 auto;
//         height: 55px;
//         .snackbar__event-title{
//             font-size: 16px;
//             @media #{$break-medium}{
//                 font-size: 20px;
//             }
//         }
//     }
// }
</style>