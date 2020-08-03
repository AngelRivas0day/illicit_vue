<template>
    <div class="favorites">
        <md-list>
            <md-list-item v-for="p in products" :key="p.id">
                <span class="md-list-item-text">{{ p.name }}</span>
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">favorite</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: 'Favs',
    data: () => ({
        products: [
            {
                id: 1,
                name: 'Rodia Raskolnikov'
            },
            {
                id: 2,
                name: 'Rasumikin Petrovno'
            }
        ]
    })
}
</script>

<style lang="scss" scoped>

</style>