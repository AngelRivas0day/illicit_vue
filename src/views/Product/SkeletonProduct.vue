<template>
	<div>
		<div>
			<div class="main-block">
				<div class="main-block__info">
					<div class="info__body">
						<div class="d-flex flex-row justify-content-between align-items-center">
							<div class="mb-2">
								<h1 class="info__title mb-2">
									<skeleton-loader-vue type="rect" :width="300" :height="45" animation="fade" />
								</h1>
								<span class="text-muted">
									<skeleton-loader-vue type="rect" :width="200" :height="25" animation="fade" />
								</span>
							</div>
						</div>
						<span class="info__price mb-4">
							<skeleton-loader-vue type="rect" :width="80" :height="20" animation="fade" />
						</span>
						<p class="info__desc">
							<skeleton-loader-vue class="mb-2" type="rect" :width="300" :height="20" animation="fade" />
							<skeleton-loader-vue type="rect" :width="100" :height="20" animation="fade" />
						</p>
					</div>
					<div class="info__actions">
						<skeleton-loader-vue type="rect" :width="100" :height="40" animation="fade" />
					</div>
				</div>
				<div class="main-block__image">
					<skeleton-loader-vue class="full-skeleton" type="rect" :width="500" :height="500" animation="fade" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'SkeletonProduct',
	computed: {
		...mapState('product', {
			isLoading: 'isLoading',
		}),
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.full-skeleton {
	::v-deep .loader {
		width: 50vw !important;
		height: 100vh !important;
	}
}
.main-block {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	&__info {
		flex: -1;
		order: -1; // this is meant to make the mobile layout order
		@include flex('column', 'flex-start', 'flex-end');
		width: 100%;
		height: 50vh;
		box-sizing: border-box;
		padding: 15px;
		.info__body {
			// .info__title{

			// }
			.md-fav {
				&.is-fav {
					color: red !important;
				}
				&.not-fav {
					color: rgba(33, 33, 33, 0.3) !important;
				}
			}
			.info__price {
				display: flex;
				flex-direction: row;
				div {
					margin-right: 10px;
				}
			}
			.info__colors-selector {
				list-style: none;
				padding: 0;
				margin: 15px 0;
				display: flex;
				flex-direction: row;
				li {
					width: 14px;
					height: 14px;
					border-radius: 100%;
					margin-right: 8px;
					cursor: pointer;
				}
			}
			// .info__desc{

			// }
		}
		.info__actions {
			.info__buy {
				@include small-button('black', 'white', 'black');
			}
		}
		@media #{$break-medium} {
			order: -2;
			width: 50%;
			height: 100vh;
			.info__actions {
				margin-bottom: 50px !important;
				// .info__buy{
				// }
			}
		}
	}
	&__image {
		position: relative;
		height: 50vh;
		width: 100%;
		@media #{$break-medium} {
			order: initial;
			height: 100vh;
			width: 50%;
			order: inherit;
		}
	}
}
</style>
