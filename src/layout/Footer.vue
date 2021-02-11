<template>
    <v-footer padless>
        <v-card width="100%" class="text-center" color="primary">
            <v-card-text> Train hard © 2020 - {{ currentYear }} </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
};
</script>

<style scoped></style>
