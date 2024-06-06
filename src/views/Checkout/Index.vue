<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { Get, Post } from "@/services/api";
import { getAuth } from "firebase/auth";
import OrderResumee from "./OrderResumee";
import ResumeeSkeleton from "./Loaders/ResumeeSkeleton";
import OrderConfiguration from "./OrderConfiguration";
import ConfigurationSkeleton from "./Loaders/ConfigurationSkeleton";

export default {
    name: "Checkout",
    components: {
        OrderResumee,
        OrderConfiguration,
        ResumeeSkeleton,
        ConfigurationSkeleton,
        StripeCheckout,
    },
    async mounted() {
        this.userUnsubscribe = getAuth().onAuthStateChanged(async (user) => {
            if (!user) {
                this.$notify({
                    type: "error",
                    title: "Error",
                    text: "Debes iniciar sesión para continuar.",
                });
                this.$router.push({
                    name: "Login",
                    query: {
                        from_route: "Checkout",
                        product_id: this.productId,
                    },
                });
                return;
            }
            const tokenResult = await user.getIdTokenResult();
            this.userStoreIsLoggedIn = tokenResult.claims["type"] === "user-store";
            await this.fetchData();
        });
    },
    destroyed() {
        if (this.userUnsubscribe) this.userUnsubscribe();
    },
    data: () => ({
        loading: true,
        userUnsubscribe: null,
        productId: null,
        offerId: null,
        sessionId: null,
        order: null,
        product: null,
        store: null,
        designName: null,
        addresses: [],
        creatingOrder: false,
        creatingCheckoutSession: false,
        stripePubickKey:
            "pk_test_51HJkwAD1nUNZOF3ZYIn3DEBY2QSkJdQTAYMYajExWnVXVnRBpiW1zmDJy2Ee1f3hzvmRDeu0kbmN78yMUsagfy2400HkhbwZ14",

        userStoreIsLoggedIn: false,
        promoCode: null,
        orderDetails: {
            total: null,
            lensMaterial: null,
            graduationType: null,
            photochromic: null,
            antireflective: null,
            paymentMethod: null,
            deliveryMethod: null,
            extraComments: null,
            address: null,
            glassId: null,
        },
        graduationFile: null,

        sendingURLs: false,
    }),
    methods: {
        async fetchData() {
            const { offer_id = null, design_name = null } = this.$route.query;
            const { id } = this.$route.params;
            this.productId = id;
            this.designName = design_name;
            try {
                this.loading = true;
                await this.fetchProduct();
                await this.fetchAddresses();
                if (this.userStoreIsLoggedIn) await this.fetchStoreInformation();
                if (offer_id) {
                    this.offerId = offer_id;
                    await this.verifyAndApplyOffer();
                }
                this.loading = false;
            } catch (error) {
                this.$notify({
                    type: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ha ocurrido un error al cargar la información. Por favor, intenta de nuevo más tarde.",
                });
                this.$router.go(-1);
                this.loading = false;
            }
        },
        async fetchStoreInformation() {
            const { data } = await Get({
                endpoint: "clients/my-store",
                useToken: true,
            });
            this.store = data;
        },
        async fetchProduct() {
            const setDesign = (designs) => {
                const design = designs.find(
                    (d) => d.name.toLowerCase() === this.designName.toLowerCase(),
                );
                if (!design) {
                    this.$notify({
                        group: "user",
                        type: "error",
                        title: "Error",
                        text: "El diseño seleccionado no está disponible.",
                    });
                    this.$router.go(-1);
                    return;
                }
                this.orderDetails.designName = design.name;
            };
            this.loading = true;
            const { data } = await Get({
                endpoint: `glasses/${this.productId}`,
                useToken: false,
            });
            this.product = data;
            this.orderDetails = {
                ...this.orderDetails,
                glassId: this.product.id,
                total: this.product.price,
            };
            setDesign(this.product.designs);
        },
        async fetchAddresses() {
            const { data } = await Get({
                endpoint: "clients/addresses",
                useToken: true,
            });
            this.addresses = [...data];
        },
        async verifyAndApplyOffer() {
            const { data } = await Get({
                endpoint: `glasses/${this.productId}/offer-check/${this.offerId}`,
                useToken: true,
            });
            const { belongsToGlass, offer = null } = data;
            if (!belongsToGlass) {
                this.orderDetails.offer = null;
                this.orderDetails.total = this.product.price;
                this.$notify({
                    type: "error",
                    title: "Error",
                    text: "La oferta seleccionada no es válida para el producto seleccionado.",
                });
                this.$router.go(-1);
            }
            this.orderDetails.offerId = offer.id;
            this.orderDetails.total -= offer.value;
        },
        async verifyAndApplyPromoCode(promoCodeId) {
            try {
                const { data } = await Get({
                    endpoint: `promo-codes/check/${promoCodeId}`,
                    useToken: true,
                });
                const { isPromoCodeValid, promoCode } = data;
                if (!isPromoCodeValid) {
                    this.orderDetails.coupon = null;
                    this.orderDetails.total = this.orderDetails.offer
                        ? this.product.price - this.orderDetails.offer.value
                        : this.product.price;
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: "El código promocional ingresado no es válido.",
                    });
                    return;
                }
                this.orderDetails.coupon = promoCode;
                this.orderDetails.total -= promoCode.value;
            } catch (error) {
                this.$notify({
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al verificar el código promocional. Por favor, intenta de nuevo más tarde.",
                });
            }
        },
        async createOrder() {
            try {
                this.creatingOrder = true;
                const { data } = await Post({
                    endpoint: "users-orders",
                    data: this.orderDetails,
                    useToken: true,
                });
                this.order = data;
                const shouldUploadGraduationFile =
                    this.orderDetails.graduationType !== "neutros" &&
                    !!this.graduationFile &&
                    !this.userStoreIsLoggedIn;
                const shouldRedirectToCheckout = !this.userStoreIsLoggedIn;
                if (shouldUploadGraduationFile) await this.submiGraduationFile();
                this.creatingOrder = false;
                if (shouldRedirectToCheckout) await this.createStripeCheckoutSession();
            } catch (error) {
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al crear la orden. Por favor, intenta de nuevo más tarde.",
                });
                this.creatingOrder = false;
                this.$router.go(-1);
            }
        },
        async submiGraduationFile() {
            const formData = new FormData();
            formData.append("graduation", this.graduationFile);
            formData.append("type", this.orderDetails.graduationType);
            await Post({
                endpoint: `users-orders/${this.order.id}/graduation`,
                useToken: true,
                data: formData,
                contentType: "form-data",
            });
        },
        async createStripeCheckoutSession() {
            try {
                this.creatingCheckoutSession = true;
                const { data } = await Get({
                    endpoint: `users-orders/${this.order.id}/stripe-checkout`,
                    useToken: true,
                });
                const { sessionId } = data;
                this.sessionId = sessionId;
                setTimeout(() => {
                    this.creatingCheckoutSession = false;
                    this.$refs.stripeCheckout.redirectToCheckout();
                }, 750);
            } catch (error) {
                this.creatingCheckoutSession = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al crear la sesión de pago. Por favor, intenta de nuevo más tarde.",
                });
            }
        },
        async sendURLsToClient(data) {
            const requiresGraduation = !!this.order.graduationRef;
            const requiresPayment = this.order.payment.type === "card";
            const shouldSendEmail = !!data.email;
            const shouldSendWhatsApp = !!data.phoneNumber;
            const requests = [];

            if (shouldSendEmail) requests.push(this.sendOrderDetailsEmail(data.email));
            if (shouldSendWhatsApp)
                requests.push(this.sendOrderDetailsMessage(data.phoneNumber));

            if (requiresGraduation && shouldSendEmail)
                requests.push(this.sendGraduationEmail(data.email));
            if (requiresGraduation && shouldSendWhatsApp)
                requests.push(this.sendGraduationMessage(data.phoneNumber));

            if (requiresPayment && shouldSendEmail)
                requests.push(this.sendPaymentEmail(data.email));
            if (requiresPayment && shouldSendWhatsApp)
                requests.push(this.sendPaymentMessage(data.phoneNumber));

            try {
                this.sendingURLs = true;
                await Promise.all(requests);
                this.sendingURLs = false;
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Enlaces enviados",
                    text:
                        "Los enlaces con los detalles de la orden, el pago y/o graduación" +
                        ` han sido enviados a ${data.email || data.phoneNumber} con éxito.`,
                });
                this.$router.push({ name: "Home" });
            } catch (error) {
                this.sendingURLs = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ha ocurrido un error al enviar los enlaces de pago y/o graduación. Por favor, intenta de nuevo más tarde.",
                });
            }
        },
        async sendOrderDetailsEmail(email) {
            await Post({
                endpoint: `orders-utils/${this.order.id}/order-details-email`,
                data: { email },
                useToken: true,
            });
        },
        async sendPaymentEmail(email) {
            await Post({
                endpoint: `orders/${this.order.id}/payment-email`,
                data: { email },
                useToken: true,
            });
        },
        async sendGraduationEmail(email) {
            await Post({
                endpoint: `orders/${this.order.id}/graduation-email`,
                data: { email },
                useToken: true,
            });
        },
        async sendOrderDetailsMessage(phoneNumber) {
            console.log("Sending order message to", phoneNumber);
        },
        async sendPaymentMessage(phoneNumber) {
            console.log("Sending payment message to", phoneNumber);
        },
        async sendGraduationMessage(phoneNumber) {
            console.log("Sending graduation message to", phoneNumber);
        },
    },
};
</script>

