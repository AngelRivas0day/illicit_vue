<template>
    <div class="payment">
        <div class="payment-card-container">
            <div class="payment-card">
                <div class="payment-card--inner">
                    <div class="payment-card__number mt-5 mb-3">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="payment-card__card-holder">
                            <small>Titular</small><br>
                            <span>Jhon Wick</span>
                        </div>
                        <div class="payment-card__expiry">
                            <small>Expiraci&oacute;n</small><br>
                            <span>MM / YY</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-form">
            <div class="payment-form--inner">
                <form @submit="onSubmit" class="row w-100">
                    <div class="col-12 mb-4">
                        <label class="text-white mb-0">N&uacute;mero</label><br>
                        <card-number
                            class="stripe-element card-number"
                            ref="cardNumber"
                            :stripe="publicKey"
                            :options="stripeOptions"
                            @change="card.number = $event.complete"
                        />
                    </div>
                    <div class="col-6">
                        <label class="text-white mb-0">Expiraci&oacute;n</label><br>
                        <card-expiry
                            class="stripe-element card-expiry"
                            ref="cardExpiry"
                            :stripe="publicKey"
                            :options="stripeOptions"
                            @change="card.expiry = $event.complete"
                        />
                    </div>
                    <div class="col-6">
                        <label class="text-white mb-0">CVV</label><br>
                        <card-cvc
                            class="stripe-element card-cvc"
                            ref="cardCvc"
                            :stripe="publicKey"
                            :options="stripeOptions"
                            @change="card.cvc = $event.complete"
                        />
                    </div>
                    <div class="col-12 text-right mt-5">
                        <md-button
                            class="md-dense md-raised md-primary"
                            type="submit"
                        >Pagar</md-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
    CardNumber,
    CardExpiry,
    CardCvc,
    createToken,
} from "vue-stripe-elements-plus";

export default {
    name: "CardPayment",
    data: () => ({
        publicKey:
            "pk_test_51HJkwAD1nUNZOF3ZYIn3DEBY2QSkJdQTAYMYajExWnVXVnRBpiW1zmDJy2Ee1f3hzvmRDeu0kbmN78yMUsagfy2400HkhbwZ14",
        card: {
            complete: false,
            number: false,
            expiry: false,
            cvc: false,
        },
        stripeOptions: {
            style: {
                base: {
                    iconColor: "#dadadad",
                    color: "#ffffff",
                    lineHeight: "40px",
                    fontWeight: 300,
                    fontFamily: "Helvetica Neue",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#dadada",
                    },
                },
            },
        },
    }),
    components: {
        CardNumber,
        CardExpiry,
        CardCvc,
    },
    computed: {
        ...mapState("order", {
            lenseSpecs: "lenseSpecs",
        }),
        number(){
            return this.card.number
        },
        expiry(){
            return this.card.expiry
        },
        cvc(){
            return this.card.cvc
        }
    },
    watch: {
        number(){
            console.log("number changed!")
        },
        expiry(){
            console.log("expiry changed!")
        },
        cvc(){
            console.log("cvc changed!")
        }
    },
    methods: {
        ...mapActions("order", {
            createPayment: "createPayment",
            resetInfo: 'resetInfo'
        }),
        onSubmit(e) {
            e.preventDefault();
            createToken().then(async (data) => {
                try {
                    await this.createPayment({ stripeToken: data.token.id, total: this.lenseSpecs.price });
                    this.$router.push({name: 'PaymentSuccess'})
                } catch (error) {
                    console.log(error);
                } finally {
                    this.resetInfo()
                }
                
            });
            // this.createToken()
        },
    },
};
</script>

<style lang="scss" scoped>
.payment {
    background: white;
    min-height: 100vh;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    &-card-container {
        height: 300px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .payment-card{
            width: 380px;
            background: #333;
            border-radius: 15px;
            box-sizing: border-box;
            padding: 50px 20px 40px 20px;
            transform: translateY(20%);
            &--inner{
                .payment-card{
                    &__number{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        span{
                            color: white;
                            font-size: 34px;
                            letter-spacing: 3px;
                        }
                    }
                    &__expiry{
                        flex: 1;
                        small{
                            color: rgba(255,255,255,.8) !important;
                        }
                        span{
                            color: white;
                            font-size: 19px;
                            font-weight: 200;
                        }
                    }
                    &__card-holder{
                        flex: 1;
                        small{
                            color: rgba(255,255,255,.8) !important;
                        }
                        span{
                            color: white;
                            font-size: 19px;
                            font-weight: 200;
                        }
                    }
                }
            }
        }
        // animation: rotate 2s linear normal;
        // animation-fill-mode:forwards;
    }
    &-form{
        background: black;
        height: calc(100vH - 300px);
        .payment-form--inner{
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 500px;
            margin: 0 auto;
            height: 100%;
            form{
                .stripe-element{
                    border-bottom: 1px solid white;
                }
            }
        }
    }
}

@keyframes rotate {
    100% {
        transform: rotateY(180deg);
    }
}
</style>
