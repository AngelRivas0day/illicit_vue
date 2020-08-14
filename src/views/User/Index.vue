<template>
    <div class="profile">
        <TopNav />
        <Tabs />
    </div>
</template>

<script>
import Tabs from './Tabs'
export default {
    name: 'User',
    components: {
        TopNav: () => import('./TopNav/Index'),
        Tabs
    },
}
</script>

<style>

</style>