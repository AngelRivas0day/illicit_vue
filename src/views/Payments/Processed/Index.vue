<script>
import { Get } from "@/api/api";

export default {
    name: "ProcessedPayment",
    async mounted() {
        const { token } = this.$route.query;
        if (!token) {
            this.setPageProperties("invalidUrl");
            return;
        }
        this.token = token;
        await this.fetchOrder();
    },
    data: () => ({
        loading: false,
        token: null,
        title: null,
        text: null,
        buttonLabel: null,
        routeName: null,
        icon: null,
        product: null,
    }),
    methods: {
        async fetchOrder() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: "token-order",
                    useToken: this.token,
                });
                this.loading = false;
                this.product = data.product;
                this.setPageProperties("success");
            } catch (error) {
                this.loading = false;
                this.setPageProperties("error");
            }
        },
        setPageProperties(event) {
            const validEvents = ["invalidUrl", "success", "error"];
            if (!event || !validEvents.includes(event))
                throw new Error(
                    "setPageProperties method must receive an event name",
                );
            const propsMap = {
                invalidUrl: {
                    title: "El enlace es inválido",
                    text: "La URL de la orden no es válida. Si se trata de un error por favor contacta al personal de soporte.",
                    routeName: "Contact",
                    buttonLabel: "Contactar soporte",
                    icon: "error",
                },
                success: {
                    title: `¡Tu pago para el producto "${this.product.name}" ha sido procesado con éxito!`,
                    text: "En breve recibirás un correo con los detalles de tu compra.",
                    routeName: "Home",
                    buttonLabel: "Volver al inicio",
                    icon: "check_circle",
                },
                error: {
                    title: "Ha ocurrido un error",
                    text: "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
                    routeName: "Home",
                    buttonLabel: "Volver al inicio",
                    icon: "error",
                },
            };
            const selectedProps = propsMap[event];
            const propsKeys = Object.keys(selectedProps);
            for (const key of propsKeys) this[key] = selectedProps[key];
        },
    },
};
</script>

<template>
    <div id="processed-layout">
        <div class="row">
            <div class="col-12">
                <template v-if="loading">
                    <skeleton-loader-vue
                        type="circle"
                        :width="45"
                        :height="45"
                        animation="fade"
                        class="mb-3 d-block mx-auto"
                    />
                    <skeleton-loader-vue
                        type="rect"
                        :width="250"
                        :height="27"
                        animation="fade"
                        class="mb-3 d-block mx-auto"
                    />
                    <skeleton-loader-vue
                        type="rect"
                        :width="450"
                        :height="20"
                        animation="fade"
                        class="mb-3 d-block mx-auto"
                    />
                    <skeleton-loader-vue
                        type="rect"
                        :width="200"
                        :height="40"
                        animation="fade"
                        class="d-block mx-auto"
                    />
                </template>
                <template v-else>
                    <div class="landing-icon" v-if="icon">
                        <md-icon :class="icon">{{ icon }}</md-icon>
                    </div>
                    <h2 class="md-title">
                        {{ title }}
                    </h2>
                    <p>
                        {{ text }}
                    </p>
                    <md-button
                        @click="$router.push({ name: routeName })"
                        class="md-raised md-primary md-dense"
                    >
                        {{ buttonLabel }}
                    </md-button>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#processed-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 300px;
    .landing-icon {
        text-align: center;
        margin-bottom: 20px;
        .md-icon {
            font-size: 3rem !important;
            &.check_circle {
                color: var(--md-theme-default-primary) !important;
            }
            &.error {
                color: var(--md-theme-default-accent) !important;
            }
        }
    }
    h2,
    p {
        text-align: center;
    }
    button {
        display: block;
        margin: 0 auto !important;
    }
}
</style>
