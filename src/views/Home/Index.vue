<template>
    <div class="home-page">
        <Banner />
        <Brands />
        <Products />
        <Categories />
        <Contact />
    </div>
</template>

<script>
import Banner from './Banner'
import Products from './Products'
import Brands from './Brands'
import Categories from './Categories'
import Contact from './Contact'

export default {
    name: 'Home',
    components: {Banner,Products,Brands,Categories,Contact},
    mounted() {
        document.title = 'Illicit Óptica - Inicio'
    }
}
</script>

<style>

</style>
