<script>
export default {
    name: "DetailsSkeleton",
    render(h) {
        return h("div", { attrs: { id: "details-skeleton-container" } }, [
            h("div", { class: "row" }, [
                h("div", { class: "col-12" }, [
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 300,
                            height: 40,
                        },
                        class: "mb-2",
                    }),
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 200,
                            height: 30,
                        },
                        class: "mb-4",
                    }),
                ]),
                h("div", { class: "col-xs-12 col-sm-12 col-md-12 col-lg-4" }, [
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 300,
                            height: 240,
                            rounded: true,
                        },
                        class: "custom-skeleton",
                    }),
                ]),
                h("div", { class: "col-xs-12 col-sm-12 col-md-12 col-lg-3" }, [
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 300,
                            height: 150,
                            rounded: true,
                        },
                        class: "custom-skeleton",
                    }),
                ]),
                h("div", { class: "col-xs-12 col-sm-12 col-md-12 col-lg-5" }, [
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 300,
                            height: 300,
                            rounded: true,
                        },
                        class: "custom-skeleton",
                    }),
                ]),
                h("div", { class: "col-12 w-100 my-3" }, [
                    h("md-divider", { class: "w-100" }),
                ]),
                h("div", { class: "col-12" }, [
                    h("skeleton-loader-vue", {
                        attrs: {
                            type: "rect",
                            animation: "fade",
                            width: 300,
                            height: 300,
                            rounded: true,
                        },
                        class: "custom-skeleton",
                    }),
                ]),
            ]),
        ]);
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars";

#details-skeleton-container {
    @include container;
    ::v-deep div.custom-skeleton {
        background-color: #f3f3f3 !important;
        width: 100% !important;
        & > div {
            width: 100% !important;
        }
    }
}
</style>
