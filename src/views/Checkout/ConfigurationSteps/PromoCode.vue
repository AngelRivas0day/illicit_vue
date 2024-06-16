<script>
import { Get } from "@/services/api";

export default {
    name: "PromoCode",
    data: () => ({
        code: null,
        valid: false,
        message: null,
        loading: false,
    }),
    methods: {
        async verifyPromoCode() {
            try {
                this.loading = true;
                this.valid = false;
                this.message = null;
                const { data } = await Get({
                    endpoint: `promo-codes/${this.code}/verify`,
                    useToken: true,
                });
                const { promoCode = null, valid } = data;
                this.valid = valid;
                this.loading = false;
                this.$emit("promoCodeApplied", valid && promoCode ? promoCode : null);
            } catch (error) {
                this.$emit("promoCodeApplied", null);
                this.message =
                    error?.response?.data?.message ||
                    error.message ||
                    "Ha ocurrido un error al validar el c&oacute;digo promocional. Int&eacute;ntalo de nuevo.";
                this.valid = false;
                this.loading = false;
            }
        },
    },
};
</script>

<template>
    <div class="row promo-code-container">
        <div class="col-12">
            <h2 class="md-title">C&oacute;digo promocional</h2>
        </div>
        <div class="col-12">
            <div class="d-flex flex-row align-items-center">
                <md-field :class="{ 'md-invalid': message && code }">
                    <label> Escriba el c&oacute;digo promocional </label>
                    <md-input v-model="code" :disabled="loading" @blur="message = null" />
                    <span class="md-error" v-if="message">
                        {{ message }}
                    </span>
                </md-field>
                <md-button
                    @click="verifyPromoCode"
                    :disabled="loading || !code"
                    class="md-dense md-primary"
                >
                    Aplicar
                </md-button>
            </div>
        </div>
    </div>
</template>
