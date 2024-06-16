<script>
export default {
    name: "ConfigurationSkeleton",
    render(h) {
        return h("div", { attrs: { id: "configuration-skeleton-container" } }, [
            h("div", { class: "row" }, [
                h("div", { class: "col-12" }, [
                    h("skeleton-loader-vue", {
                        class: "mb-5 loader-custom",
                        attrs: {
                            type: "rect",
                            width: "100px",
                            height: "60px",
                            animation: "fade",
                        },
                    }),
                ]),
                [1, 2, 3, 4].map((_, index) =>
                    h(
                        "div",
                        {
                            class: "col-xs-12 col-md-6",
                            key: index,
                        },
                        [
                            h("skeleton-loader-vue", {
                                class: "mb-4 loader-custom",
                                attrs: {
                                    type: "rect",
                                    width: "100px",
                                    height: "100px",
                                    animation: "fade",
                                    rounded: true,
                                },
                            }),
                        ],
                    ),
                ),
            ]),
        ]);
    },
};
</script>

<style lang="scss" scoped>
#configuration-skeleton-container {
    .row {
        margin-right: 20px;
    }
    ::v-deep div.loader-custom {
        background-color: #f3f3f3 !important;
        width: 100% !important;
        & > div {
            width: 100% !important;
        }
    }
}
</style>
