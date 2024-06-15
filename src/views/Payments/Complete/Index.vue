<script>
import { Get } from "@/services/api";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
    name: "CompletePayment",
    components: {
        StripeCheckout,
    },
    mounted() {
        const { token = null } = this.$route.query;
        if (!token) {
            this.invalidUrl = true;
            return;
        }
        this.urlToken = token;
        this.fetchData();
    },
    data: () => ({
        urlToken: null,
        loading: false,
        invalidUrl: false,
        creatingSession: false,
        sessionId: null,
        product: null,
        displayName: null,
        stripePubickKey:
            "pk_test_51IYKufCOtbElZiKEDPblTPV59g3RAkY3lpy0XGCBBOJWeNqlZqsujt9yqfe7WIxCs9Rz5PXeCcNIwI5wxulLrat500gKvembnM",
    }),
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: "token-order",
                    useToken: this.urlToken,
                });
                const { product, displayName } = data;
                this.product = product;
                this.displayName = displayName;
                this.loading = false;
            } catch (_) {
                this.loading = false;
                this.invalidUrl = true;
            }
        },
        async goToCheckout() {
            try {
                this.creatingSession = true;
                const { data } = await Get({
                    endpoint: "token-order/stripe-checkout",
                    useToken: this.urlToken,
                });
                const { sessionId } = data;
                this.sessionId = sessionId;
                setTimeout(() => {
                    this.creatingSession = false;
                    this.$refs.stripeCheckout.redirectToCheckout();
                }, 750);
            } catch (error) {
                this.creatingSession = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ha ocurrido un error al crear la sesión de pago. Por favor, intenta de nuevo.",
                });
            }
        },
    },
};
</script>

<template>
    <div id="payment">
        <template v-if="loading">
            <div class="loading-container">
                <h2 class="md-title">Cargando...</h2>
            </div>
        </template>
        <template v-else-if="invalidUrl">
            <div class="invalid-url-container">
                <md-empty-state
                    md-rounded
                    md-icon="error"
                    md-label="Enlace inválido"
                    md-description="El enlace que has ingresado no es válido. Por favor, verifica que sea correcto."
                />
            </div>
        </template>
        <template v-else>
            <stripe-checkout
                ref="stripeCheckout"
                :pk="stripePubickKey"
                :session-id="sessionId"
            />
            <div class="checkout-container">
                <md-empty-state
                    md-icon="attach_money"
                    md-label="¡Listo para pagar!"
                    md-description="Haz clic en el botón para completar tu pago y continuar con el proceso de tu pedido."
                >
                    <md-button
                        @click="goToCheckout"
                        :disabled="creatingSession"
                        class="md-primary md-raised"
                    >
                        {{ creatingSession ? "Creando sesión..." : "Completar pago" }}
                    </md-button>
                </md-empty-state>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scope>
#payment {
    min-height: 100vh;
    padding-top: 55px;
    margin: 0 20px;
    .checkout-container,
    .loading-container,
    .invalid-url-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 55px);
    }
}
</style>
