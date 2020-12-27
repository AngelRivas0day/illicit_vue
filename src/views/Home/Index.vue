<template>
    <div class="home-page">
        <Banner />
        <Brands />
        <Products />
        <Stories />
    </div>
</template>

<script>
import Banner from './Banner/Index'
import Products from './Products/Index'
import Brands from './Brands/Index'
import Stories from './Stories/Index'

export default {
    name: 'Home',
    components: {Banner,Products,Brands,Stories}
}
</script>

<style>

</style>