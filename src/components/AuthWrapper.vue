<script>
export default {
	name: "AuthWrapper",
}
</script>

<template>
	<div class="auth">
		<div class="auth__form">
			<div class="auth__form__header">
				<slot name="header"></slot>
			</div>
			<slot></slot>
			<div class="auth__form__footer">
				<slot name="footer"></slot>
			</div>
		</div>
		<div v-responsive.lg.xl class="auth__image">
			<div class="image__logo"></div>
			<img src="@/assets/img/login_bg.jpg" alt="">
		</div>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/css/_vars';
.auth{
	background: #dadada;
	.auth__form{
		flex: 1;
	}
	&__image{
		flex: 1;
	}
	@media #{$break-medium}{
		min-height: 100vH;
		@include flex("row","stretch","center");
		&__image{
			position: relative;
			.image__logo{
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: rgba(255,255,255,.6);
			}
			img{
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
