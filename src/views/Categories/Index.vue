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
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Categories',
    components:{CategoryItem},
    async mounted() {
        document.title = 'Illicit Óptica - Categorías'
        await this.getCategories()
        console.log('data: ', this.categories)
    },
    computed: {
        ...mapState('category',{
            categories: 'categories'
        })
    },
    methods: {
        ...mapActions('category',{
            getCategories: 'getCategories'
        })
    }
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
