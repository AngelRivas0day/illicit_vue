<template>
    <md-button
        @click="signInWithGoogleProvider"
        class="md-raised md-dense md-custom-button google"
    >
        <md-icon
            class="md-custom-icon"
            :md-src="require('@/assets/img/v2/google_logo.svg')"
        />
        <span>Inicia sesi&oacute;n con Google</span>
    </md-button>
</template>

<script>
import { Post } from "@/services/api";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default {
    name: "SocialLogin",
    methods: {
        async signInWithGoogleProvider() {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const [name, last_name] = user.displayName.split(" ");
                await Post({
                    endpoint: "clients",
                    data: {
                        name,
                        last_name,
                        phone_number: user.phoneNumber,
                        birth_day: null,
                    },
                    useToken: true,
                });
                this.$router.push({ name: "Account" });
            } catch (error) {
                await signOut(auth);
                this.$notify({
                    group: "user",
                    type: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        error.message ||
                        "Ocurrió un error al iniciar sesión con Google. Por favor, intenta de nuevo.",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_vars";
.md-custom-button {
    min-width: 230px;
    height: 45px;
    .md-custom-icon {
        display: inline-flex !important;
        margin-right: 10px;
    }
    span {
        font-weight: 200;
    }
}
</style>
