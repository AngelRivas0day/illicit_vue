<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Detalles de compra</md-dialog-title>
            <md-dialog-content>
                <div class="row">
                    <div class="col-12">
                        {{order.specs.name}}
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary md-dense md-raised" @click="onClose">Cerrar</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    name: 'OrderDetails',
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClose(){
            this.showDialog = false
        }
    },
    computed: {
        ...mapFields('orders',{
            showDialog: 'showDialog'
        })
    }
}
</script>

<style>

</style>