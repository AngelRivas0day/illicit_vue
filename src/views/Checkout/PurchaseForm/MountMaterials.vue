<template>
	<div>
		<div class="mount-materials-step">
			<div class="container-fluid">
				<div class="row no-gutters">
					<template v-for="m in displayedMaterials">
						<div :key="m.label" class="col-12 mb-1">
							<div class="material d-flex flex-column text-white">
								<div class="material-label mb-2 md-font">{{ m.label }}</div>
								<div class="material-text">{{ m.text }}</div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'MountMaterials',
	data: () => ({
		materials: [
			{
				value: 'Titanio',
				label: 'Titanio1',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
			{
				value: 'Acero',
				label: 'Acero',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
			{
				value: 'Aluminio',
				label: 'Aluminio',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
			{
				value: 'Pasta',
				label: 'Pasta',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
			{
				value: 'Acetato',
				label: 'Acetato',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
			{
				value: 'Otros',
				label: 'Acetato',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
			},
		],
		displayedMaterials: [],
	}),
	mounted() {
		this.renderMaterials()
	},
	computed: {
		...mapState('product', {
			glass: 'glass',
		}),
	},
	methods: {
		renderMaterials() {
			this.displayedMaterials = this.materials.filter(({ value }) => this.glass.frameMaterial.includes(value))
		},
	},
}
</script>

<style lang="scss" scoped>
.mount-materials-step {
	.material {
		max-width: 500px;
		margin: 16px 16px 16px 0;
		&-label {
			font-size: 18px;
		}
		&-text {
			font-size: 16px;
			line-height: 1.4em;
		}
	}
}
</style>
