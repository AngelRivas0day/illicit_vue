<template>
    <div class="products">
        <div class="products__header">
            <div class="header-inner">
                <img
                    :src="
                        headerImage
                            ? headerImage
                            : 'https://via.placeholder.com/800x800'
                    "
                    :alt="'Imagen de cabezera para la categoría ' + headerLabel"
                />
                <div class="header-content">
                    <h2 class="header-title">
                        {{ headerLabel ? headerLabel : "Cargando..." }}
                    </h2>
                </div>
            </div>
        </div>
        <div class="products__content">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <search-filters
                            :filters.sync="filters"
                            @filters-changed="fetchCategoryProducts()"
                        />
                    </div>
                    <template v-if="!loading">
                        <template v-for="product in products">
                            <div
                                :key="product.id"
                                v-if="product.designs.length > 0"
                                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                            >
                                <template>
                                    <ProductCard :product="product" />
                                </template>
                            </div>
                        </template>
                        <template v-if="products.length === 0">
                            <md-empty-state
                                md-icon="search_off"
                                md-label="No se han encontrado productos"
                                md-description="Los filtros aplicados no han devuelto resultados"
                            ></md-empty-state>
                        </template>
                    </template>
                    <template v-else>
                        <div
                            v-for="_ in Array.from({ length: 6 })"
                            :key="_"
                            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                        >
                            <skeleton-loader-vue
                                type="rect"
                                width="360px"
                                height="260px"
                                class="mb-3 mx-auto"
                            ></skeleton-loader-vue>
                        </div>
                    </template>
                    <div class="col-12 text-center">
                        <button
                            @click="fetchCategoryProducts(true)"
                            class="see-more"
                        >
                            <span>ver m&aacute;s</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "./ProductCard";
import SearchFilters from "@/views/Products/SearchFilters.vue";
import { Get } from "@/api/api";
import { mapActions } from "vuex";

export default {
    name: "Products",
    components: { SearchFilters, ProductCard },
    mounted() {
        const { category_id = null, event_id = null } = this.$route.query;
        const validRender = category_id || event_id;
        if (!validRender) {
            this.$router.push({ name: "Home" });
            this.$notify({
                title: "Error",
                message: "No se ha especificado una categoría o evento válido",
                type: "error",
            });
            return;
        }
        this.filters.end = { value: this.pageSize };

        if (event_id) {
            this.eventId = event_id;
            this.fetchEvent();
            return;
        }
        this.categoryId = category_id;
        this.fetchCategory();
    },
    data: () => ({
        categoryId: null,
        eventId: null,

        headerLabel: null,
        headerImage: null,

        products: [],
        loading: null,
        pageSize: 25,
        filters: {
            brands: [],
            lensMaterials: [],
            frameMaterials: [],
            priceRange: null,
            start: null,
            end: null,
        },
    }),
    methods: {
        ...mapActions("background", {
            setWhiteIcons: "setWhiteIcons",
            unsetWhiteIcons: "unsetWhiteIcons",
        }),
        async fetchEvent() {
            try {
                const { data } = await Get({
                    endpoint: `events/${this.eventId}`,
                    useToken: false,
                });
                this.headerLabel = data.name;
                this.headerImage = data.image;
                await this.fetchEventProducts();
            } catch (error) {
                this.$notify({
                    title: "Error",
                    message: "No se ha podido cargar el evento",
                    type: "error",
                });
            }
        },
        async fetchCategory() {
            try {
                const { data } = await Get({
                    endpoint: `categories/${this.categoryId}`,
                    useToken: false,
                });
                this.headerLabel = data.name;
                this.headerImage = data.banner;
                await this.fetchCategoryProducts();
            } catch (error) {
                this.$notify({
                    title: "Error",
                    message: "No se ha podido cargar la categoría",
                    type: "error",
                });
            }
        },
        /**
         * @description
         * Transform the filters object into a query string to be used in the API request
         * that fetches the products.
         * @returns {String} - Query string
         */
        getFiltersAsQueryParams() {
            const params = new URLSearchParams();
            const filterKeys = Object.keys(this.filters);
            for (const key of filterKeys) {
                const isFilterArray = Array.isArray(this.filters[key]);
                if (isFilterArray && this.filters[key].length) {
                    const values = this.filters[key]
                        .map(({ value }) => value)
                        .join(",");
                    params.append(key, values);
                } else if (!isFilterArray && this.filters[key]?.value) {
                    params.append(key, this.filters[key].value);
                }
            }
            return params.toString();
        },
        /**
         * @description
         * Handle the response from the API request that fetches the products.
         * It sets the products array with the new data, it can append the results
         * to the existing products or replace them.
         *
         * It is called every time the {@link fetchCategoryProducts} or {@link fetchEventProducts}
         * methods are called.
         * @param {Array} data - Products array
         * @param {Object} options - Options object
         * @param {Boolean} options.appendResults - Append the results to the existing products
         * @returns {Void}
         */
        handleProductsGetResponse(data, options) {
            const { appendResults } = options;
            if (appendResults) {
                const filteredItems = data.filter(
                    ({ id }) =>
                        this.products.findIndex(
                            (product) => product.id === id,
                        ) === -1,
                );
                this.products = [...this.products, ...filteredItems];
            } else {
                this.products = data;
            }
            this.filters.start = { value: this.products.length };
            this.filters.end = {
                value: this.products.length + this.pageSize,
            };
        },
        async fetchEventProducts(appendResults = false) {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: `events/${this.eventId}/products?${this.getFiltersAsQueryParams()}`,
                    useToken: false,
                });
                this.handleProductsGetResponse(data, { appendResults });
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async fetchCategoryProducts(appendResults = false) {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: `categories/${this.categoryId}/products?${this.getFiltersAsQueryParams()}`,
                    useToken: false,
                });
                this.handleProductsGetResponse(data, { appendResults });
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.products {
    position: relative;
    z-index: 5;
    background-color: white;
    &__header {
        top: 0;
        left: 0;
        height: 80vh;
        position: relative;
        width: 100%;
        z-index: 10;
        overflow: hidden;
        .header-inner {
            height: 100%;
            background: rgba(33, 33, 33, 0.5);
            img {
                position: relative;
                z-index: -1;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            .header-content {
                position: absolute;
                z-index: 99;
                left: 20px;
                top: calc(80vh / 2);
                transform: translateY(-50%);
                .header-title {
                    font-size: 40px;
                    text-transform: uppercase;
                    color: $main-green;
                    @media #{$break-medium} {
                        font-size: 80px;
                    }
                }
            }
        }
    }
    &__content {
        min-height: 100vh;
        // margin-top: calc(30vh - 50px);
        position: relative;
        z-index: 20;
        background-color: white;
        box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
        padding: 50px 0;
        // box-sizing: content-box;
        .see-more {
            @include call-to-action-2(black);
        }
    }
}
.md-list-item-expand {
    border: 0px !important;
}
::v-deep .md-list-item-content {
    &:hover {
        background: transparent !important;
    }
}
</style>
