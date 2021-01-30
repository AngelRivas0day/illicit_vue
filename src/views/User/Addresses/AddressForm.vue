<template>
    <div>
        <form @submit="onSubmit" :class="{'address-form' : !isCheckout}" class="mx-0 form row pb-3">
            <div v-if="!isCheckout" class="col-xs-12 col-sm-12">
                <md-switch v-model="addressForm.isDefault">
                    Direcci&oacute;n de env&iacute;o por defecto
                </md-switch>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-9">
                <md-field>
                    <label>Calle</label>
                    <md-input v-model="addressForm.street" required></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-3">
                <md-field>
                    <label>ZIP</label>
                    <md-input class="w-100" v-model="addressForm.zip" required></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>N&uacute;mero externo</label>
                    <md-input v-model="addressForm.extNumber" required></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>N&uacute;mero interno</label>
                    <md-input v-model="addressForm.intNumber"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Estado</label>
                    <md-select v-model="addressForm.state" @md-selected="handleStateChange($event)" required>
                        <md-option v-for="s in states" :key="s" :value="s">{{s}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Ciudad</label>
                    <md-select v-model="addressForm.city" required>
                        <template v-if="cities.length">
                            <md-option v-for="c in cities" :key="c" :value="c">{{c}}</md-option>
                        </template>
                        <md-option v-else>-- Selecciona un estado --</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12">
                <md-field>
                    <label>Referencias</label>
                    <md-textarea
                        v-model="addressForm.reference"
                        md-autogrow
                        md-counter="150"
                        required
                    ></md-textarea>
                </md-field>
            </div>
            <div class="col-12 text-right">
                <md-button v-if="!isCheckout" @click="showDialog = false" class="md-stroked mr-2">Cancelar</md-button>
                <md-button v-if="!isCheckout" type="submit" class="md-primary md-raised md-dense mr-0">Guardar</md-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex'
import data from '@/assets/data/data.json'

export default {
    name: "AddressForm",
    computed: {
        ...mapFields('addresses',{
            showDialog: 'showDialog'
        })
    },
    props: {
        isCheckout: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    mounted(){
        this.states = Object.keys(data)
    },
    data: () => ({
        addressForm: {
            street: "",
            extNumber: "",
            intNumber: "",
            state: "",
            zip: "",
            city: "",
            reference: "",
            isDefault: false
        },
        states: [],
        cities: []
    }),
    methods: {
        ...mapActions('addresses',{
            createAddress:'createAddress'
        }),
        onSubmit(e){
            e.preventDefault()
            this.createAddress(this.addressForm)
        },
        handleStateChange(state){
            if(this.addressForm.city != ''){
                this.addressForm.city = ''
            }
            this.cities = data[state]
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.address-form{
    @include white_form;
}
</style>
