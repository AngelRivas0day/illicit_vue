<template>
	<div class="faq">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<md-empty-state
						v-if="faqs.length == 0"
						md-icon="help_outline"
						md-label="Por el momento no hay contenido aquí"
						md-description="Estamos trabajando en ello">
					</md-empty-state>
					<template v-else>
						<div class="faq-title md-title w-100 mb-5 text-center">
							FAQ
						</div>
						<md-list :md-expand-single="false">
							<template v-for="faq in faqs">
								<md-list-item :key="faq.id" md-expand>
									<span class="md-list-item-text">{{ faq.question }}</span>
									<div slot="md-expand">
										<div class="faq-answer">
											{{ faq.answer }}
										</div>
									</div>
								</md-list-item>
							</template>
						</md-list>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Faq',
	async mounted() {
		await this.getData()
	},
	methods: {
		...mapActions('faq', {
			getData: 'getFaqs',
		}),
	},
	computed: {
		...mapState('faq', {
			faqs: 'faqs',
			error: 'error',
		})
	}
}
</script>

<style lang="scss" scoped>
.faq {
	height: 100vH;
	display: flex;
	justify-content: center;
	align-items: center;
	&-title {
		font-size: 22px !important;
	}
	&-answer {
		padding: 20px;
		font-size: 16px;
	}
	.md-list-item-text {
		font-size: 18px !important;
		font-weight: 400 !important;
	}
}
</style>
