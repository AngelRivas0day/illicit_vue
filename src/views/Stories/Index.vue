<template>
	<div>
		<div @wheel.prevent="handleWheel" id="stories">
			<div class="stories__black-card">
				<div class="black-card__heading">
					<h1 class="md-title">Tus historias</h1>
					<p>Lorem ipsum dolor sit amet consectetur<br />adipisicing elit. Molestias, esse!</p>
				</div>
			</div>
			<div class="stories__list">
				<img v-for="img in [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]" :key="img" src="https://via.placeholder.com/200x150" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Stories',
	methods: {
		handleWheel(event) {
			if (!event.deltaY) {
				return
			}
			event.currentTarget.scrollLeft += event.deltaY + event.deltaX
		},
	},
}
</script>

<style lang="scss">
@import '@/assets/css/_vars';

#stories {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	overflow-x: scroll;
	scroll-behavior: smooth;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none;
	}
	.stories__black-card {
		height: 100vh;
		min-width: 100%;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		background: #222222;
		padding: 20px;
		@media #{$break-medium} {
			min-width: 50%;
			width: 50%;
		}
		.black-card__heading {
			h1,
			p {
				color: #dadada;
			}
			p {
				margin-bottom: 0px;
			}
		}
	}
	.stories__list {
		background: burlywood;
		height: 100vh;
		min-width: 2000px;
		display: flex;
		flex-direction: column;
		flex-flow: wrap;
		img {
			width: auto;
			height: calc(100vh / 3) !important;
		}
	}
}
</style>
