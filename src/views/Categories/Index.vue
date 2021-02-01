<template>
    <div>
        <div class="categories">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1 class="md-title mb-5">Categorias</h1>
                    </div>
                    <div 
                    v-for="c in categories"
                    :key="c.category"
                    class="col-xs-12 col-sm-12 col-md-4">
                        <CategoryItem :category="c" />
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem'

export default {
    name: 'Categories',
    components:{CategoryItem},
    data: () => ({
        categories: [
            {category: 'ellos', label: 'Ellos', img: 'http://via.placeholder.com/200x200'},
            {category: 'ellas', label: 'Ellas', img: 'http://via.placeholder.com/200x200'},
            {category: 'solares', label: 'solares', img: 'http://via.placeholder.com/200x200'},
            {category: 'unisex', label: 'unisex', img: 'http://via.placeholder.com/200x200'},
            {category: 'deportivo', label: 'deportivo', img: 'http://via.placeholder.com/200x200'},
            {category: 'infantil', label: 'infantil', img: 'http://via.placeholder.com/200x200'},
        ]
    }),
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
.categories{
    padding: 100px 0;
    background: #f7f7f7;
    h1{
        font-size: 26px;
        text-transform: uppercase;
    }
}
</style>