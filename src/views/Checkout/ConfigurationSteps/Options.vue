<script>
import filters from "@/mixins/filters";
export default {
    name: "Options",
    mixins: [filters],
    props: {
        options: {
            type: Array,
            required: true,
        },
        alreadySelectedText: {
            type: String,
            default:
                "Esta opción ya fue seleccionada, si deseas cambiarla, selecciona otra opción.",
        },
        alreadySelectedTitle: {
            type: String,
            default: "Opción ya seleccionada",
        },
        readOnly: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data: () => ({
        selectedOption: null,
    }),
    methods: {
        selectOption(option) {
            if (option === this.selectedOption) {
                this.$notify({
                    group: "user",
                    title: this.alreadySelectedTitle,
                    text: this.alreadySelectedText,
                    type: "info",
                });
                return;
            }
            this.selectedOption = option;
            this.$emit("select", this.selectedOption);
        },
    },
};
</script>

<template>
    <div class="options-container row">
        <template v-for="option in options">
            <div :key="option.value" class="col-xs-12 col-sm-12 col-md-6 mb-3">
                <div
                    class="option d-flex flex-column"
                    :class="{
                        active: selectedOption === option,
                        'read-only': readOnly,
                    }"
                    @click="selectOption(option)"
                >
                    <div class="option-label mb-2 md-font">
                        {{ option.label }}
                    </div>
                    <div
                        class="option-price mb-2"
                        v-if="option.price !== undefined"
                    >
                        <template v-if="option.price === 0"> Gratis </template>
                        <template v-else>
                            {{ option.price | currency }}
                        </template>
                    </div>
                    <div class="option-text">
                        {{ option.text }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.options-container {
    .option {
        cursor: pointer;
        box-sizing: border-box !important;
        border: 1px solid transparent;
        background-color: #f5f5f5;
        padding: 1rem;
        border-radius: 0.5rem;
        &.read-only {
            cursor: initial;
        }
        &:not(.read-only):hover {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
        }
        &.active:not(.read-only) {
            background-color: #e0e0e0;
            border: 1px solid #ccc;
        }
        &.read-only {
            background-color: #e0e0e0;
        }
        &-label {
            font-size: 1.2rem;
            font-weight: bold;
        }
        &-text {
            line-height: 1.4em;
        }
    }
}
</style>
