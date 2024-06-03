<script>
import { Get, Post } from "@/api/api";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import DetailsSkeleton from "./DetailsSkeleton";
import UploadGraduation from "./UploadGraduation";
import GraduationDetails from "./GraduationDetails";
import filters from "@/mixins/filters";

export default {
    name: "OrderDetails",
    mixins: [filters],
    components: {
        DetailsSkeleton,
        StripeCheckout,
        UploadGraduation,
        GraduationDetails,
    },
    async mounted() {
        const { id: orderId } = this.$route.params;
        this.orderId = orderId;
        await this.fetchOrder();
    },
    data: () => ({
        loading: false,
        order: null,
        orderId: null,
        showGraduationDialog: false,

        uploadingGraduation: false,
        showUploadGraduationDialog: false,

        requestEmail: null,
        sendingPaymentRequest: false,
        sendingGraduationRequest: false,
        showRequestPaymentDialog: false,
        showRequestGraduationDialog: false,

        sessionId: null,
        creatingCheckoutSession: false,
        stripePubickKey:
            "pk_test_51HJkwAD1nUNZOF3ZYIn3DEBY2QSkJdQTAYMYajExWnVXVnRBpiW1zmDJy2Ee1f3hzvmRDeu0kbmN78yMUsagfy2400HkhbwZ14",
    }),
    computed: {},
    methods: {
        async fetchOrder() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: `users-orders/${this.orderId}`,
                    useToken: true,
                });
                this.order = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async createAndGoToCheckoutSession() {
            try {
                this.creatingCheckoutSession = true;
                const { data } = await Get({
                    endpoint: `users-orders/${this.orderId}/stripe-checkout`,
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
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ocurrió un error al intentar enviar la solicitud de pago. Por favor, intenta de nuevo.",
                    type: "error",
                });
            }
        },
        validateRequestEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && emailRegex.test(email)) return true;
            if (!email) {
                this.$notify({
                    group: "user",
                    title: "Correo inválido",
                    text: "Por favor, ingresa un correo electrónico.",
                    type: "error",
                });
                return false;
            }
            if (!emailRegex.test(email)) {
                this.$notify({
                    group: "user",
                    title: "Correo inválido",
                    text: "Por favor, ingresa un correo electrónico válido.",
                    type: "error",
                });
                return false;
            }
        },
        async sendGraduationRequest() {
            const validEmail = this.validateRequestEmail(this.requestEmail);
            if (!validEmail) return;
            try {
                this.sendingGraduationRequest = true;
                await Post({
                    endpoint: `orders-utils/${this.orderId}/graduation-email`,
                    data: { email: this.requestEmail },
                    useToken: true,
                });
                this.requestEmail = null;
                this.sendingGraduationRequest = false;
                this.$notify({
                    group: "user",
                    title: "Solicitud enviada",
                    text: "Se ha enviado la solicitud de archivo de graduación al correo electrónico proporcionado.",
                    type: "success",
                });
            } catch (error) {
                this.sendingGraduationRequest = false;
                this.$notify({
                    group: "user",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ocurrió un error al intentar enviar la solicitud de graduación. Por favor, intenta de nuevo.",
                    type: "error",
                });
            }
        },
        async sendPaymentRequest() {
            const validEmail = this.validateRequestEmail(this.requestEmail);
            if (!validEmail) return;
            try {
                this.sendingPaymentRequest = true;
                await Post({
                    endpoint: `orders-utils/${this.orderId}/payment-email`,
                    data: { email: this.requestEmail },
                    useToken: true,
                });
                this.requestEmail = null;
                this.sendingPaymentRequest = false;
                this.$notify({
                    group: "user",
                    title: "Solicitud enviada",
                    text: "Se ha enviado la solicitud de pago al correo electrónico proporcionado.",
                    type: "success",
                });
            } catch (error) {
                this.requestEmail = null;
                this.sendingPaymentRequest = false;
                this.$notify({
                    group: "user",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ocurrió un error al intentar enviar la solicitud de pago. Por favor, intenta de nuevo.",
                    type: "error",
                });
            }
        },
        goBack() {
            const { from_tab = null, from_route = "Account" } =
                this.$route.query;
            const query = from_tab ? { active_tab: from_tab } : {};
            this.$router.push({ name: from_route, query });
        },
    },
};
</script>

