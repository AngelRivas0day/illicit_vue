<template>
    <div class="category-item">
        <img @click="goToCategory(category)" :src="category.img" alt="" class="item-image">
        <div @click="goToCategory(category)" class="item-label text-center">
            <div>{{category.label}}</div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'CategoryItem',
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    methods:{
        goToCategory({category}){
            this.$router.push({name: 'Products', params: {category: category}})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.category-item{
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    .item-image{
        cursor: pointer;
        border-radius: 100%;
        margin-bottom: 15px;
        width: 220px;
        height: 220px;
        object-fit: cover;
    }
    .item-label{
        cursor: pointer;
        font-size: 15px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
}
</style>