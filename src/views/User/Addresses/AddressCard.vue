<template>
    <div>
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">
                        Direcci&oacute;n #{{ index + 1 }}
                        <small style="font-size: 10px;" v-if="address.isDefault">(DEFAULT)</small>
                    </div>
                    <div class="md-subhead">{{ address.city }}</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content> </md-card-content>
            <md-card-actions>
                <md-button
                    v-if="!readOnly"
                    @click="deleteAddress(address.id)"
                    class="md-dense md-primary text-white md-raised"
                >Borrar</md-button>
                <md-button
                    v-if="readOnly"
                    @click="selectAddress(address.id)"
                    class="md-dense md-primary text-white md-raised"
                >Seleccionar</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "AddressCard",
    props: {
        address: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: false,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        ...mapActions('addresses',{
           deleteAddress:'deleteAddress'
        }),
        selectAddress(addressId){
            this.$emit('selected', addressId);
        }
    }
};
</script>

<style></style>
