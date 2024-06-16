<script>
import { Post } from "@/services/api";

export default {
    name: "UploadGraduation",
    props: {
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        orderId: {
            type: String,
            required: true,
        },
    },
    computed: {
        showDialog: {
            get() {
                return this.active;
            },
            set(value) {
                this.$emit("update:active", value);
                if (!value) {
                    this.graduationFile = null;
                    this.loading = false;
                    this.$emit("close");
                }
            },
        },
    },
    data: () => ({
        loading: false,
        graduationFile: null,
        file: null,
    }),
    methods: {
        async uploadGraduation() {
            try {
                this.loading = true;
                const formData = new FormData();
                formData.append("graduation", this.file);
                await Post({
                    endpoint: `users-orders/${this.orderId}/graduation`,
                    data: formData,
                    useToken: true,
                    contentType: "form-data",
                });
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Exito",
                    text: "Archivo subido correctamente.",
                });
                this.loading = false;
                this.showDialog = false;
            } catch (error) {
                this.loading = false;
                this.showDialog = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Ha ocurrido un error al subir el archivo. Por favor, intenta de nuevo.",
                });
            }
        },
        selectGraduationFile(files) {
            this.file = files[0];
        },
    },
};
</script>

<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-content>
                <md-field>
                    <label>Archivo de graduaci&oacute;n</label>
                    <md-file v-model="graduationFile" @md-change="selectGraduationFile" />
                </md-field>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button
                    class="md-dense"
                    @click="showDialog = false"
                    :disabled="loading"
                >
                    Cerrar
                </md-button>
                <md-button
                    class="md-dense md-primary md-raised"
                    @click="uploadGraduation"
                    :disabled="loading || !graduationFile"
                >
                    Guardar
                </md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>