<template>
    <div class="checkout">
        <div class="checkout__item">
            <order-resumee
                v-if="!loading"
                :product="product"
                :orderDetails="orderDetails"
            />
            <resumee-skeleton v-else />
        </div>
        <div class="checkout__specs">
            <template v-if="!loading">
                <order-configuration
                    :orderDetails.sync="orderDetails"
                    :graduationFile.sync="graduationFile"
                    :product="product"
                    :store="store"
                    :order="order"
                    :userStoreIsLoggedIn="userStoreIsLoggedIn"
                    :addresses="addresses"
                    :creatingCheckoutSession="creatingCheckoutSession"
                    :creatingOrder="creatingOrder"
                    :sendingURLs="sendingURLs"
                    @addressCreated="fetchAddresses"
                    @createOrder="createOrder"
                    @finishProcessForUserStore="sendURLsToClient"
                />
                <stripe-checkout
                    ref="stripeCheckout"
                    :pk="stripePubickKey"
                    :session-id="sessionId"
                />
            </template>
            <configuration-skeleton v-else />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
.checkout {
    min-width: 100vw;
    margin-top: 55px;
    @include flex("column", "stretch", "center");
    @media #{$break-large} {
        @include flex("row", "stretch", "center");
    }
    &__item {
        height: auto;
        @media #{$break-large} {
            flex: 1;
            width: 250px;
            min-width: 250px;
            height: 100vh;
        }
    }
    &__specs {
        flex: 3;
        @media #{$break-large} {
            width: calc(100vh - 250px);
        }
    }
}
</style>
