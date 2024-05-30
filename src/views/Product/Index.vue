<template>
    <div class="product">
        <SkeletonProduct v-if="loading" />
        <template v-else>
            <sign-up-warning
                :productId="productId"
                :active.sync="showSignUpDialog"
            />
            <product-details
                :product="product"
                :isAddedToFavorites="isFavorite"
                :loadingFavorite="loadingFavorite"
                :hasOffer="hasOffer"
                :offerPrice="offerPrice"
                :loadingOffer="loadingOffer"
                @toggleFavorite="toggleFavorite()"
                @goToCheckout="goToCheckout()"
                @changeDesign="selectedDesignName = $event.name"
            />
            <product-tabs :product="product" />
        </template>
    </div>
</template>

<script>
import SkeletonProduct from "./SkeletonProduct";
import ProductDetails from "./ProductDetails";
import SignUpWarning from "./SignUpWarning";
import ProductTabs from "./ProductTabs";
import { getAuth } from "firebase/auth";
import { Get, Post } from "@/api/api";
import { mapActions } from "vuex";

export default {
    name: "Product",
    components: {
        SkeletonProduct,
        ProductDetails,
        ProductTabs,
        SignUpWarning,
    },
    data: () => ({
        productId: null,
        product: null,
        selectedDesignName: null,
        loading: true,

        isFavorite: false,
        loadingFavorite: false,

        offerId: null,
        hasOffer: null,
        offerPrice: null,
        loadingOffer: false,

        userUnsubscribe: null,
        isUserLoggedIn: false,
        showSignUpDialog: false,
    }),
    async mounted() {
        const { id: prductId } = this.$route.params;
        this.unsetWhiteIcons();
        this.productId = prductId;
        this.userUnsubscribe = getAuth().onAuthStateChanged(async (user) => {
            this.isUserLoggedIn = !!user;
            await this.fetchProductAndVerify();
            this.watchQueryChanges();
        });
    },
    destroyed() {
        if (this.userUnsubscribe) this.userUnsubscribe();
    },
    methods: {
        ...mapActions("background", {
            unsetWhiteIcons: "unsetWhiteIcons",
        }),
        async fetchProductAndVerify() {
            await this.fetchProduct();
            const verifyFunctions = [
                this.verifyIfProductHasOffer(),
                this.isUserLoggedIn
                    ? this.verifyIfProductIsFavoriteInAPI()
                    : this.verifyIfProductIsFavoriteInLocalStorage(),
            ];
            await Promise.allSettled(verifyFunctions);
        },
        watchQueryChanges() {
            this.$watch(
                () => this.$route.params.id,
                async (newProductId) => {
                    this.productId = newProductId;
                    await this.fetchProductAndVerify();
                },
            );
        },
        async fetchProduct() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: `glasses/${this.productId}`,
                    useToken: false,
                });
                this.product = { ...data };
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al cargar el producto",
                });
            }
        },
        async verifyIfProductHasOffer() {
            const setEmptyOffer = () => {
                this.offerId = null;
                this.hasOffer = false;
                this.offerPrice = null;
            };
            try {
                this.loadingOffer = true;
                const { data = null } = await Get({
                    endpoint: `glasses/${this.productId}/offer`,
                    useToken: false,
                });
                const {
                    hasOffer = false,
                    offerPrice = false,
                    offerId = null,
                } = data;
                if (!hasOffer) {
                    setEmptyOffer();
                    this.loadingOffer = false;
                    return;
                }
                this.offerId = offerId;
                this.hasOffer = hasOffer;
                this.offerPrice = offerPrice;
                this.loadingOffer = false;
            } catch (error) {
                setEmptyOffer();
                this.loadingOffer = false;
            }
        },
        async verifyIfProductIsFavoriteInLocalStorage() {
            const favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];
            this.isFavorite = favorites.some(
                (favorite) => favorite.glassId === this.productId,
            );
        },
        async verifyIfProductIsFavoriteInAPI() {
            try {
                this.loadingFavorite = true;
                const { data = [] } = await Get({
                    endpoint: "clients/favorites",
                    useToken: true,
                });
                this.isFavorite = data.some(
                    (favorite) => favorite.glassId === this.productId,
                );
                this.loadingFavorite = false;
            } catch (error) {
                this.loadingFavorite = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al verificar si el producto es favorito",
                });
            }
        },
        goToCheckout() {
            if (!this.isUserLoggedIn) {
                this.showSignUpDialog = true;
                return;
            }
            const query = {
                design_name: this.selectedDesignName,
            };
            if (this.hasOffer) query["offer_id"] = this.offerId;
            this.$router.push({
                name: "Checkout",
                params: { id: this.productId },
                query,
            });
        },
        async toggleFavoriteInBackend() {
            try {
                this.loadingFavorite = true;
                const { data } = await Post({
                    endpoint: "clients/favorites",
                    useToken: true,
                    data: { glassId: this.productId },
                });
                const { message, added } = data;
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Éxito",
                    text: message,
                });
                this.isFavorite = added;
                this.loadingFavorite = false;
            } catch (error) {
                this.loadingFavorite = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al agregar el producto a favoritos",
                });
            }
        },
        toggleFavoriteInStorage() {
            const favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];
            const isFavorite = favorites.some(
                (favorite) => favorite.glassId === this.productId,
            );
            if (isFavorite) {
                const newFavorites = favorites.filter(
                    (favorite) => favorite.glassId !== this.productId,
                );
                localStorage.setItem("favorites", JSON.stringify(newFavorites));
                this.isFavorite = false;
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Éxito",
                    text: "Producto eliminado de favoritos",
                });
                return;
            }
            const newFavorites = [...favorites, { glassId: this.productId }];
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            this.isFavorite = true;
            this.$notify({
                group: "user",
                type: "success",
                title: "Éxito",
                text: "Producto agregado a favoritos",
            });
        },
        async toggleFavorite() {
            this.isUserLoggedIn
                ? await this.toggleFavoriteInBackend()
                : this.toggleFavoriteInStorage();
        },
    },
};
</script>

<style lang="scss" scoped></style>
