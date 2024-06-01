<template>
    <div class="verify-email-container">
        <h1>¡Hola, {{ userName }}!</h1>
        <p>
            Se ha enviado un correo de verificación a
            <strong>{{ userEmail }}</strong
            >. Por favor, verifica tu correo para poder acceder a tu cuenta.
        </p>
        <md-button
            @click="$router.push({ name: 'Login' })"
            class="md-raised md-primary md-dense d-block mx-auto"
        >
            Iniciar sesión
        </md-button>
    </div>
</template>

<script>
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";

export default {
    name: "RegisterWelcome",
    data: () => ({
        userName: null,
        userEmail: null,
        errorMessage: null,
    }),
    async mounted() {
        const user = getAuth().currentUser;
        if (!user) {
            this.$router.push({ name: "Login" });
            return;
        }
        this.userName = user.displayName;
        this.userEmail = user.email;
        if (!user.emailVerified) await sendEmailVerification(user);
        const auth = getAuth();
        await signOut(auth);
    },
};
</script>

<style lang="scss" scoped>
.verify-email-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        text-align: center;
    }
    p {
        font-size: 1.5rem;
        text-align: center;
        margin-left: 1rem;
        margin-right: 1rem;
        line-height: 1.5;
    }
}
</style>
