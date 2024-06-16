<script>
export default {
    name: "SignUpWarning",
    props: {
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        productId: {
            type: String,
            required: true,
        },
    },
    computed: {
        showDialog: {
            get() {
                return this.active;
            },
        },
    },
};
</script>

<template>
    <md-dialog-confirm
        :md-active="showDialog"
        md-title="Parece que no has iniciado sesión"
        md-content="Para poder hacer tu compra tienes que iniciar sesión. Es muy rápido hacerlo."
        md-confirm-text="Iniciar sesión"
        md-cancel-text="Cancelar"
        @md-confirm="
            () =>
                $router.push({
                    name: 'Login',
                    query: { from_route: 'Product', product_id: productId },
                })
        "
        @md-cancel="() => $emit('update:active', false)"
    />
</template>
