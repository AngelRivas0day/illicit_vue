<template>
    <div class="home-page">
        <Banner />
        <Brands />
        <Products />
    </div>
</template>

<script>
import Banner from './Banner/Index'
import Products from './Products/Index'
import Brands from './Brands/Index'

export default {
    name: 'Home',
    components: {Banner,Products,Brands}
}
</script>

<style>

</style>