<template>
	<div v-if="categories.length !== 0">
		<div class="categories">
			<div class="container">
				<div class="row">
					<div class="col-12 text-center">
						<h1 class="md-title mb-5">Categorias</h1>
					</div>
					<div v-for="c in categories" :key="c.category" class="col-xs-12 col-sm-12 col-md-4">
						<CategoryItem :category="c" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="categories-empty-state">
			<div class="empty-state-text">No hay categor&iacute;as disponibles :(</div>
			<div class="emtpy-state-subtext">Est&aacute;mos trabajando en ello.</div>
		</div>
	</div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Categories',
	components: { CategoryItem },
	async mounted() {
		this.unsetWhiteIcons()
		document.title = 'Illicit Óptica - Categorías'
		await this.getCategories()
	},
	computed: {
		...mapState('category', {
			categories: 'categories',
		}),
	},
	methods: {
		...mapActions('category', {
			getCategories: 'getCategories',
		}),
		...mapActions('background', {
			unsetWhiteIcons: 'unsetWhiteIcons',
		}),
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.categories-empty-state {
	height: 100vh;
	width: 100%;
	background: white;
	@include flex('column', 'center', 'center');
	.empty-state-text {
		color: #333;
		font-size: 1.7rem;
		text-align: center;
		padding: 0 20px;
		line-height: normal;
		@media #{$break-medium} {
			font-size: 2.2rem;
		}
	}
	.empty-state-subtext {
		color: #333;
		font-size: 1.2rem;
		text-align: center;
		padding: 0 20px;
		line-height: normal;
		@media #{$break-medium} {
			font-size: 1.7rem;
		}
	}
}

.categories {
	padding: 100px 0;
	background: #f7f7f7;
	h1 {
		font-size: 26px;
		text-transform: uppercase;
	}
}
</style>
