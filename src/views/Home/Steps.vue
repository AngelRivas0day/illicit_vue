<template>
	<div id="steps">
		<div class="container">
			<div class="row">
				<div class="col-12 text-center steps-title">
					<h2 class="md-title">C&oacute;mpralos en 4 simples pasos</h2>
				</div>
				<template v-for="step of steps">
					<div :key="step.id" class="col-xs-12 col-sm-12 col-md-3" id="step_1">
						<div class="step-container" :class="{ active: step.hover }">
							<div class="step-icon" @mouseover="toggleClass(step.id, 'mouseover')" @mouseleave="toggleClass(step.id, 'mouseleave')">
								<img :class="step.size" alt="Custom icon for purchase steps" :src="step.icon">
							</div>
							<div class="step-info">
								{{ step.label }}
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Steps',
	data: () => ({
		steps: [
			{ id: 1, icon: require('@/assets/img/icons/pick_eyewear.png'), label: 'Elige tu lente y modelo', hover: false, size: 'normal' },
			{ id: 2, icon: require('@/assets/img/icons/custom_eyewear.png'), label: 'Personaliza tus lentes', hover: false, size: 'normal' },
			{ id: 3, icon: require('@/assets/img/icons/photos.png'), label: 'Sube tu graduación', hover: false, size: 'small' },
			{ id: 4, icon: require('@/assets/img/icons/package.png'), label: 'Recíbelos en casa', hover: false, size: 'small' },
		]
	}),
	methods: {
		toggleClass(itemId, type = 'mouseover') {
			console.log('Item id: ', itemId)
			let stepIndex = this.steps.findIndex(i => i.id == itemId)
			if (stepIndex != -1) {
					this.steps[stepIndex].hover = type == 'mouseover' ? true : false
			}

		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

#steps {
	padding: 50px 0 0 0;
	.steps-title {
		margin-bottom: 30px;
		h2 {
			font-size: 28px;
		}
	}
	#step_1, #step_2, #step_3, #step_4 {
		text-align: center;
		.step-container {
			text-align: center;
			position: relative;
			&.active {
				.step-info {
					transform: translateY(-50%);
					opacity: 1;
				}
			}
			.step-icon {
				width: 100px;
				border-radius: 100%;
				height: 100px;
				margin: 0 auto 15px auto;
				position: relative;
				z-index: 10;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer !important;
				.material-icons-outlined {
					width: 50px;
					font-size: 50px !important;
					height: 50px;
				}
				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
					&.small {
						width: 100%;
						height: 100%;
						max-width: 70px;	
						max-height: 70px;	
					}
				}
			}
			.step-info {
				position: relative;
				z-index: 5;
				transition: all .3s ease-in-out;
				opacity: 0;
				transform: translateY(-300%);
				font-size: 18px !important;
			}
		}
	}
}
</style>