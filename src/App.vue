<template>
    <div id="app">
        <notifications class="mt-1" group="user" />
        <MainLayout />
    </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
export default {
    name: 'app',
    components: {MainLayout}
};
</script>

<style lang="scss">
#app {
    overflow-x: hidden;
    width: 100%;
}

</style>
