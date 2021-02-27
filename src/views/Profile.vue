<template>
    <v-card elevation="10" class="mx-auto" max-width="500">
        <template slot="progress">
            <v-progress-linear
                color="info"
                height="10"
                indeterminate
                absolute
            ></v-progress-linear>
        </template>

        <v-card-title class="d-flex justify-center">Профиль</v-card-title>

        <v-card-text>
            a b c
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Profile'
};
</script>

<style scoped></style>
