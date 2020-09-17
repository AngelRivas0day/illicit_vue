<template>
    <div>
        <!-- <transition name="slide-fade"> -->
            <div v-if="isLoading" class="loader text-center py-5">
                <TransparentLoading :fullScreen="false" />
            </div>
        <!-- </transition>
        <transition name="slide-fade"> -->
            <form v-if="!isLoading" @submit="onSubmit" class="account-form form row">
                <div class="col-12 mb-3 text-muted">
                    Correo: {{form.email}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <md-icon class="md-accent">account_circle</md-icon>
                        <label>Nombre</label>
                        <md-input v-model="form.name"></md-input>
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <md-icon class="md-accent">account_circle</md-icon>
                        <label>Apellido</label>
                        <md-input v-model="form.lastName"></md-input>
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <md-icon class="md-accent">call</md-icon>
                        <label>Tel&eacute;fono</label>
                        <md-input v-model="form.phone" v-mask="'+## ###-###-####'"></md-input>
                    </md-field>
                </div>
                <div class="col-12 text-right">
                    <md-button class="md-dense md-primary md-raised" type="submit">Guardar</md-button>
                    <md-button @click="logout" class="md-dense md-primary md-raised ml-3" type="button">Cerrar sesi&oacute;n</md-button>
                </div>
            </form>
        <!-- </transition> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TransparentLoading from '@/components/TransparentLoading'

export default {
    name: 'AccountForm',
    components: {
        TransparentLoading
    },
    async mounted(){
        try {
            const data = await this.getInfo()
            console.log("Data async:", data)
            this.form = data
        } catch (error) {
            console.log("Error")   
        }
    },
    computed: {
        ...mapState('user',{
            isLoading: 'isLoading'
        })
    },
    data: () => ({
        form: {
            name: '',
            lastName: '',
            email: '',
            phone: ''
        }
    }),
    methods: {
        ...mapActions('user',{
            getInfo: 'getInfo',
            updateInfo: 'updateInfo',
            logout: 'logout'
        }),
        onSubmit(e){
            e.preventDefault()
            const { name, lastName, phone } = this.form
            const updatedUser = {
                name,
                lastName,
                phone
            }
            this.updateInfo(updatedUser)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/_vars';
.account-form{
    @include white_form;
}
</style>