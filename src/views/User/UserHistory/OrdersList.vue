<template>
    <div class="orders">
        <OrderDetails
            v-if="showDialog && currentOrder"
            :order="currentOrder"
        />
        <div v-if="orders">
            <md-table v-model="orders" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                    <md-table-cell md-label="Producto" md-sort-by="Producto" >{{item.specs.name}}</md-table-cell>
                    <md-table-cell md-label="Material" md-sort-by="Material" >{{item.specs.material}}</md-table-cell>
                    <md-table-cell md-label="Antirreflejante" md-sort-by="Antirreflejante" >{{item.specs.antireflective == "true" ? 'Si' : 'No'}}</md-table-cell>
                    <md-table-cell md-label="Precio" md-sort-by="Precio" >$ {{item.specs.price}}</md-table-cell>
                    <md-table-cell md-label="Envio" md-sort-by="Envio">
                        <span :class="{
                            'text-success' : item.orderStatus == 'SUCCEEDED',
                            'text-warning': item.orderStatus == 'PENDING'
                        }">{{item.orderStatus}}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Pago" md-sort-by="Pago">
                        <span :class="{'text-success' : item.paymentStatus == 'SUCCEEDED'}">{{item.paymentStatus}}</span>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
    name: "OrdersList",
    components: {
        OrderDetails: () => import('./OrderDetails.vue')
    },
    async mounted(){
        console.log("mounted")
        try {
            await this.getOrders()
            console.log(this.orders)
        } catch (error) {
            console.log(error)
        }
    },
    data: () => ({
        currentOrder: null
    }),
    methods: {
        ...mapActions('orders',{
            getOrders:'getOrders'
        }),
        onSelect(item){
            if(item){
                this.currentOrder = item
                this.showDialog = true
            } else {
                this.showDialog = false
                this.currentOrder = null
            }
        }
    },
    computed: {
        ...mapFields('orders',{
            orders: 'orders',
            showDialog: 'showDialog'
        })
    }
};
</script>

<style lang="scss" scoped>

</style>
