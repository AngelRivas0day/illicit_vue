<script>
import GlassMaterials from "./ConfigurationSteps/GlassMaterials";
import Graduation from "./ConfigurationSteps/Graduation";
import DeliveryAndPayment from "./ConfigurationSteps/DeliveryAndPayment";
import ExtraComments from "./ConfigurationSteps/ExtraComments";
import SendEmails from "./ConfigurationSteps/SendEmails";

export default {
    name: "OrderConfiguration",
    components: {
        GlassMaterials,
        Graduation,
        DeliveryAndPayment,
        ExtraComments,
        SendEmails,
    },
    props: {
        orderDetails: {
            type: Object,
            required: true,
            default: () => {},
        },
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
        store: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        order: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        userStoreIsLoggedIn: {
            type: Boolean,
            required: false,
            default: false,
        },
        addresses: {
            type: Array,
            required: true,
            default: () => [],
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
        creatingCheckoutSession: {
            type: Boolean,
            required: false,
            default: false,
        },
        graduationFile: {
            type: File,
            required: false,
            default: () => null,
        },
    },
    data: () => ({
        stepperComponent: null,
        activeStep: null,
        mobileStepper: false,
        preModificationsPrice: null,
        materialAmount: 0,
        graduationAmount: 0,
        photochromicAmount: 0,
        antireflectiveAmount: 0,
    }),
    computed: {
        isFirstStepDone() {
            const { lensMaterial } = this.orderDetails || {};
            return !!lensMaterial;
        },
        isSecondStepDone() {
            const { graduationType, photochromic, antireflective } =
                this.orderDetails || {};
            const requiresGraduationFile =
                graduationType !== "neutros" && !this.userStoreIsLoggedIn;
            return (
                !!graduationType &&
                (!requiresGraduationFile || this?.graduationFile) &&
                photochromic !== null &&
                antireflective !== null
            );
        },
        isThirdStepDone() {
            const { paymentMethod, address, deliveryMethod } =
                this.orderDetails || {};
            const requiredAddress = deliveryMethod === "delivery";
            if (requiredAddress) return !!address && !!deliveryMethod;
            return !!deliveryMethod && !!paymentMethod;
        },
        addOnsTotal() {
            return (
                this.materialAmount +
                this.graduationAmount +
                this.photochromicAmount +
                this.antireflectiveAmount
            );
        },
        disbleThirdButton() {
            return (
                !this?.isThirdStepDone ||
                this?.creatingOrder ||
                this?.creatingCheckoutSession
            );
        },
        thirdButtonLabel() {
            if (this?.creatingOrder) return "Creando orden...";
            if (this?.creatingCheckoutSession) return "Creando sesión...";
            return this?.userStoreIsLoggedIn
                ? "Finalizar y envíar correos"
                : "Ir al pago";
        },
    },
    mounted() {
        this.preModificationsPrice = this.orderDetails.total;
        this.stepperComponent = this.$refs.stepper;
        this.activeStep = "materials";
        this.watchViewportWidth();
    },
    methods: {
        onLensMaterialSelected(material) {
            let updatedOrderDetails = {
                ...this.orderDetails,
                lensMaterial: material.value,
            };
            this.materialAmount = material.price;
            updatedOrderDetails.total =
                this.preModificationsPrice + this.addOnsTotal;
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onGraduationTypeSelected(type) {
            let updatedOrderDetails = {
                ...this.orderDetails,
                graduationType: type.value,
            };
            this.graduationAmount = type.price;
            updatedOrderDetails.total =
                this.preModificationsPrice + this.addOnsTotal;
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onPhotochromicSelected(option) {
            let updatedOrderDetails = {
                ...this.orderDetails,
                photochromic: option.value,
            };
            this.photochromicAmount = option.price;
            updatedOrderDetails.total =
                this.preModificationsPrice + this.addOnsTotal;
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onAntireflectiveSelected(option) {
            let updatedOrderDetails = {
                ...this.orderDetails,
                antireflective: option.value,
            };
            this.antireflectiveAmount = option.price;
            updatedOrderDetails.total =
                this.preModificationsPrice + this.addOnsTotal;
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onPaymentMethodSelected(method) {
            const updatedOrderDetails = {
                ...this.orderDetails,
                paymentMethod: method.value,
            };
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onDeliveryAddressSelected(addressId) {
            const updatedOrderDetails = {
                ...this.orderDetails,
                address: addressId,
            };
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onDeliveryMethodSelected(method) {
            const updatedOrderDetails = {
                ...this.orderDetails,
                deliveryMethod: method.value,
            };
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onExtraCommentsChanged(comments) {
            const updatedOrderDetails = {
                ...this.orderDetails,
                extraComments: comments,
            };
            this.$emit("update:orderDetails", updatedOrderDetails);
        },
        onGraduationFileSelected(files) {
            if (!files) return;
            this.$emit("update:graduationFile", files[0]);
        },
        finishOrder() {
            this.$emit("createOrder");
            if (this.userStoreIsLoggedIn) this.activeStep = "send-mails";
        },
        watchViewportWidth() {
            const mediaQuery = window.matchMedia("(max-width: 900px)");
            this.mobileStepper = mediaQuery.matches;
            mediaQuery.addEventListener("change", (e) => {
                this.mobileStepper = e.matches;
            });
        },
    },
};
</script>

<template>
    <div id="order-configuration">
        <div class="row">
            <div class="col-12">
                <md-steppers
                    ref="stepper"
                    :md-active-step.sync="activeStep"
                    :md-linear="true"
                    :md-vertical="mobileStepper"
                >
                    <md-step
                        id="materials"
                        md-label="Materiales"
                        :md-done="isFirstStepDone"
                        :md-editable="!order"
                    >
                        <glass-materials
                            v-if="product"
                            :productOrder="product"
                            @selectLensMaterial="onLensMaterialSelected"
                        />
                        <div class="step-actions text-right">
                            <md-button
                                @click="activeStep = 'graduation'"
                                :disabled="!isFirstStepDone"
                                class="md-raised md-dense md-primary"
                            >
                                Siguiente
                            </md-button>
                        </div>
                    </md-step>
                    <md-step
                        id="graduation"
                        md-label="Graduación y filtros"
                        :md-done="isSecondStepDone"
                        :md-editable="!order"
                    >
                        <graduation
                            :userStoreIsLoggedIn="userStoreIsLoggedIn"
                            @selectGraduationType="onGraduationTypeSelected"
                            @selectPhotochromic="onPhotochromicSelected"
                            @selectAntireflective="onAntireflectiveSelected"
                            @selectGraduationFile="onGraduationFileSelected"
                        />
                        <div class="step-actions text-right">
                            <md-button
                                @click="activeStep = 'delivery-n-payment'"
                                :disabled="!isSecondStepDone"
                                class="md-raised md-dense md-primary"
                            >
                                Siguiente
                            </md-button>
                        </div>
                    </md-step>
                    <md-step
                        id="delivery-n-payment"
                        md-label="Envío y pago"
                        :md-done="isThirdStepDone"
                        :md-editable="!order"
                    >
                        <delivery-and-payment
                            :userStoreIsLoggedIn="userStoreIsLoggedIn"
                            :addresses="addresses"
                            :store="store"
                            @selectPaymentMethod="onPaymentMethodSelected"
                            @selectDeliveryAddress="onDeliveryAddressSelected"
                            @selectDeliveryMethod="onDeliveryMethodSelected"
                            @addressCreated="$emit('addressCreated')"
                        />
                        <extra-comments
                            @changeComments="onExtraCommentsChanged"
                        />
                        <div class="step-actions text-right">
                            <md-button
                                :disabled="disbleThirdButton"
                                class="md-raised md-dense md-primary"
                                @click="finishOrder()"
                            >
                                {{ thirdButtonLabel }}
                            </md-button>
                        </div>
                    </md-step>
                    <md-step
                        id="send-mails"
                        md-label="Envíar enlaces"
                        v-if="userStoreIsLoggedIn"
                    >
                        <send-emails
                            :creatingOrder="creatingOrder"
                            :sendingURLs="sendingURLs"
                            :order="order"
                            @sendURLs="
                                $emit('finishProcessForUserStore', $event)
                            "
                        />
                    </md-step>
                </md-steppers>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#order-configuration {
    padding: 0 15px 20px 15px;
}
</style>
