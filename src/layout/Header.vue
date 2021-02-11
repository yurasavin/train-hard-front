<template>
    <v-app-bar color="primary" app>
        <v-app-bar-nav-icon
            absolute
            @click.stop="setShowDrawer(!showDrawer)"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="mx-auto px-0">Train Hard</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Header',
    data() {
        return {
            drawer: false
        };
    },
    computed: {
        ...mapState('layout', {
            showDrawer: state => state.showDrawer
        })
    },
    methods: {
        ...mapActions('layout', ['setShowDrawer'])
    }
};
</script>

<style scoped></style>
