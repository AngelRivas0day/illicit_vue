<template>
	<div class="category-item">
		<img @click="goToCategory(category)" :src="category.image" alt="" class="item-image" />
		<div @click="goToCategory(category)" class="item-label text-center">
			<div>{{ category.name }}</div>
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
		},
	},
	methods: {
		goToCategory({ name }) {
			name = name.toLowerCase()
			this.$router.push({ name: 'Products', params: { category: name } })
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.category-item {
	width: 220px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 20px auto;
	.item-image {
		cursor: pointer;
		border-radius: 100%;
		margin-bottom: 15px;
		width: 220px;
		height: 220px;
		object-fit: cover;
	}
	.item-label {
		cursor: pointer;
		font-size: 15px;
		letter-spacing: 1px;
		text-transform: uppercase;
	}
}
</style>
