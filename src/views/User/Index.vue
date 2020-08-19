<template>
    <div class="profile">
        <TopNav />
        <Tabs />
    </div>
</template>

<script>
import Tabs from './Tabs'
import { mapActions } from 'vuex'
export default {
    name: 'User',
    methods: {
        ...mapActions('background',{
            setWhiteIcons: 'setWhiteIcons',
            unsetWhiteIcons: 'unsetWhiteIcons'
        }),
    },
    mounted() {
        if(!localStorage.getItem('token')){
            this.$router.push({name:'Auth'})
        }
        this.setWhiteIcons()
    },
    destroyed(){
        this.setWhiteIcons()
    },
    components: {
        TopNav: () => import('./TopNav/Index'),
        Tabs
    }
}
</script>

<style>

</style>