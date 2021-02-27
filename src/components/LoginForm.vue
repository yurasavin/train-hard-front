<template>
    <v-card elevation="10" width="400" :loading="loading">
        <template slot="progress">
            <v-progress-linear
                color="info"
                height="10"
                indeterminate
                absolute
            ></v-progress-linear>
        </template>

        <v-card-title class="d-flex justify-center">Вход</v-card-title>

        <v-form v-model="formValid" @submit.prevent="login">
            <v-card-text>
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    required
                    label="Логин"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    required
                    label="Пароль"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-alert
                    :value="loginError"
                    text
                    type="error"
                    icon="mdi-do-not-disturb"
                    transition="scale-transition"
                >
                    Неправильные логин/пароль
                </v-alert>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    type="submit"
                    block
                    color="success"
                    :disabled="!formValid || loading"
                >
                    Войти
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: 'LoginForm',
    data: () => ({
        formValid: false,
        loading: false,
        username: '',
        usernameRules: [v => !!v || 'Введите логин'],
        password: '',
        passwordRules: [v => !!v || 'Введите пароль'],
        showPassword: false,
        loginError: false
    }),

    methods: {
        login() {
            let data = {
                username: this.username,
                password: this.password
            };
            this.$axios
                .post('auth/login/', data)
                .then(() => {
                    this.$emit('loginOk');
                })
                .catch(() => {
                    this.loginError = true;
                    setTimeout(() => (this.loginError = false), 5000);
                })
                .then(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped></style>
