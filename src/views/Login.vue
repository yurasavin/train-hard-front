<template>
    <v-container
        id="container-login"
        class="d-flex flex-column justify-center align-center"
    >
        <login-form @loginOk="onLogin" />
    </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
export default {
    name: 'Login',
    components: { LoginForm },
    methods: {
        onLogin() {
            this.$router.push({ name: 'home' });
        }
    }
};
</script>

<style scoped>
#container-login {
    height: 100%;
}
</style>
