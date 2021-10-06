<template>
	<div>
		<div class="payment-error">
			<div class="payment-error__title mb-4"><span>UPS!</span> Algo sali&iacute;o muy mal</div>
			<div class="payment-error__message mb-3"><span>C&oacute;digo:</span> {{ errorMessage }}</div>
			<div class="from-top fancy-button" @click="goBack">Volver</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'PaymentError',
	computed: {
		...mapState('order', {
			errorMessage: 'errorMessage',
		}),
	},
	methods: {
		...mapActions('order', {
			resetInfo: 'resetInfo',
		}),
		goBack() {
			this.resetInfo()
			this.$router.push({ name: 'Home' })
		},
	},
}
</script>

<style lang="scss" scoped>
.payment-error {
	box-shadow: inset 2px 0px 300px -121px rgba(0, 0, 0, 0.75);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	&__title {
		font-family: 'Poiret One', cursive;
		font-size: 35px;
		span {
			font-weight: bold;
		}
	}
	&__message {
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
		color: black;
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
			color: white;
			transition-delay: 0.5s;
		}
		&:hover:before {
			transition-delay: 0s;
		}

		&:hover:after {
			background: black;
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
			border: 1px solid black;
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
