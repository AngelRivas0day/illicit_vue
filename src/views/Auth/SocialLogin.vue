<template>
	<div class="row w-100 mx-auto mt-3">
		<div class="col-12 text-center">
			<hr class="mb-4" />
			<md-button @click="googleLogin" class="md-raised md-dense md-custom-button google">
				<md-icon class="md-custom-icon" md-src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
				<span>Inicia sesi&oacute;n con Google</span>
			</md-button>
		</div>
		<div class="col-12 text-center">
			<md-button @click="facebookLogin" class="md-raised md-dense md-custom-button facebook">
				<md-icon class="md-size-1x md-custom-icon">facebook</md-icon>
				<span>Inicia sesi&oacute;n con Facebook</span>
			</md-button>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'SocialLogin',
	methods: {
		...mapActions('user', {
			googleLogin: 'googleLogin',
			facebookLogin: 'facebookLogin',
		}),
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.md-custom-button {
	min-width: 230px;
	height: 45px;
	.md-custom-icon {
		display: inline-flex !important;
		margin-right: 10px;
	}
	&.facebook {
		background: #3d5a96 !important;
		.md-custom-icon {
			color: white;
		}
		span {
			color: white;
		}
	}
	span {
		font-weight: 200;
	}
}
</style>
