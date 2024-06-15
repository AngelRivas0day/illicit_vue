<script>
export default {
    name: "FAQ",
    async mounted() {
        await this.fetchFaq();
    },
    data: () => ({
        faqItems: [],
        loading: false,
    }),
    methods: {
        async fetchFaq() {},
    },
};
</script>

<template>
    <div id="faq-questions">
        <div v-if="loading" class="row">
            <div class="col-12">Cargando...</div>
        </div>
        <div v-else class="row">
            <div v-for="question in faqItems" class="col-12"></div>
        </div>
    </div>
</template>
