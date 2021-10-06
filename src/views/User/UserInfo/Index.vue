<template>
	<div class="user-info">
		<md-card class="user-info-card card mb-4">
			<md-card-header>
				<div class="md-title">Detalles de la cuenta</div>
			</md-card-header>
			<md-card-content>
				<AccountForm />
			</md-card-content>
		</md-card>
		<md-card class="card">
			<md-card-header>
				<div class="md-title">Direcciones de env&iacute;o</div>
			</md-card-header>
			<md-card-content>
				<Addresses />
			</md-card-content>
		</md-card>
	</div>
</template>

<script>
import Addresses from '@/views/User/Addresses/Index'
import AccountForm from './AccountForm'
export default {
	name: 'UserInfo',
	components: {
		Addresses,
		AccountForm,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
@include white_form;

.user-info {
	.card {
		margin: 0 auto;
		max-width: 900px;
	}
}
</style>
