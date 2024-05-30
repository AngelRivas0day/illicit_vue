<script>
import filters from "@/mixins/filters";
import Options from "./Options";

export default {
    name: "GlassMaterials",
    mixins: [filters],
    components: {
        Options,
    },
    props: {
        productOrder: {
            type: Object,
            required: true,
        },
    },
    computed: {
        filteredFrameMaterials() {
            return this.allFrameMaterials.filter((frameMaterial) => {
                return this.productOrder.frameMaterial.includes(
                    frameMaterial.value,
                );
            });
        },
        filteredLensMaterials() {
            return this.allLensMaterials.filter((lensMaterial) => {
                return this.productOrder.lensMaterial.includes(
                    lensMaterial.value,
                );
            });
        },
    },
    data: () => ({
        allFrameMaterials: [
            {
                value: "Titanio",
                label: "Titanio",
                text: "Es un material muy ligero y resistente, ideal para monturas de gafas. Es hipoalergénico y no se oxida.",
            },
            {
                value: "Acero",
                label: "Acero",
                text: "Es un material resistente y duradero, ideal para monturas de gafas. Es hipoalergénico y no se oxida.",
            },
            {
                value: "Aluminio",
                label: "Aluminio",
                text: "Es un material ligero y resistente, ideal para monturas de gafas. Es hipoalergénico y no se oxida.",
            },
            {
                value: "Pasta",
                label: "Pasta",
                text: "Es un material resistente y duradero, ideal para monturas de gafas. Es hipoalergénico y no se oxida.",
            },
            {
                value: "Acetato",
                label: "Acetato",
                text: "Es un material muy ligero y resistente, ideal para monturas de gafas. Es hipoalergénico y no se oxida.",
            },
        ],
        allLensMaterials: [
            {
                value: "Mica",
                label: "Mica",
                price: 0,
                text: "Es un material resistente y duradero, ideal para lentes de gafas.",
            },
            {
                value: "Policarbonato",
                label: "Policarbonato",
                price: 300,
                text: "Es un material muy ligero y resistente, ideal para lentes de gafas.",
            },
            {
                value: "Material Illicit",
                label: "Material Illicit",
                price: 1000,
                text: "Es un material muy ligero y resistente, ideal para lentes de gafas.",
            },
        ],
    }),
};
</script>

<template>
    <div id="frame-and-lens-materials">
        <div class="row">
            <div class="col-12">
                <h2 class="md-title">
                    Materiales del lente <small>(selecciona uno)</small>
                </h2>
            </div>
            <div class="col-12">
                <options
                    @select="$emit('selectLensMaterial', $event)"
                    :options="filteredLensMaterials"
                    :read-only="false"
                />
            </div>
            <div class="col-12">
                <h2 class="md-title">
                    Materiales de montura <small>(no editable)</small>
                </h2>
            </div>
            <div class="col-12">
                <options :options="filteredFrameMaterials" :read-only="true" />
            </div>
        </div>
    </div>
</template>
