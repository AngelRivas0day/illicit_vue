<script>
import filters from "@/mixins/filters";
import Options from "./Options";

export default {
    name: "Graduation",
    components: {
        Options,
    },
    mixins: [filters],
    props: {
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
        userStoreIsLoggedIn: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data: () => ({
        graduationTypes: [
            {
                value: "neutros",
                label: "Neutros",
                price: 0,
                text: "Graduación neutra, sin aumento.",
            },
            {
                value: "monofocales",
                label: "Monofocales",
                price: 0,
                text: "Graduación para una sola distancia.",
            },
            {
                value: "bifocales",
                label: "Bifocales",
                price: 200,
                text: "Graduación para dos distancias.",
            },
            {
                value: "progresivos",
                label: "Progresivos",
                price: 300,
                text: "Graduación para todas las distancias.",
            },
        ],
        antireflectiveValues: [
            {
                value: true,
                label: "Sí",
                price: 1200,
                text: "Tratamiento antirreflejante.",
            },
            {
                value: false,
                label: "No",
                price: 0,
                text: "Sin tratamiento antirreflejante.",
            },
        ],
        photochromaticValues: [
            {
                value: true,
                label: "Sí",
                price: 1200,
                text: "Lentes fotocromáticas.",
            },
            {
                value: false,
                label: "No",
                price: 0,
                text: "Lentes sin tratamiento fotocromático.",
            },
        ],
        selectedGraduationType: null,
        graduationFile: null,
    }),
    methods: {
        selectGraduationType(graudationType) {
            this.selectedGraduationType = graudationType.value;
            this.$emit("selectGraduationType", graudationType);
        },
        selectGraduationFile(files) {
            this.graduationFile = files[0];
            this.$emit("selectGraduationFile", files[0]);
        },
    },
};
</script>

<template>
    <div id="graduation">
        <div class="row">
            <div class="col-12">
                <h2 class="md-title">Tipo de graduaci&oacute;n</h2>
            </div>
            <div class="col-12">
                <options
                    @select="selectGraduationType"
                    :options="graduationTypes"
                    :read-only="false"
                />
            </div>
            <div
                class="col-12"
                v-if="
                    selectedGraduationType &&
                    selectedGraduationType !== 'neutros' &&
                    !userStoreIsLoggedIn
                "
            >
                <h2 class="md-title">Archivo de graduaci&oacute;n</h2>
            </div>
            <div
                class="col-12"
                v-if="
                    selectedGraduationType &&
                    selectedGraduationType !== 'neutros' &&
                    !userStoreIsLoggedIn
                "
            >
                <md-field>
                    <label>Archivo</label>
                    <md-file
                        @md-change="selectGraduationFile"
                        v-model="graduationFile"
                    />
                </md-field>
            </div>
            <div class="col-12">
                <h2 class="md-title">Filtro fotocrom&aacute;tico</h2>
            </div>
            <div class="col-12">
                <options
                    @select="$emit('selectPhotochromic', $event)"
                    :options="photochromaticValues"
                    :read-only="false"
                />
            </div>
            <div class="col-12">
                <h2 class="md-title">Filtro antirreflejante</h2>
            </div>
            <div class="col-12">
                <options
                    @select="$emit('selectAntireflective', $event)"
                    :options="antireflectiveValues"
                    :read-only="false"
                />
            </div>
        </div>
    </div>
</template>
