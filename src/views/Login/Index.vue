<script>
import AuthWrapper from "@/components/AuthWrapper.vue";

export default {
	name: "Login",
	components: {AuthWrapper},
	data: () => ({
	}),
	methods: {

	},
}
</script>

<template>
	<div>
		<auth-wrapper>
			<template v-slot:header>
				<div>

				</div>
			</template>
			<div>

			</div>
			<template v-slot:footer>
				<div>

				</div>
			</template>
		</auth-wrapper>
	</div>
</template>

<style scoped lang="scss">

</style>
