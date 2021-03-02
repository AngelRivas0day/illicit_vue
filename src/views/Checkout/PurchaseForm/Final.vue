<template>
    <div>
        <div class="final-step">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mb-5">
                        <p class="mb-2 text-white">Recuerda actualizar tu graduaci&oacute;n por lo menos una vez al a&ntilde;o</p>
                        <div>
                            <div class="ml-0 d-flex align-items-center justify-content-start w-100 text-center" id="app">
                                <div class="py-5 px-5 border" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                                    <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                                    class="d-none" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
                                    <label v-if="this.filelist.length == 0" for="assetsFieldHandle" class="d-block cursor-pointer">
                                        <div class="text-white">
                                            Explain to our users they can drop files in here 
                                            or <u style="cursor: pointer;">click here</u> to upload their files
                                        </div>
                                    </label>
                                    <ul class="unstyled-list m-0 p-0" v-if="this.filelist.length" v-cloak>
                                        <li class="text-white d-flex flex-row align-items-center justify-content-center" v-for="file in filelist" :key="file.name">
                                            {{ file.name }}
                                            <md-button @click="remove(filelist.indexOf(file))" class="md-icon-button">
                                                <md-icon class="text-white">clear</md-icon>
                                            </md-button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="mt-2 text-white help-text">¿Necesitas ayuda?</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-10">
                        <md-field>
                            <label>Comentarios adicionales</label>
                            <md-textarea></md-textarea>
                        </md-field>
                    </div>
                    <div class="col-12 text-right m-3">
                        <md-button @click="goToCheckout" class="md-primary md-dense md-raised text-white m-0">
                            Ir a checkout
                        </md-button>
                    </div>
                    <StripeCheckout 
                        ref="checkoutRef"
                        :pk="stripe_key"
                        :session-id="session_id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Final',
    delimiters: ['${', '}'], // Avoid Twig conflicts
    components: {StripeCheckout},
    mounted(){
        this.generateCheckoutSession()
    },
    data: () => ({
        filelist: [],
        stripe_key: 'pk_test_51HJkwAD1nUNZOF3ZYIn3DEBY2QSkJdQTAYMYajExWnVXVnRBpiW1zmDJy2Ee1f3hzvmRDeu0kbmN78yMUsagfy2400HkhbwZ14'
    }),
    computed: {
        ...mapState('order',{
            session_id: 'session_id',
            lenseSpecs: 'lenseSpecs'
        })
    },
    methods: {
        ...mapActions('order',{
            createSession: 'createSession'
        }),
        onChange() {
            this.filelist = [...this.$refs.file.files];
        },
        remove(i) {
            this.filelist.splice(i, 1);
        },
        dragover(event) {
        event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        async generateCheckoutSession(){
            console.log("Session id generated!")
            let design = JSON.parse(this.lenseSpecs.design)
            await this.createSession({
                amount: `${this.lenseSpecs.price}00`,
                product_name: this.lenseSpecs.name,
                product_description: 'This is a desc',
                images: design.images
            })
            // create checkout session using a backend endpoint

        },
        goToCheckout(){
            // refirect to stripe checkout onClick
            this.$refs.checkoutRef.redirectToCheckout();
        }
    }
}
</script>

<style lang="scss" scoped>
.final-step{
    p{
        font-size: 18px;
        &.help-text{
            font-size: 16px;
        }
    }
}
</style>