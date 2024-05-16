<script>
export default {
	name: "RequestErrorMessage",
	props: {
		message: {
			type: String,
			required: false,
		},
	},
	methods: {
		onClose() {
			console.log('closed');
			this.$emit('closed-message');
		}
	}
}
</script>

<template>
	<div class="error-message-wrapper">
		<div class="error-message">
			<md-icon class="mr-1">error</md-icon>
			<span>{{ message }}</span>
		</div>
		<div class="error-message-close">
			<md-button class="md-icon-button" @click="onClose">
				<md-icon>close</md-icon>
			</md-button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.error-message-wrapper {
	background-color: rgb(241, 105, 67);
	color: white;
	padding: 10px;
	border-radius: 5px;
	margin-top: 10px;
	text-align: center;
	font-size: 14px;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.close-button {
		cursor: pointer;
	}
}
</style>
