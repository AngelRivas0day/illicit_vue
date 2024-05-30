<script>
import { Get } from "@/api/api";
import filters from "@/mixins/filters";

export default {
    name: "GraduationDetails",
    mixins: [filters],
    props: {
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
        orderId: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        loading: false,
        graduation: null,
    }),
    watch: {
        async active(value) {
            if (value) await this.fetchGraduationDetails();
        },
    },
    methods: {
        async fetchGraduationDetails() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: `users-orders/${this.orderId}/graduation`,
                    useToken: true,
                });
                this.graduation = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
    },
    computed: {
        showDialog: {
            get() {
                return this.active;
            },
            set(value) {
                this.$emit("update:active", value);
            },
        },
    },
};
</script>

<template>
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Detalles de la graduación</md-dialog-title>
        <md-dialog-content>
            <div class="row">
                <div class="col-12" v-if="loading">Cargando...</div>
                <template v-else-if="graduation.file">
                    <div class="col-12">
                        <div class="d-flex flex-row justify-content-between">
                            <strong> Tipo de graduación: </strong>
                            <span>
                                {{ graduation.type | graduationTypeToText }}
                            </span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex flex-row justify-content-between">
                            <strong> Archivo de graduaci&oacute;n: </strong>
                            <a :href="graduation.file" target="_blank" download>
                                Ver archivo
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="col-12">
                        A&uacute;n no se ha registrado la graduaci&oacute;n.
                    </div>
                </template>
            </div>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button
                class="md-dense md-primary"
                @click="showDialog = false"
                :disabled="loading"
            >
                Cerrar
            </md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
