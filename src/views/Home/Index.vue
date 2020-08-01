<template>
    <div class="home-page">
        <Banner />
        <Products />
    </div>
</template>

<script>
import Banner from './Banner/Index'
import Products from './Products/Index'

export default {
    name: 'Home',
    components: {Banner,Products}
}
</script>

<style>

</style>