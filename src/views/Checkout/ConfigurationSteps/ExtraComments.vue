<script>
export default {
    name: "ExtraComments",
    data: () => ({
        extraComments: null,
        inputTimeout: null,
    }),
    methods: {
        onCommentInput() {
            if (this.inputTimeout) clearTimeout(this.inputTimeout);
            this.inputTimeout = setTimeout(() => {
                this.$emit("changeComments", this.extraComments);
            }, 750);
        },
    },
};
</script>
<template>
    <div class="row" id="extra-comments">
        <div class="col-12">
            <h2 class="md-title">Comentarios adicionales</h2>
        </div>
        <div class="col-12">
            <md-field>
                <label> ¿Hay algo especial en tu pedido? </label>
                <md-textarea
                    @input="onCommentInput()"
                    v-model="extraComments"
                ></md-textarea>
            </md-field>
        </div>
    </div>
</template>
