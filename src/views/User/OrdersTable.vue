<script>
export default {
    name: "OrdersTable",
    props: {
        orders: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        tableHeaders: {
            type: Array,
            required: false,
            default: () => [
                {
                    text: "Producto",
                    align: "left",
                    sortable: true,
                    value: "product_name",
                },
                {
                    text: "Fecha de pedido",
                    align: "left",
                    sortable: true,
                    value: "created_at",
                },
                {
                    text: "Estado envío",
                    align: "left",
                    sortable: true,
                    value: "delivery_status",
                },
                {
                    text: "Estado pago",
                    align: "left",
                    sortable: true,
                    value: "payment_status",
                },
            ],
        },
        tableActions: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getFilteredItems(items, param) {
            return items.filter((action) => {
                if (action.condition) return action.condition(param);
                return true;
            });
        },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-12">
            <data-tables-server
                :data="orders"
                :total="orders.length"
                :loading="loading"
                :pagination-props="{ pageSizes: [10, 20, 30] }"
            >
                <template v-for="t in getFilteredItems(tableHeaders)">
                    <el-table-column
                        :key="t.value"
                        :prop="t.value"
                        :label="t.text"
                    ></el-table-column>
                </template>
                <el-table-column label="" width="60">
                    <template slot-scope="scope">
                        <md-menu>
                            <md-button class="md-icon-button" md-menu-trigger>
                                <md-icon>more_vert</md-icon>
                            </md-button>
                            <md-menu-content class="orders-table-menu-content">
                                <md-menu-item
                                    v-for="action in getFilteredItems(
                                        tableActions,
                                        scope.row,
                                    )"
                                    :key="action.id"
                                    :disabled="action.disabled"
                                    @click="action.handler(scope.row)"
                                >
                                    <md-icon v-if="action.icon">{{
                                        action.icon
                                    }}</md-icon>
                                    {{ action.label }}
                                </md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </template>
                </el-table-column>
            </data-tables-server>
        </div>
    </div>
</template>
