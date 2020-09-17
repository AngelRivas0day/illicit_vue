<template>
    <div>
        <div>
            <md-table>
                <md-table-row>
                    <md-table-head md-numeric>ID</md-table-head>
                    <md-table-head>Producto</md-table-head>
                    <md-table-head>Precio</md-table-head>
                    <md-table-head>Enviado</md-table-head>
                    <md-table-head>Direcci&oacute;n</md-table-head>
                </md-table-row>

                <md-table-row>
                    <md-table-cell md-numeric>1</md-table-cell>
                    <md-table-cell>Shawna Dubbin</md-table-cell>
                    <md-table-cell>$400.00</md-table-cell>
                    <md-table-cell>Enviado</md-table-cell>
                    <md-table-cell>Salto del Agua #2415 Guadalajara, Jalisco</md-table-cell>
                </md-table-row>

                <md-table-row>
                    <md-table-cell md-numeric>2</md-table-cell>
                    <md-table-cell>Odette Demageard</md-table-cell>
                    <md-table-cell>odemageard1@spotify.com</md-table-cell>
                    <md-table-cell>Female</md-table-cell>
                    <md-table-cell>Account Coordinator</md-table-cell>
                </md-table-row>

                <md-table-row>
                    <md-table-cell md-numeric>3</md-table-cell>
                    <md-table-cell>Vera Taleworth</md-table-cell>
                    <md-table-cell>vtaleworth2@google.ca</md-table-cell>
                    <md-table-cell>Male</md-table-cell>
                    <md-table-cell>Community Outreach Specialist</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "OrdersList",
    mounted(){
        // this.getOrders()
    },
    methods: {
        ...mapActions('orders',{
            getOrders:'getOrders'
        })
    },
    computed: {
        ...mapState('orders',{
            orders: 'orders'
        })
    }
};
</script>

<style></style>
