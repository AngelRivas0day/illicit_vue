<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>
                <div class="md-title">Detalles de compra</div>
                <div class="md-subhead">Fecha del pedido: {{ formattedDate }}</div>
            </md-dialog-title>
            <md-dialog-content id="order-details">
                <div class="order-details__resume row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h3 class="md-title">Direcci&oacute;n de env&iacute;o</h3>
                        <p>{{ order.address.street }} #{{ order.address.extNumber }}</p>
                        <p>{{ order.address.city }}, {{ order.address.state }}, {{ order.address.zip }}</p>
                        <p>Referencias del domicilio: {{ order.address.reference }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h3 class="md-title">Estado del pago</h3>
                        <md-chip :class="{'md-primary': order.paymentStatus == 'SUCCEEDED', 'md-accent': order.paymentStatus != 'SUCCEEDED'}">{{ order.paymentStatus }}</md-chip>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h3 class="md-title">Resumen de compra</h3> 
                        <p><span>Antirreflejante: </span>{{ order.specs.antireflective ? 'Con antirrflejante' : 'Sin antirreflejante' }}</p>
                        <p><span>Material: </span>{{ order.specs.material }}</p>
                        <p><span>Graduaci&oacute;n: </span></p>
                        <p><span>Total: </span> ${{ order.specs.price }}</p>
                    </div>
                </div>
                <div class="w-100 px-0 my-2">
                    <md-divider class="w-100"></md-divider>
                </div>
                <div class="order-details__items row">
                    <div class="col-12">
                        <tempalte v-if="order.orderStatus == 'PENDIENTE'">
                            <h4 class="md-title">Pendiente de entregar</h4>
                            <p>El paquete aún está en el proceso de entrega</p>
                        </tempalte>
                        <tempalte v-else>
                            <h4 class="md-title">El paquete ha sido entregado</h4>
                            <p>El paquete ha sido entregado en la direcci&oacute;n provista</p> 
                        </tempalte>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="item-card">
                            <div class="item-card__image">
                                <img src="http://via.placeholder.com/120x120" alt="Item del pedido">
                            </div>
                            <div class="item-card__info">
                                <p>{{ order.specs.name }}</p>
                                <p class="price">$ {{order.specs.price}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary md-dense md-raised" @click="onClose">Volver</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    name: 'OrderDetails',
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClose(){
            this.showDialog = false
        }
    },
    computed: {
        ...mapFields('orders',{
            showDialog: 'showDialog'
        }),
        formattedDate(){
            const orderDate = new Date(this.order.createdAt)
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate);
            const mo = new Intl.DateTimeFormat('es', { month: 'long' }).format(orderDate);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(orderDate);
            return `${da} ${mo} ${ye}`
        }
    }
}
</script>

<style lang="scss" scoped>
.md-subhead{
    opacity: .54;
    font-size: 14px;
    letter-spacing: .01em;
    line-height: 20px;
}
#order-details{
    .order-details__resume, .order-details__items{
        h3{
            margin-bottom: 2px;
            font-size: 19px;
        }
        h4{
            margin-bottom: 2px;
            font-size: 18px; 
        }
        p{
            margin-bottom: 2px;
            span{
                font-weight: bold;
            }
        }
    }
    .item-card{
        display: flex;
        flex-direction: row;
        &__image{
            flex: 1;
            max-width: 100px;
            margin-right: 20px;
            img{

            }
        }
        &__info{
            flex: 1;
            .price{
                color: red;
            }
        }
    }
}
</style>