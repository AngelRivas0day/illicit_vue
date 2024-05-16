<script>
export default {
    name: "SearchFilters",
    props: {
        filters: {
            type: Object,
            required: false,
            default: () => ({
                brands: [],
                lensMaterials: [],
                frameMaterials: [],
                priceRange: null,
                start: null,
                end: null,
            }),
        },
    },
    data: () => ({
        availableBrands: [
            { value: "brand_name_1", label: "Arnette" },
            { value: "bvlgari", label: "Bvlgary" },
            { value: "costa", label: "Costa" },
            { value: "armani", label: "Armani" },
            { value: "channel", label: "Channel" },
            { value: "coach", label: "Coach" },
            { value: "giorgo_armany", label: "Giorgo Armani" },
            { value: "burberry", label: "Burberry" },
            { value: "dolce_gabbana", label: "Dolce Gabbana" },
        ],
        availableLensMaterials: [
            { value: "Mica", label: "Mica" },
            { value: "Policarbonato", label: "Policarbonato" },
            { value: "Material Illicit", label: "Material Illicit" },
        ],
        availableFrameMaterials: [
            { value: "Titanio", label: "Policarbonato" },
            { value: "Acero", label: "Plástico" },
            { value: "Aluminio", label: "Aluminio" },
            { value: "Pasta", label: "Pasta" },
            { value: "Acetato", label: "Acetato" },
            { value: "Otros", label: "Otros" },
        ],
    }),
    methods: {
        clearFilters() {
            const resetValues = {
                brands: [],
                lensMaterials: [],
                frameMaterials: [],
                priceRange: null,
                start: null,
                end: null,
            };
            this.$emit("filters-changed", resetValues);
            this.$emit("update:filters", resetValues);
        },
        onChangeFilter() {
            this.$emit("filters-changed", this.filters);
            this.$emit("update:filters", this.filters);
        },
        toggleBrand(brand) {
            const index = this.filters.brands.indexOf(brand);
            if (index === -1) this.filters.brands.push(brand);
            else this.filters.brands.splice(index, 1);
            this.onChangeFilter();
        },
        toggleLensMaterial(material) {
            const index = this.filters.lensMaterials.indexOf(material);
            if (index === -1) this.filters.lensMaterials.push(material);
            else this.filters.lensMaterials.splice(index, 1);
            this.onChangeFilter();
        },
        toggleFrameMaterial(material) {
            const index = this.filters.frameMaterials.indexOf(material);
            if (index === -1) this.filters.frameMaterials.push(material);
            else this.filters.frameMaterials.splice(index, 1);
            this.onChangeFilter();
        },
    },
};
</script>

<template>
    <div class="filters-container mb-0">
        <md-list class="md-list-filter">
            <md-list-item
                class="md-list-filter-item"
                :md-ripple="false"
                md-expand
            >
                <md-icon class="md-list-item-icon">filter_list</md-icon>
                <span class="md-list-item-text">Filtros</span>
                <md-list class="md-list-filters" slot="md-expand">
                    <md-list-item>
                        <div class="filters w-100 row">
                            <div class="col-12">
                                <md-button
                                    @click="clearFilters"
                                    class="md-stroked md-dense md-primary ml-0"
                                    >Limpiar filtros</md-button
                                >
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                <div class="filter-title">Marca</div>
                                <div class="filter-options">
                                    <md-chip
                                        class="option"
                                        :class="{
                                            active: filters.brands.includes(
                                                brand,
                                            ),
                                        }"
                                        v-for="brand in availableBrands"
                                        :key="brand.value"
                                        @click="toggleBrand(brand)"
                                        md-clickable
                                        >{{ brand.label }}</md-chip
                                    >
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                <div class="filter-title">Precio</div>
                                <div class="filter-options">
                                    slider component!
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                <div class="filter-title">
                                    Material del lente
                                </div>
                                <div class="filter-options">
                                    <md-chip
                                        class="option"
                                        :class="{
                                            active: filters.lensMaterials.includes(
                                                material,
                                            ),
                                        }"
                                        v-for="material in availableLensMaterials"
                                        :key="material.value"
                                        @click="toggleLensMaterial(material)"
                                        md-clickable
                                        >{{ material.label }}</md-chip
                                    >
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 mb-2">
                                <div class="filter-title">
                                    Material de la montura
                                </div>
                                <div class="filter-options">
                                    <md-chip
                                        class="option"
                                        :class="{
                                            active: filters.frameMaterials.includes(
                                                material,
                                            ),
                                        }"
                                        v-for="material in availableFrameMaterials"
                                        :key="material.value"
                                        @click="toggleFrameMaterial(material)"
                                        md-clickable
                                        >{{ material.label }}</md-chip
                                    >
                                </div>
                            </div>
                        </div>
                    </md-list-item>
                </md-list>
            </md-list-item>
        </md-list>
    </div>
</template>

<style scoped lang="scss">
.filters-container {
    .md-list-filter {
        background: transparent !important;
        .md-list-item-icon {
            margin-right: 10px !important;
        }
        .md-list-filters {
            background: transparent !important;
            .filters {
                .filter-title {
                    font-size: 16px;
                    margin: 0 0 4px 10px;
                }
                .filter-options {
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .option {
                        margin-bottom: 5px;
                        &.active,
                        &:hover {
                            background-color: #2ec5c5 !important;
                            color: white !important;
                        }
                    }
                }
            }
        }
    }

    ::v-deep .md-field.md-theme-default {
        color: black !important;
        input {
            -webkit-text-fill-color: #333333 !important;
        }
        i:after {
            height: 0px !important;
        }
    }

    ::v-deep .md-field.md-theme-default label {
        color: #333333 !important;
    }

    ::v-deep .md-field.md-theme-default.md-focused label {
        color: #2ec5c5 !important;
    }

    ::v-deep .md-field.md-theme-default.md-focused .md-icon {
        color: #2ec5c5 !important;
    }

    ::v-deep .md-field.md-theme-default:after {
        background-color: #333333 !important;
    }

    ::v-deep .md-field.md-theme-default:before {
        background-color: #2ec5c5 !important;
    }
}
</style>
