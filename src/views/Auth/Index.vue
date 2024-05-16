<template>
    <div class="auth">
        <div class="auth__form">
			<component @clicked="changeComponent" :is="activeComponent"/>
        </div>
        <div v-responsive.lg.xl class="auth__image">
            <div class="image__logo"></div>
            <img src="@/assets/img/login_bg.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Auth',
    components: {
        Login: () => import(/* webpackChunkName: "LoginComponent" */'./Login/Index'),
        Register: () => import(/* webpackChunkName: "RegisterComponent" */'./Register/Index')
    },
	data: () => ({
		activeComponent: 'Login'
	}),
    methods: {
		/**
		 * @description
		 * The `changeComponent` is a method that switches the active component to the component string
		 * passed as an argument. By changing the string value of the activeComponent, the component will be
		 * re-rendered and displayed to the user.
		 *
		 * The values it expects are 'Login' or 'Register'. The method will set the activeComponent to the
		 * component string passed as an argument. If the component string is not equal to either 'Login' or 'Register',
		 * then the activeComponent will be set to 'Login'.
		 *
		 * The method is called when the user clicks on either the 'Login' or 'Register' button.
		 * @param {String} component
		 */
        changeComponent(component) {
			// If the component string is not equal to either 'Login' or 'Register', then set the activeComponent to 'Login'
			// Otherwise, set the activeComponent to the component string.
			this.activeComponent = component !== 'Login' && component !== 'Register' ?
				'Login' :
				component;
        }
    }
}
</script>
