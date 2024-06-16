<script>
export default {
    name: "DesignImagesDialog",
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        product: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        showDialog: {
            get() {
                return this.active;
            },
            set(value) {
                this.$emit("update:active", value);
                if (!value) this.$emit("close");
            },
        },
        images() {
            return this.product.designs?.[0]
                ? this.product.designs[0].images
                : [];
        },
    },
};
</script>

<template>
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-content>
            <div class="row">
                <div
                    v-for="(image, index) in images"
                    :key="index"
                    class="col-xs-12 col-sm-12 col-md-6 col-lg-4"
                >
                    <img :src="image" class="img-fluid" alt="Design Image" />
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button
                class="md-dense md-primary md-stroked"
                @click="showDialog = false"
            >
                Cerrar
            </md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
