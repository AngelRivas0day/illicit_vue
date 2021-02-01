<template>
    <div class="categories">
        <div class="container">
            <div class="row">
                <div 
                v-for="c in categories"
                :key="c.category"
                class="col-xs-12 col-sm-12 col-md-4">
                    <CategoryItem :category="c" />
                </div>
                <div class="col-12 text-center mt-4">
                    <button @click="seeMore" class="see-more">
                        <span>ver todos</span>
                    </button>
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
    data: ()=>({
        categories: [
            {category: 'ellos', label: 'Ellos', img: 'http://via.placeholder.com/200x200'},
            {category: 'ellas', label: 'Ellas', img: 'http://via.placeholder.com/200x200'},
            {category: 'solares', label: 'Solares', img: 'http://via.placeholder.com/200x200'},
        ]
    }),
    methods: {
        seeMore(){ this.$router.push({name: 'ProductCategories'}) }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
.categories{
    background: #fff;
    padding: 80px 0;
    .see-more{
        @include call-to-action-2(black);
    }
}
</style>