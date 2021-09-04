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
    mounted() {
        document.title = 'Illicit Óptica - Categorías'
    },
    data: () => ({
        categories: [
            {category: 'ellos', label: 'Ellos', img: 'https://source.unsplash.com/200x200/?glasses,male'},
            {category: 'ellas', label: 'Ellas', img: 'https://source.unsplash.com/200x200/?glasses,female'},
            {category: 'solares', label: 'solares', img: 'https://source.unsplash.com/200x200/?glasses,solar'},
            {category: 'unisex', label: 'unisex', img: 'https://source.unsplash.com/200x200/?glasses'},
            {category: 'deportivo', label: 'deportivo', img: 'https://source.unsplash.com/200x200/?glasses,sports'},
            {category: 'infantil', label: 'infantil', img: 'https://source.unsplash.com/200x200/?glasses,child'},
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
