<template>
    <div>
        <md-dialog class="dialog" :md-active.sync="showDialog" @md-closed="getAddresses">
            <md-dialog-title>Direcci&oacute;n de env&iacute;o</md-dialog-title>
            <AddressForm />
        </md-dialog>
        <div class="row">
            <div v-if="addresses.length <= 0" class="col-12">
                <md-empty-state
                    md-icon="home"
                    md-label="No tienes ninguna dirección"
                    md-description="Al crear una o varias direcciones de envío, podrás hacer tus pedidos de forma mas rápida.">
                    <md-button class="md-accent text-white md-raised" @click="showDialog = true">A&ntilde;adir direcc&oacute;n</md-button>
                </md-empty-state>
            </div>
            <div class="col-12" v-else>
                <div class="row">
                    <div class="col-12 mb-5">
                        <md-button class="md-accent text-white md-raised ml-0" @click="showDialog = true">A&ntilde;adir direcc&oacute;n</md-button>
                    </div>
                    <div :key="ad.id" v-for="(ad, index) in addresses" class="col-xs-12 col-sm-12 col-md-4">
                        <md-card>
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title">Direcci&oacute;n #{{ index + 1 }} <small style="font-size: 10px;" v-if="ad.isDefault">(DEFAULT)</small></div>
                                    <div class="md-subhead">{{ ad.city }}</div>
                                </md-card-header-text>
                            </md-card-header>

                            <md-card-content>

                            </md-card-content>
                            <md-card-actions>
                                <md-button @click="deleteAddress(ad.id)" class="md-dense md-primary text-white md-raised">Borrar</md-button>
                            </md-card-actions>
                        </md-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddressForm from './AddressForm'
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'Addresses',
    components: {
        AddressForm
    },
    mounted(){
        this.getAddresses()
    },
    computed: {
        ...mapFields('addresses',{
            showDialog: 'showDialog'
        }),
        ...mapState('addresses',{
            addresses: 'addresses'
        })
    },
    methods: {
        ...mapActions('addresses',{
           getAddresses:'getAddresses',
           deleteAddress:'deleteAddress'
        })
    }
};
</script>

<style lang="scss" scoped>
::v-deep .md-dialog-container{
    max-width: 700px;
}
</style>