<template>
    <div id="order-details">
        <graduation-details
            :active.sync="showGraduationDialog"
            :orderId="orderId"
        />
        <upload-graduation
            :active.sync="showUploadGraduationDialog"
            :orderId="orderId"
        />
        <md-dialog-prompt
            :md-active.sync="showRequestPaymentDialog"
            v-model="requestEmail"
            md-title="Enviar solicitud de pago"
            md-input-maxlength="100"
            md-input-placeholder="Correo electrónico"
            md-confirm-text="Enviar solicitud"
            md-cancel-text="Cancelar"
            @md-confirm="sendPaymentRequest"
        />
        <md-dialog-prompt
            :md-active.sync="showRequestGraduationDialog"
            v-model="requestEmail"
            md-title="Enviar solicitud de archivo de graduación"
            md-input-maxlength="100"
            md-input-placeholder="Correo electrónico"
            md-confirm-text="Enviar solicitud"
            md-cancel-text="Cancelar"
            @md-confirm="sendGraduationRequest"
        />
        <div class="row">
            <details-skeleton v-if="loading" />
            <template v-else>
                <div class="col-12 mb-3">
                    <h2>Detalles del pedido</h2>
                    <span>
                        Fecha del pedido: {{ order.createdAt | formatDate }}
                    </span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <md-card class="order-details-card address md-elevation-1">
                        <md-card-header>
                            <md-avatar>
                                <md-icon>location_on</md-icon>
                            </md-avatar>
                            <div class="md-title">
                                Direcci&oacute;n de env&iacute;o
                            </div>
                            <div class="md-subhead">
                                {{
                                    order.type === "client"
                                        ? "Dirección del cliente"
                                        : "Dirección de sucursal"
                                }}
                            </div>
                        </md-card-header>
                        <md-card-content>
                            <ul>
                                <template v-if="order.type === 'client'">
                                    <li>
                                        {{ order.address.street }} #{{
                                            order.address.extNumber
                                        }}
                                    </li>
                                    <li>
                                        {{ order.address.city }},
                                        {{ order.address.state }},
                                        {{ order.address.zip }}
                                    </li>
                                    <li>
                                        <strong>
                                            Referencias del domicilio:
                                        </strong>
                                        {{ order.address.reference }}
                                    </li>
                                </template>
                                <template v-else>
                                    <li>
                                        Nombre de sucursal:
                                        {{ order.store.name }}
                                    </li>
                                    <li>
                                        {{ order.store.street }} #{{
                                            order.store.extNumber
                                        }}
                                    </li>
                                </template>
                            </ul>
                        </md-card-content>
                    </md-card>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                    <stripe-checkout
                        ref="stripeCheckout"
                        :pk="stripePubickKey"
                        :session-id="sessionId"
                    />
                    <md-card
                        :class="order.payment.status"
                        class="order-details-card payment md-elevation-1"
                    >
                        <md-card-header>
                            <md-avatar>
                                <md-icon> payment </md-icon>
                            </md-avatar>
                            <div class="md-title">Estado de pago</div>
                            <div class="md-subhead">
                                {{ order.payment.type | paymentTypeToText }}
                            </div>
                            <md-card-content>
                                {{ order.payment.status | paymentStatusToText }}
                            </md-card-content>
                        </md-card-header>
                        <md-card-actions v-if="order.canUpdatePaymentData">
                            <md-button
                                v-if="order.type === 'store'"
                                class="md-dense md-primary"
                                :disabled="sendingPaymentRequest"
                                @click="showRequestPaymentDialog = true"
                            >
                                {{
                                    sendingPaymentRequest
                                        ? "Enviando solicitud..."
                                        : "Enviar solicitud de pago"
                                }}
                            </md-button>
                            <md-button
                                v-if="order.type === 'client'"
                                class="md-dense md-primary"
                                :disabled="creatingCheckoutSession"
                                @click="createAndGoToCheckoutSession"
                            >
                                {{
                                    creatingCheckoutSession
                                        ? "Creando sesión de pago..."
                                        : "Realizar pago"
                                }}
                            </md-button>
                        </md-card-actions>
                    </md-card>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5">
                    <md-card class="order-details-card purchase md-elevation-1">
                        <md-card-header>
                            <md-avatar>
                                <img
                                    alt="Imagen del producto en miniatura"
                                    :src="order.product.designs[0].mainImage"
                                    class="purchase-image mini"
                                />
                            </md-avatar>
                            <div class="md-title">
                                Informaci&oacute;n de la compra
                            </div>
                            <div class="md-subhead">Detalles del producto</div>
                        </md-card-header>
                        <md-card-content>
                            <ul class="space-between">
                                <li>
                                    <span> Antirreflejante: </span>
                                    {{
                                        order.antireflective
                                            ? "Con antirreflejante"
                                            : "Sin antirreflejante"
                                    }}
                                </li>
                                <li>
                                    <span> Fotocrom&aacute;tico: </span>
                                    {{
                                        order.photochromic
                                            ? "Con efecto fotocromático"
                                            : "Sin efecto fotocromático"
                                    }}
                                </li>
                                <li>
                                    <span> Material del lente: </span>
                                    {{ order.lensMaterial }}
                                </li>
                                <li>
                                    <span> Material de montura: </span>
                                    {{ order.product.frameMaterial.join(", ") }}
                                </li>
                                <li>
                                    <span> Dise&ntilde;o del lente: </span>
                                    <span>
                                        <small
                                            @click="
                                                showDesignImagesDialog = true
                                            "
                                            class="cursor-pointer"
                                        >
                                            (Ver imag&eacute;n)
                                        </small>
                                        {{ order.product.designs[0].name }}
                                    </span>
                                </li>
                                <li>
                                    <span> Graduaci&oacute;n: </span>
                                    <template v-if="!order.graduationRef">
                                        Sin graduaci&oacute;n
                                    </template>
                                    <template
                                        v-else-if="
                                            order.graduationRef === 'pending'
                                        "
                                    >
                                        Pendiente
                                    </template>
                                    <template v-else-if="order.graduation">
                                        {{
                                            order.graduation.type
                                                | graduationTypeToText
                                        }}
                                    </template>
                                    <template v-else> Personalizada </template>
                                </li>
                                <li>
                                    <span> Comentarios extras: </span>
                                    {{
                                        order.extraComments || "Sin comentarios"
                                    }}
                                </li>
                                <li>
                                    <span> Total: </span>
                                    ${{ order.total }}
                                </li>
                            </ul>
                        </md-card-content>
                        <md-card-actions v-if="order.canUpdateGraduationData">
                            <md-button
                                @click="showGraduationDialog = true"
                                class="md-stroked md-primary mr-0 mb-0"
                                :disabled="order.graduationRef === 'pending'"
                            >
                                Ver graduaci&oacute;n
                            </md-button>
                            <md-button
                                v-if="
                                    order.type === 'store' &&
                                    order.canUpdateGraduationData
                                "
                                class="md-dense md-primary"
                                @click="showRequestGraduationDialog = true"
                                :disabled="sendingGraduationRequest"
                            >
                                {{
                                    sendingGraduationRequest
                                        ? "Enviando solicitud..."
                                        : "Enviar solicitud de graduaci&oacute;n"
                                }}
                            </md-button>
                            <md-button
                                v-if="
                                    order.type === 'client' &&
                                    order.canUpdateGraduationData
                                "
                                :disabled="uploadingGraduation"
                                @click="showUploadGraduationDialog = true"
                                class="md-dense md-primary"
                            >
                                {{
                                    uploadingGraduation
                                        ? "Enviando graduaci&oacute;n..."
                                        : "Subir graduaci&oacute;n"
                                }}
                            </md-button>
                        </md-card-actions>
                    </md-card>
                </div>

                <div class="col-12 w-100 my-3">
                    <md-divider class="w-100"></md-divider>
                </div>

                <div class="col-12">
                    <md-card class="order-details-card shipment md-elevation-1">
                        <md-card-header>
                            <md-avatar>
                                <md-icon> local_shipping </md-icon>
                            </md-avatar>
                            <div class="md-title">Detalles de env&iacute;o</div>
                            <div class="md-subhead">
                                Informaci&oacute;n de la paqueter&iacute;a y
                                estado de env&iacute;o
                            </div>
                        </md-card-header>
                        <md-card-content>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-6">
                                    <div class="row">
                                        <div class="col-12">
                                            <h6>Estado de env&iacute;o</h6>
                                        </div>
                                        <div class="col-12">
                                            <strong>
                                                {{
                                                    order.delivery.status
                                                        | deliveryStatusToText
                                                }}
                                            </strong>
                                        </div>
                                        <div class="col-12">
                                            <p>
                                                {{
                                                    order.delivery.status
                                                        | deliveryStatusToMessage
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6">
                                    <div class="row">
                                        <div class="col-12">
                                            <h6>
                                                Informaci&oacute;n de
                                                env&iacute;o
                                            </h6>
                                        </div>
                                        <div
                                            v-if="
                                                order.delivery.type ===
                                                    'delivery' &&
                                                order.delivery.name &&
                                                order.delivery.code
                                            "
                                            class="col-12"
                                        >
                                            <p>
                                                <strong>Paquetería:</strong>
                                                {{ order.delivery.name }}
                                            </p>
                                            <p>
                                                <strong>Guía:</strong>
                                                {{ order.delivery.code }}
                                            </p>
                                        </div>
                                        <div
                                            v-else-if="
                                                order.delivery.type ===
                                                'delivery'
                                            "
                                            class="col-12"
                                        >
                                            El pedido ser&aacute; enviado por
                                            paqueter&iacute;a. <br />
                                            A&uacute;n no se ha asignado una
                                            gu&iacute;a.
                                        </div>
                                        <div
                                            v-if="
                                                order.delivery.type === 'store'
                                            "
                                            class="col-12"
                                        >
                                            <p>
                                                El pedido ser&aacute; recogido
                                                en la sucursal donde se
                                                realiz&oacute; la compra.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>

                <div class="col-12 text-right">
                    <md-button
                        class="md-raised md-dense md-primary"
                        @click="goBack"
                    >
                        Volver
                    </md-button>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/vars";

#order-details {
    margin-top: 55px;
    min-height: 100vh;
    @include container;
    .shipment-warning-message {
        color: #faad14;
        display: flex;
        flex-direction: row;
        align-items: center;
        .md-icon {
            color: #faad14;
            max-width: 20px;
            margin-right: 15px !important;
            flex: 1;
        }
        span {
            flex: 1;
        }
    }
    .order-details-card {
        margin-bottom: 20px;
        border-radius: 10px;
        &.purchase {
            img {
                border-radius: 100%;
                width: 80px;
                height: 80px;
                object-fit: cover;
            }
        }
        &.address,
        &.payment,
        &.purchase,
        &.shipment {
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                li {
                    margin-bottom: 2px;
                    span:nth-child(1) {
                        font-weight: bold;
                    }
                }
                &.space-between {
                    li {
                        margin-bottom: 2px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        span {
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        &.payment {
            .md-card-header {
                margin-bottom: 0 !important;
            }
            &.pending {
                background: #f5a623bd !important;
            }
            &.paid {
                background: #52c41abd !important;
            }
            &.denied {
                background: #f5222dbd !important;
            }
        }
    }
    .md-card {
        margin-bottom: 20px;
    }
}
</style>
