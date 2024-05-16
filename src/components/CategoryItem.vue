<template>
    <div class="category-item">
        <img
			@click="$router.push({name: 'Products', query: { category_id: category.id }})"
			:src="category.image"
			:alt="'Imagen de la categoría de lentes' + category.name"
			class="item-image"
		>
        <div
			@click="$router.push({name: 'Products', query: { category_id: category.id }})"
			class="item-label text-center"
		>
            <div>{{category.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        category: {
            type: Object,
            required: true,
        }
    },
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
		transition: transform 0.3s, box-shadow 0.3s;
		&:hover {
			transform: scale(1.03);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);
		}
    }
    .item-label{
        cursor: pointer;
        font-size: 15px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
}
</style>
