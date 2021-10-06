<template>
	<div>
		<hr />
		<md-dialog :md-active.sync="showDialog">
			<md-dialog-title>Para tomar las medidas de tu rostro</md-dialog-title>
			<!-- <div class="md-dialog-content"> -->
			<Measures />
			<!-- </div> -->
			<md-dialog-actions>
				<md-button @click="showDialog = false" class="md-raised md-dense">Cerrar</md-button>
			</md-dialog-actions>
		</md-dialog>
		<div class="face-measure">
			<p>¿C&oacute;mo tomar medidas de tu cara?</p>
			<md-button @click="showDialog = true" class="md-raised md-dense md-primary">Ver más</md-button>
		</div>
	</div>
</template>

<script>
import Measures from './Measures'

export default {
	name: 'FaceMeasure',
	components: { Measures },
	data: () => ({
		showDialog: false,
	}),
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.face-measure {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 300px;
	p {
		text-align: center;
		font-size: 18px;
		margin: 0 0 20px 0;
		padding: 0;
		@media #{$break-medium} {
			font-size: 20px;
		}
	}
	.md-primary {
		margin: 0;
	}
}
</style>
