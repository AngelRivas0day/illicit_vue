<script>
import {getAuth} from "firebase/auth";

export default {
	name: "NavbarAccount",
	props: {
		whiteIcons: {
			type: Boolean,
			required: false,
			default: false,
		},
		isLoggedIn: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data: () => ({
		loggedInOptions: [],
		loggedOutOptions: [],
	}),
	computed: {
		activeOptions() {
			return this.isLoggedIn ? this.loggedInOptions : this.loggedOutOptions;
		},
	},
	mounted() {
		this.initializeOptions();
	},
	methods: {
		initializeOptions() {
			this.loggedInOptions = [
				{
					id: 1,
					label: "Mi cuenta",
					icon: "account_circle",
					handler: () => this.$router.push({name: 'Account'}),
				},
				{
					id: 2,
					label: "Cerrar sesión",
					icon: "exit_to_app",
					handler: () => {
						const auth = getAuth();
						auth.signOut();
						this.$router.push({name: 'Login'});
					},
				}
			];
			this.loggedOutOptions = [
				{
					id: 1,
					label: "Iniciar sesión",
					icon: "login",
					handler: () => this.$router.push({name: 'Login'}),
				},
				{
					id: 2,
					label: "Registrarse",
					icon: "person_add",
					handler: () => this.$router.push({name: 'Register'}),
				},
			];
		},
	},
}
</script>

<template>
	<md-menu md-align-trigger>
		<md-button md-menu-trigger class="mb-0 md-icon-button md-dense">
			<md-icon :style="{ color: whiteIcons ? 'white' : '#333333' }">face</md-icon>
		</md-button>
		<md-menu-content>
			<md-menu-item
				v-for="option in activeOptions"
				:key="option.id"
				@click="option.handler"
			>
				<md-icon v-if="option.icon">{{ option.icon }}</md-icon>
				{{ option.label }}
			</md-menu-item>
		</md-menu-content>
	</md-menu>
</template>
