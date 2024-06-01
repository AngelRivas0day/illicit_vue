<script>
import Options from "./Options";
import filters from "@/mixins/filters";
import AddressFormDialog from "@/components/AddressFormDialog.vue";

export default {
    name: "DeliveryAndPayment",
    mixins: [filters],
    components: {
        Options,
        AddressFormDialog,
    },
    props: {
        userStoreIsLoggedIn: {
            type: Boolean,
            required: true,
            default: false,
        },
        store: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        addresses: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    watch: {
        addresses: {
            handler() {
                if (!this.addressId) {
                    const defaultAddress = this.addresses.find(
                        (address) => address.default,
                    );
                    if (defaultAddress) this.addressId = defaultAddress.id;
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.initializePaymentMethods();
        this.initializeDeliveryMethods();
    },
    data: () => ({
        paymentMethods: [],
        deliveryMethods: [],
        showAddressDialog: false,
        selectedPaymentMethod: null,
        showAddressLists: false,
        addressId: null,
    }),
    methods: {
        initializePaymentMethods() {
            this.paymentMethods = [
                {
                    label: "Tarjeta de crédito o débito",
                    value: "card",
                    text: "Paga con tu tarjeta de crédito o débito por medio de Stripe",
                },
            ];
            if (this.userStoreIsLoggedIn)
                this.paymentMethods.push({
                    label: "Pagar en tienda",
                    value: "cash",
                    text: "Paga en la tienda el momento de hacer el pedido",
                });
        },
        initializeDeliveryMethods() {
            this.deliveryMethods = [
                {
                    label: "Envío a domicilio",
                    value: "delivery",
                    text: "Recibe tu pedido en la comodidad de tu hogar",
                },
            ];
            if (this.userStoreIsLoggedIn)
                this.deliveryMethods.push({
                    label: "Recoger en tienda",
                    value: "store",
                    text: `Recoge tu pedido en la tienda ${this.store.name}`,
                });
        },
        onDeliveryMethodSelected(method) {
            this.showAddressLists = method.value === "delivery";
            this.$emit("selectDeliveryMethod", method);
        },
    },
};
</script>

<template>
    <div id="delivery-and-payment">
        <address-form-dialog
            :active.sync="showAddressDialog"
            @closed="$event ? $emit('addressCreated') : null"
        />
        <div class="row">
            <div class="col-12">
                <h2 class="md-title">M&eacute;todo de env&iacute;o</h2>
            </div>
            <div class="col-12">
                <options
                    :options="deliveryMethods"
                    @select="onDeliveryMethodSelected"
                    :read-only="false"
                />
            </div>
            <div class="col-12" v-if="showAddressLists">
                <h2 class="md-title mb-0">Direcci&oacute;n de entrega</h2>
                <md-button
                    @click="showAddressDialog = true"
                    class="ml-0 md-stroked md-dense md-primary"
                >
                    Crear nueva direcci&oacute;n
                </md-button>
            </div>
            <div class="col-12" v-if="showAddressLists">
                <md-radio
                    v-for="address in addresses"
                    v-model="addressId"
                    class="md-primary my-2 w-100"
                    :key="address.id"
                    :value="address.id"
                    @change="$emit('selectDeliveryAddress', address.id)"
                >
                    {{ address | address }}
                    &nbsp;
                    <small>{{ address.isDefault ? "(Default)" : "" }}</small>
                </md-radio>
            </div>
            <div class="col-12">
                <h2 class="md-title">M&eacute;todo de pago</h2>
            </div>
            <div class="col-12">
                <options
                    :options="paymentMethods"
                    @select="$emit('selectPaymentMethod', $event)"
                    :read-only="false"
                />
            </div>
        </div>
    </div>
</template>
