<script>
import { Get, Patch } from "@/services/api";

export default {
    name: "UploadGraduation",
    async mounted() {
        const { token = null } = this.$route.query;
        if (!token) {
            this.invalidUrl = true;
            return;
        }
        this.urlToken = token;
        await this.fetchData();
    },
    data: () => ({
        urlToken: null,
        loading: false,
        invalidUrl: false,
        alreadyUploaded: false,
        selectedFile: null,
        uploading: false,
    }),
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: "token-order",
                    useToken: this.urlToken,
                });
                const { product } = data;
                this.product = product;
                this.loading = false;
            } catch (_) {
                this.loading = false;
                this.invalidUrl = true;
            }
        },
        onFileChange(files) {
            this.selectedFile = files?.[0];
        },
        async uploadGraduationFile() {
            try {
                this.uploading = true;
                const formData = new FormData();
                formData.append("graduation", this.selectedFile);
                await Patch({
                    endpoint: "token-order/graduation",
                    useToken: this.urlToken,
                    data: formData,
                    contentType: "form-data",
                });
                this.uploading = false;
                this.alreadyUploaded = true;
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Archivo subido",
                    text: "El archivo ha sido subido exitosamente.",
                });
            } catch (_) {
                this.uploading = false;
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text: "Ocurrió un error al subir el archivo. Por favor, intenta de nuevo.",
                });
            }
        },
    },
};
</script>

<template>
    <div id="graduation">
        <template v-if="loading">
            <div class="loading-container">
                <h2 class="md-title">Cargando...</h2>
            </div>
        </template>
        <template v-else-if="invalidUrl">
            <div class="invalid-url-container">
                <md-empty-state
                    md-rounded
                    md-icon="error"
                    md-label="Enlace inválido"
                    md-description="El enlace que has ingresado no es válido. Por favor, verifica que sea correcto."
                />
            </div>
        </template>
        <template v-else>
            <div class="upload-container">
                <md-empty-state
                    :md-icon="alreadyUploaded ? 'done_outline' : 'upload_file'"
                    :md-label="
                        alreadyUploaded
                            ? 'Gracias por tu confianza'
                            : 'Archivo de graduación'
                    "
                    :md-description="
                        alreadyUploaded
                            ? 'Hemos recibido tu graduación. Continuaremos con tu pedido.'
                            : 'Envianos tu graduación para poder continuar con tu pedido del producto ' +
                              product.name +
                              '.'
                    "
                >
                    <template v-if="!alreadyUploaded">
                        <md-field>
                            <label>Archivo de graduaci&oacute;n</label>
                            <md-file :disabled="uploading" @md-change="onFileChange" />
                        </md-field>
                        <md-button
                            @click="uploadGraduationFile"
                            :disabled="!selectedFile || uploading"
                            class="md-primary md-raised"
                        >
                            Enviar
                        </md-button>
                    </template>
                </md-empty-state>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scope>
#graduation {
    min-height: 100vh;
    padding-top: 55px;
    margin: 0 20px;
    .upload-container,
    .loading-container,
    .invalid-url-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 55px);
    }
}
</style>
