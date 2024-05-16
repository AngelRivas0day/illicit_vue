<template>
	<div>
		<div class="categories">
			<div class="container">
				<div class="row">
					<div class="col-12 text-center">
						<h1 class="md-title mb-5">Categorias</h1>
					</div>
					<template v-if="loading">
						<div
							v-for="_ in [1,2,3]"
							:key="_"
							class="col-xs-12 col-sm-12 col-md-4"
						>
							<div class="mb-4">
								<skeleton-loader-vue
									type="circle"
									width="220"
									height="220"
								></skeleton-loader-vue>
								<skeleton-loader-vue
									class="mt-3"
									style="margin: 0 auto;"
									type="rect"
									width="120px"
									height="30px"
								></skeleton-loader-vue>
							</div>
						</div>
					</template>
					<template v-else>
						<div
							v-for="c in categories"
							:key="c.category"
							class="col-xs-12 col-sm-12 col-md-4"
						>
							<CategoryItem :category="c"/>
						</div>
					</template>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem'
import {Get} from "@/api/api";

export default {
	name: 'Categories',
	components: {CategoryItem},
	mounted() {
		this.fetchCategories();
	},
	data: () => ({
		categories: [],
		loading: false,
	}),
	methods: {
		async fetchCategories() {
			try {
				this.loading = true;
				const {data = []} = await Get({
					endpoint: 'categories',
					useToken: false,
				});
				this.categories = data;
				this.loading = false
			} catch (error) {
				this.loading = false
				this.$notify({
					title: 'Error',
					message: 'Ha ocurrido un error al obtener las categorías. Por favor, intenta más tarde.',
					type: 'error',
				});
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";

.categories {
	padding: 100px 0;
	background: #f7f7f7;

	h1 {
		font-size: 26px;
		text-transform: uppercase;
	}
}
</style>
