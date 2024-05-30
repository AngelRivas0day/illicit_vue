<script>
export default {
    name: "ResumeeSkeleton",
    functional: true,
    render(h) {
        const loaders = [
            {
                type: "rect",
                width: "100px",
                height: "100px",
                animation: "fade",
                class: "ml-3 mt-4 mb-4",
            },
            {
                type: "rect",
                width: "200px",
                height: "23px",
                animation: "fade",
                class: "ml-3 mb-2",
            },
            {
                type: "rect",
                width: "220px",
                height: "23px",
                animation: "fade",
                class: "ml-3 mb-2",
            },
            {
                type: "rect",
                width: "250px",
                height: "23px",
                animation: "fade",
                class: "ml-3 mb-2",
            },
            {
                type: "rect",
                width: "190px",
                height: "23px",
                animation: "fade",
                class: "ml-3 mb-2",
            },
        ];

        return h(
            "div",
            loaders.map((loader, index) => {
                return h("skeleton-loader-vue", {
                    key: index,
                    props: {
                        type: loader.type,
                        width: loader.width,
                        height: loader.height,
                        animation: loader.animation,
                    },
                    class: loader.class,
                });
            }),
        );
    },
};
</script>
