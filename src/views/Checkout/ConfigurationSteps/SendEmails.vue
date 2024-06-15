<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
    name: "SendEmails",
    props: {
        order: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        creatingOrder: {
            type: Boolean,
            required: false,
            default: false,
        },
        sendingURLs: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    watch: {
        order: {
            handler() {
                this.requiresGraduation = !!this.order.graduationRef;
                this.requiresPayment = this.order.payment.type === "card";
            },
            deep: true,
        },
        usePhoneNumber: {
            handler() {
                if (this.usePhoneNumber) {
                    this.email = null;
                    this.$v.email.$reset();
                } else {
                    this.phoneNumber = null;
                    this.$v.phoneNumber.$reset();
                }
            },
        },
    },
    data: () => ({
        requiresPayment: null,
        requiresGraduation: null,
        email: null,
        phoneNumber: null,
        sent: null,
        usePhoneNumber: false,
    }),
    methods: {
        sendUrlsToUser() {
            const sendData = this.usePhoneNumner
                ? { phoneNumber: this.phoneNumber }
                : { email: this.email };
            this.$emit("sendURLs", sendData);
        },
    },
    computed: {
        sectionTitle() {
            if (this.requiresGraduation && this.requiresPayment)
                return "Envia los enlaces de graduación, pago e información de la orden";
            else if (this.requiresPayment && !this.requiresGraduation)
                return "Envia el enlace de pago e información de la orden";
            else if (!this.requiresPayment && this.requiresGraduation)
                return "Envia el enlace de graduación e información de la orden";
            else return "Envia la información de la orden";
        },
        usePhoneNumberLabel() {
            if (this.requiresGraduation && this.requiresPayment)
                return "Enviar detalles de orden, enlace de graduación y enlace de pago por WhatsApp";
            else if (this.requiresPayment && !this.requiresGraduation)
                return "Enviar detalles de orden y enlace de pago por WhatsApp";
            else if (!this.requiresPayment && this.requiresGraduation)
                return "Enviar detalles de orden y enlace de graduación por WhatsApp";
            else return "Enviar detalles de orden por WhatsApp";
        },
        submitLabel() {
            return this.usePhoneNumber
                ? "Envíar mensaje de WhatsApp"
                : "Enviar correo electrónico";
        },
        isCurrentFieldInvalid() {
            return this?.usePhoneNumber
                ? this?.$v?.phoneNumber?.$invalid
                : this?.$v?.email?.$invalid;
        },
    },
    validations: {
        email: {
            required,
            email,
        },
        phoneNumber: {
            required,
            minLength: minLength(16),
        },
    },
};
</script>

<template>
    <div id="send-emails">
        <div class="row">
            <div class="col-12">
                <h2 class="md-title">
                    {{ sectionTitle }}
                </h2>
            </div>
            <!-- <div class="col-12" v-if="!creatingOrder">
                <md-checkbox v-model="usePhoneNumber" :disabled="sendingURLs">
                    {{ usePhoneNumberLabel }}
                </md-checkbox>
            </div> -->
            <div class="col-12" v-if="usePhoneNumber">
                <md-field>
                    <label>N&uacute;mero de tel&eacute;fono</label>
                    <md-input
                        v-model="phoneNumber"
                        @blur="$v.phoneNumber.$touch"
                        v-mask="'+## ## #### ####'"
                        :disabled="sendingURLs"
                    />
                </md-field>
            </div>
            <div class="col-12" v-else>
                <md-field>
                    <label>Correo electr&oacute;nico</label>
                    <md-input
                        v-model="email"
                        @blur="$v.email.$touch"
                        :disabled="sendingURLs"
                    />
                </md-field>
            </div>
            <div class="col-12">
                <md-button
                    @click="sendUrlsToUser"
                    :disabled="sendingURLs || isCurrentFieldInvalid"
                    class="md-raised md-primary ml-0"
                >
                    {{ sendingURLs ? "Enviando..." : submitLabel }}
                </md-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
