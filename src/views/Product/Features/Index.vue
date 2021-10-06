<template>
	<div class="features">
		<div class="features-interactive">
			<img src="@/assets/img/glass.png" alt="" />
		</div>
		<div class="features-content">
			<div class="features-content--inner">
				<div class="row">
					<div class="col-12">Title</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Features',
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.features {
	height: 100vh;
	@include flex('column', 'center', 'center');
	@media #{$break-medium} {
		@include flex('row', 'stretch', 'center');
		&-interactive {
			flex: 1;
		}
		&-content {
			flex: 1;
			background: #222;
			box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
		}
	}
}
</style>
