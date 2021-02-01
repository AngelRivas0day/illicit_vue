<template>
    <div>
        <div v-if="isLoading" class="loader text-center py-5">
            <TransparentLoading :fullScreen="false" />
        </div>
        <form v-if="!isLoading" @submit="onSubmit" class="account-form form row">
            <div class="col-12 mb-2 text-muted userCode">
                <span v-clipboard:copy="userCode" v-clipboard:success="onCopy">C&oacute;digo de uso único: <md-icon>content_copy</md-icon> {{ userCode }}</span>
            </div>
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
                <md-button @click="logout" class="md-dense md-basic md-stroked ml-3" type="button">Cerrar sesi&oacute;n</md-button>
                <md-button class="md-dense md-primary md-raised md-primary" type="submit">Guardar</md-button>
            </div>
        </form>
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
            this.form = data
            this.userCode = data.code
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
        userCode: '',
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
        },
        onCopy(){
            this.$notify({
                group: 'user',
                title: 'Código copiado',
                type: 'success'
            })
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/_vars';
.account-form{
    @include white_form;
        ::v-deep .md-field.md-theme-default {
        color: black !important;
        input {
            -webkit-text-fill-color: #333333 !important;
        }
        i:after {
            height: 0px !important;
        }
    }

    ::v-deep .md-field.md-theme-default label {
        color: #333333 !important;
    }

    ::v-deep .md-field.md-theme-default.md-focused .md-icon {
        color: #333333 !important;
    }

    ::v-deep .md-field.md-theme-default:after {
        background-color: #333333 !important;
    }

    ::v-deep .md-field.md-theme-default:before {
        background-color: #2ec5c5 !important;
    }

    .userCode{
        .md-icon{
            width: 10px;
        }
        span{
            cursor: pointer;
        }
    }
}
</style>