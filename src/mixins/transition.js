export default {
    data: () => ({
        isTransitioning: false,
    }),
    methods: {
        transition(callback = () => ({})) {
            this.isTransitioning = !this.isTransitioning;
            setTimeout(
                function () {
                    this.isTransitioning = !this.isTransitioning;
                    callback();
                }.bind(this),
                800,
            );
        },
    },
};
