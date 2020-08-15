<template>
    <div class="favorites">
        <md-list>
            <template v-if="favorites.length > 0">
                <md-list-item v-for="p in favorites" :key="p.id">
                    <span class="md-list-item-text">{{ p.name }}</span>
                    <md-button @click="deleteFavorite({id: p.id, name: p.name})" class="md-icon-button md-list-action">
                        <md-icon class="md-primary">favorite</md-icon>
                    </md-button>
                </md-list-item>
            </template>
            <template v-else>
                <md-list-item>
                    <span class="md-list-item-text">No tienes productos aqu&iacute; :(</span>
                </md-list-item>
            </template>
        </md-list>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Favs',
    computed: {
        ...mapState('favorites',{
            favorites: 'favorites'
        })
    },
    mounted(){
        this.getFavorites()
    },
    methods: {
        ...mapActions('favorites',{
            getFavorites: 'getFavorites',
            deleteFavorite: 'deleteFavorite'
        })
    }
}
</script>

<style lang="scss" scoped>

</style>