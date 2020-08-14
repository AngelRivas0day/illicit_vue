<template>
    <form @submit="onSubmit" class="mx-2 address-form form row pb-3">
        <div class="col-xs-12 col-sm-12">
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
                <md-input v-model="addressForm.zip" required></md-input>
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
                <md-select v-model="addressForm.state" required>
                    <md-option value="fight-club">Fight Club</md-option>
                    <md-option value="godfather">Godfather</md-option>
                    <md-option value="godfather-ii">Godfather II</md-option>
                    <md-option value="godfather-iii">Godfather III</md-option>
                    <md-option value="godfellas">Godfellas</md-option>
                    <md-option value="pulp-fiction">Pulp Fiction</md-option>
                    <md-option value="scarface">Scarface</md-option>
                </md-select>
            </md-field>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <label>Ciudad</label>
                <md-select v-model="addressForm.city" required>
                    <md-option value="fight-club">Fight Club</md-option>
                    <md-option value="godfather">Godfather</md-option>
                    <md-option value="godfather-ii">Godfather II</md-option>
                    <md-option value="godfather-iii">Godfather III</md-option>
                    <md-option value="godfellas">Godfellas</md-option>
                    <md-option value="pulp-fiction">Pulp Fiction</md-option>
                    <md-option value="scarface">Scarface</md-option>
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
            <md-button type="submit" class="md-primary md-raised mr-2">Guardar</md-button>
            <md-button @click="showDialog = false" class="md-accent md-raised mr-0">Cancelar</md-button>
        </div>
    </form>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex'
export default {
    name: "AddressForm",
    computed: {
        ...mapFields('addresses',{
            showDialog: 'showDialog'
        })
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
    }),
    methods: {
        ...mapActions('addresses',{
            createAddress:'createAddress'
        }),
        onSubmit(e){
            e.preventDefault()
            this.createAddress(this.addressForm)
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
