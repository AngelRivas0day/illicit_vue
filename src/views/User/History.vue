<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="showConfirmCancelDialog"
            md-title="Confirmar cancelación de orden"
            md-content="Cancelar una orden es una acción irreversible. ¿Estás seguro de que deseas continuar?"
            md-confirm-text="Cancelar orden"
            md-cancel-text="Cerrar"
            @md-cancel="showConfirmCancelDialog = false"
            @md-confirm="confirmFunction"
        />
        <md-card class="my-4">
            <md-card-header>
                <div class="md-title">Historial de compras</div>
            </md-card-header>
            <md-card-content>
                <md-empty-state
                    v-if="history.length === 0"
                    md-icon="shopping_cart"
                    md-label="No tienes ninguna compra registrada."
                    md-description="Al realizar compras, podrás verlas aquí."
                ></md-empty-state>
                <orders-table
                    v-else
                    :orders="history"
                    :loading="loading"
                    :tableActions="tableActions"
                />
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import { Get, Patch } from "@/api/api";
import OrdersTable from "./OrdersTable";
import filters from "@/mixins/filters";

export default {
    name: "History",
    mixins: [filters],
    components: {
        OrdersTable,
    },
    async mounted() {
        this.initializeTableActions();
        await this.fetchUserOrders();
    },
    data: () => ({
        loading: false,
        history: [],
        tableActions: [],
        showConfirmCancelDialog: false,
        confirmFunction: () => {},
        loadingConfirmedAction: false,
    }),
    methods: {
        /**
         * @description
         * The `fetchData` method will fetch the user's order history.
         * @return {Promise<void>}
         */
        async fetchUserOrders() {
            try {
                this.loading = true;
                const { data: history } = await Get({
                    endpoint: "users-orders/me",
                    useToken: true,
                });
                this.history = history.map((order) => ({
                    ...order,
                    delivery_status: this.deliveryStatusToTextFn(
                        order.delivery_status,
                    ),
                    payment_status: this.paymentStatusToTextFn(
                        order.payment_status,
                    ),
                }));
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        initializeTableActions() {
            this.tableActions = [
                {
                    id: "view-details",
                    label: "Ver detalles",
                    icon: "visibility",
                    handler: function (row) {
                        this.$router.push({
                            name: "OrderDetails",
                            params: {
                                id: row.id,
                            },
                            query: {
                                from_route: "Account",
                                from_tab: "profile-history",
                            },
                        });
                    }.bind(this),
                },
                {
                    id: "cancel-order",
                    label: "Cancelar orden",
                    icon: "cancel",
                    condition: (row) => row.can_be_cancelled,
                    handler: async function (row) {
                        this.showConfirmCancelDialog = true;
                        this.confirmFunction = async () => {
                            try {
                                this.loadingConfirmedAction = true;
                                await Patch({
                                    endpoint: `users-orders/${row.id}/cancel`,
                                    useToken: true,
                                });
                                this.loadingConfirmedAction = false;
                                this.showConfirmCancelDialog = false;
                                await this.fetchUserOrders();
                            } catch (error) {
                                this.loadingConfirmedAction = false;
                                this.showConfirmCancelDialog = false;
                                this.$notify({
                                    group: "user",
                                    type: "error",
                                    title: "Error",
                                    text:
                                        error.response?.data?.message ||
                                        "Ha ocurrido un error al cancelar la orden. Por favor, intenta de nuevo.",
                                });
                            }
                        };
                    }.bind(this),
                },
            ];
        },
    },
};
</script>

<style scoped lang="scss"></style>
