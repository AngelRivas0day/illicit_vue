<template>
    <div class="user-history">
        <md-card class="user-history-card card mb-4">
            <md-card-header>
                <div class="md-title">Historial de compras</div>
            </md-card-header>
            <md-card-content>
                <OrdersList />
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
    name: 'UserHistory',
    components: {
        OrdersList: () => import('./OrdersList.vue')
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
@include white_form;

.user-history {
    .card {
        margin: 0 auto;
        max-width: 900px;
    }
}
</style>