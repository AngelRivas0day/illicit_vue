<template>
	<div>
		<div class="stories">
			<div class="stories--inner">
				<div class="stories__heading">
					<h1 class="md-title">Tus historias</h1>
					<button>
						<router-link to="/historias">Ver</router-link>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StoriesHome',
}
</script>

<style lang="scss">
@import '@/assets/css/_vars';

.stories {
	&--inner {
		height: 80vh !important;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		@media #{$break-medium} {
			height: 100vh;
		}
		.stories__heading {
			text-align: center;
			button {
				color: black;
			}
		}
	}
}
</style>
