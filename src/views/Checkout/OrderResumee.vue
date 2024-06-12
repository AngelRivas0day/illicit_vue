<script>
import filters from "@/mixins/filters";

export default {
    name: "OrderResumee",
    mixins: [filters],
    props: {
        orderDetails: {
            type: Object,
            required: true,
            default: () => {},
        },
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
        promoCode: {
            type: Object,
            required: false,
            default: () => ({}),
        },
    },
    computed: {
        design() {
            return this.product.designs.find(
                (design) => design.name === this.orderDetails.designName,
            );
        },
        graduationType() {
            return this.orderDetails.graduationType ?? "No especificado";
        },
        antireflective() {
            return this.orderDetails.antireflective ? "Sí" : "No";
        },
        photochromatic() {
            return this.orderDetails.photochromic ? "Sí" : "No";
        },
        lensMaterial() {
            return this.orderDetails.lensMaterial ?? "No especificado";
        },
        frameMaterial() {
            return this.product.frameMaterial.join(", ");
        },
        maxDiopter() {
            return this.product.maxDiopter;
        },
    },
};
</script>

<template>
    <div class="d-flex justify-content-between align-items-start flex-column">
        <div class="purchase-item">
            <div class="item-card">
                <div class="card-image mb-3">
                    <img
                        :src="design.mainImage"
                        alt="Imagen del diseño seleccionado para comprar."
                    />
                </div>
                <div class="card-specs">
                    <ul>
                        <li class="d-flex align-items-center">
                            <span>Dise&ntilde;o: &nbsp;</span>
                            <div class="ml-1">{{ design.name }}</div>
                            <div class="mx-1">-</div>
                            <div
                                :style="'background-color:' + design.color.hex + ';'"
                                class="circle"
                            ></div>
                        </li>
                        <li>
                            <span>Tipo de graduaci&oacute;n: </span>
                            {{ graduationType | capitalize }}
                        </li>
                        <li><span>Antirreflejante: </span>{{ antireflective }}</li>
                        <li>
                            <span>Fotocrom&aacute;tico: </span>
                            {{ photochromatic }}
                        </li>
                        <li>
                            <span>Material del lente: </span>
                            {{ lensMaterial | capitalize }}
                        </li>
                        <li>
                            <span> Cantidad m&aacute;xima de doptr&iacute;as: </span>
                            {{ maxDiopter }}
                        </li>
                        <li><span>Mountura: </span> {{ frameMaterial }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="purchase-pricing">
            <span class="delivery-info">
                <small> Una tarifa de envío puede ser aplicada </small>
                <md-icon class="info-icon">help</md-icon>
                <md-tooltip md-direction="right"
                    >El precio de envio viene dado por la direcci&oacute;n de
                    env&iacute;o</md-tooltip
                >
            </span>
            <template v-if="promoCode">
                <div class="pricing-row">
                    <span>Producto: </span>${{ orderDetails.product.price }}
                </div>
                <div class="pricing-row">
                    <span>C&oacute;digo promocional: </span>-${{ promoCode.value }}
                </div>
            </template>
            <div class="pricing-row pricing-title">
                <span>Subtotal: </span>${{ orderDetails.total }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.purchase-item {
    padding: 0 15px 20px 15px;
    width: 100%;
    .item-card {
        .card-image {
            width: 100px;
            height: 100px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .card-specs {
            ul {
                padding: 0;
                margin: 0;
                list-style: none;
                li {
                    font-weight: 100;
                    font-size: 15px;
                    margin-bottom: 5px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    span:first-of-type {
                        font-weight: bold;
                        padding-right: 10px;
                    }
                    .circle {
                        width: 14px;
                        height: 14px;
                        border-radius: 100%;
                        border: 1px solid gray;
                    }
                    &.subtotal {
                        p {
                            font-size: 24px;
                            span {
                            }
                        }
                    }
                }
            }
        }
    }
}
.purchase-pricing {
    padding: 15px;
    .pricing-row {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        span {
            font-size: 18px;
            font-weight: bold;
        }
        &.pricing-title {
            margin-top: 20px;
            border-top: 1px solid $gray;
            padding-top: 10px;
            font-size: 24px;
        }
    }
    small {
        font-size: 14px;
        color: black;
    }
    .info-icon {
        color: black;
        font-size: 18px !important;
    }
    .delivery-info {
        cursor: pointer;
    }
}
</style>
