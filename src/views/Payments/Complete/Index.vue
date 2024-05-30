<script>
import { Get } from "@/api/api";

export default {
    name: "CompletePayment",
    mounted() {
        const { token = null } = this.$route.query;
        if (!token) {
            this.invalidUrl = true;
            return;
        }
        this.urlToken = token;
        this.fetchData();
    },
    data: () => ({
        urlToken: null,
        loading: false,
        invalidUrl: false,
        creatingSession: false,
        product: null,
        displayName: null,
        errorMessage: null,
    }),
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: "token-order",
                    useToken: this.urlToken,
                });
                const { product, displayName } = data;
                this.product = product;
                this.displayName = displayName;
                this.loading = false;
            } catch (_) {
                this.loading = false;
                this.invalidUrl = true;
            }
        },
        async goToCheckout() {
            try {
                this.errorMessage = null;
                this.creatingSession = true;
                const { data } = await Get({
                    endpoint: "/token-order/stripe-checkout",
                    useToken: this.urlToken,
                });
                const { sessionId } = data;
                console.log({
                    sessionId,
                });
                this.creatingSession = false;
            } catch (error) {
                this.creatingSession = false;
                this.errorMessage = error.message;
            }
        },
    },
};
</script>

<template>
    <div id="graduation">
        <div class="row">
            <template v-if="loading">
                <div class="col-12"></div>
            </template>
            <template v-else-if="invalidUrl">
                <div class="col-12"></div>
            </template>
            <template v-else-if="errorMessage">
                <div class="col-12">
                    {{ errorMessage }}
                </div>
            </template>
            <template v-else>
                <div class="col-12">
                    {{ displayName }}
                    {{ product }}
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scope></style>
