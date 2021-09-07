<template>
    <div class="home-page">
        <Banner />
        <Brands />
        <Products />
        <Categories />
        <Offers/>
        <Contact />
    </div>
</template>

<script>
import Banner from './Banner'
import Products from './Products'
import Brands from './Brands'
import Categories from './Categories'
import Contact from './Contact'
import Offers from './Offers'

export default {
    name: 'Home',
    components: {Banner,Products,Brands,Categories,Contact,Offers},
    mounted() {
        document.title = 'Illicit Óptica - Inicio'
    }
}
</script>

<style lang="scss">
.home-page {
    background: #f7f7f7;
}
</style>
