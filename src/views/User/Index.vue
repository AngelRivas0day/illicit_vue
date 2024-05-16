<template>
    <div id="profile" class="container">
		<div class="row">
			<div class="col-12">
				<md-tabs md-alignment="centered">
					<md-tab id="profile-settings" md-label="Perfil">
						<settings></settings>
						<update-password></update-password>
					</md-tab>
					<md-tab id="profile-addresses" md-label="Direcciones de envío">
						<addresses></addresses>
					</md-tab>
					<md-tab id="profile-history" md-label="Compras">
						<history></history>
					</md-tab>
				</md-tabs>
			</div>
		</div>
    </div>
</template>

<script>
import Settings from "@/views/User/Settings.vue";
import History from "@/views/User/History.vue";
import Addresses from "@/views/User/Addresses.vue";
import UpdatePassword from "@/views/User/UpdatePassword.vue";

export default {
    name: 'User',
	components: {
		Settings,
		History,
		Addresses,
		UpdatePassword,
	},
}
</script>

<style lang="scss" scoped>
#profile {
	margin-top: 60px;
	min-height: calc(100vH - 288px);
}
</style>
