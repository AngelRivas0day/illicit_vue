<template>
    <div id="specs">
        <div>
            <md-tabs class="md-transparent" md-alignment="fixed">
                <md-tab id="tecs" md-label="Datos técnicos">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <md-list>
                                <md-subheader>Materiales disponibles para el marco</md-subheader>
                                <template v-if="glass">
                                    <md-list-item v-for="fM in glass.frameMaterial" :key="fM">
                                        <span class="spec-item">{{fM}}</span>
                                    </md-list-item>
                                </template>
                            </md-list>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <md-list>
                                <md-subheader>Materiales disponibles para el lente</md-subheader>
                                <template v-if="glass">
                                    <md-list-item v-for="lM in glass.lenseMaterial" :key="lM">
                                        <span class="spec-item">{{lM}}</span>
                                    </md-list-item>
                                </template>
                            </md-list>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <md-list>
                                <md-subheader>Cantidad m&aacute;xima de dioptrias</md-subheader>
                                <md-list-item>{{glass.maxDiopter}}</md-list-item>
                            </md-list>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <md-list>
                                <md-subheader>Dise&ntilde;os disponibles para el lente</md-subheader>
                                <template v-if="glass">
                                    <md-list-item v-for="d in glass.designs" :key="d.name">
                                        <div class="design-item">
                                            {{d.name}} - <div :style="'background: '+d.color.hex"></div>
                                        </div>
                                    </md-list-item>
                                </template>
                            </md-list>
                        </div>
                    </div>
                </md-tab>
                <md-tab id="measures" md-label="Medidas">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-10 offset-md-1">
                            <div class="row">
                                <div class="col-12">
                                    <img class="measurements-image" src="@/assets/img/lense_measure.png" alt="">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 text-center mb-3">
                                    <span class="title">Largo de la varilla</span><br>
                                    <span class="measure">{{glass.measurements ? glass.measurements.dipstick_length : 'Cargando...'}} mm</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 text-center mb-3">
                                    <span class="title">Ancho del punte</span><br>
                                    <span class="measure">{{glass.measurements ? glass.measurements.bridge_width : 'Cargando...'}} mm</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 text-center mb-3">
                                    <span class="title">Ancho del lente</span><br>
                                    <span class="measure">{{glass.measurements ? glass.measurements.lense_width : 'Cargando...'}} mm</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 text-center mb-3">
                                    <span class="title">Ancho de la montura</span><br>
                                    <span class="measure">{{glass.measurements ? glass.measurements.mount_length : 'Cargando...'}} mm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-tab>
                <md-tab id="lorem" md-label="Lorem"></md-tab>
            </md-tabs>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Specs',
    computed: {
        ...mapState('product',{
            glass: 'glass'
        })
    }
}
</script>

<style lang="scss">
#specs{
    .measurements-image{
        width: 100%;
        max-width: 330px;
        height: 330px;
        object-fit: contain;
        margin: 0 auto 15px auto; 
        display: block;
    }
    .title{
        font-size: 18px;
    }
    .measure{
        font-size: 14px;
    }
    .spec-item{
        text-transform: capitalize !important;
    }
    .design-item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        div{
            width: 15px;
            height: 15px;
            border-radius: 100%;
            margin-left: 7px;
        }
    }
}
</style>