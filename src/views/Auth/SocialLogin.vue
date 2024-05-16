<template>
    <div class="row w-100 mx-auto mt-3">
        <div class="col-12 text-center">
            <hr class="mb-4">
            <md-button @click="loginWithGoogle" class="md-raised md-dense md-custom-button google">
                <md-icon class="md-custom-icon" md-src="src/assets/img/v2/google_logo.svg"/>
                <span>Inicia sesi&oacute;n con Google</span>
            </md-button>
        </div>
    </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Post } from '@/api/api';

export default {
    name: 'SocialLogin',
    methods: {
		async loginWithGoogle() {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();
			const result = await signInWithPopup(auth, provider);
			console.log({
				result,
			})
			const user = result.user;
			// Create the client in the database to store the additional information
			await Post({
				endpoint: 'clients',
				data: {
					name: user.displayName,
					email: user.email,
					// Add any other user information you want to store
				},
				useToken: true,
			});
		},
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.md-custom-button{
    min-width: 230px;
    height: 45px;
    .md-custom-icon{
        display: inline-flex !important;
        margin-right: 10px;
    }
    span{
        font-weight: 200;
    }
}
</style>
