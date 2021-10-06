<template>
	<div class="error">
		<div class="error-inner">
			<img src="@/assets/img/404_4.png" alt="" />
			<div class="error__title mb-4">¿Dónde estamos?</div>
			<div class="error__message mb-3">Parece que el contenido que est&aacute;s buscando no existe o no est&aacute; disponible</div>
			<div class="from-top fancy-button" @click="goToHome">Volver al inicio</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Error',
	mounted() {
		document.title = 'Illicit Óptica - Error'
	},
	methods: {
		goToHome() {
			this.$router.push({ name: 'Home' })
		},
	},
}
</script>

<style lang="scss" scoped>
.error {
	box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
	background: #111;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	&-inner {
		transform: translateY(-10%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	img {
		margin-bottom: 30px;
		width: 350px;
		height: auto;
	}
	&__title {
		color: white;
		font-family: 'Poiret One', cursive;
		font-size: 35px;
		span {
			font-weight: bold;
		}
	}
	&__message {
		color: white;
		font-family: 'Raleway', sans-serif;
		span {
			font-weight: bold;
		}
	}
	.fancy-button {
		position: relative;
		padding: 10px 25px;
		padding-right: 25px;
		font-size: 16px;
		color: white;
		letter-spacing: 0.3rem;
		text-transform: uppercase;
		transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);
		cursor: pointer;
		user-select: none;
		z-index: 99;
		&:before,
		&:after {
			content: '';
			position: absolute;
			transition: inherit;
			z-index: -1;
		}
		&:hover {
			color: black;
			transition-delay: 0.5s;
		}
		&:hover:before {
			transition-delay: 0s;
		}

		&:hover:after {
			background: white;
			transition-delay: 0.35s;
		}
		&:before,
		&:after {
			left: 0;
			height: 0;
			width: 100%;
		}

		&:before {
			bottom: 0;
			border: 1px solid white;
			border-top: 0;
			border-bottom: 0;
		}

		&:after {
			top: 0;
			height: 0;
		}

		&:hover:before,
		&:hover:after {
			height: 100%;
		}
	}
}
</style>
