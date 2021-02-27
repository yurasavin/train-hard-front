<template>
    <v-app>
        <AppHeader />

        <v-main>
            <SideNavigation />
            <v-container fluid>
                <transition name="fade">
                    <router-view />
                </transition>
            </v-container>
        </v-main>

        <AppFooter />
    </v-app>
</template>

<script>
import AppHeader from './Header.vue';
import AppFooter from './Footer.vue';
import SideNavigation from './SideNavigation.vue';

export default {
    name: 'AppLayout',
    components: {
        AppHeader,
        AppFooter,
        SideNavigation
    }
};
</script>

<style>
/* TODO remove .btn-fix when vuetify fix highlight fab button after click */
.btn-fix:focus::before {
    opacity: 0 !important;
}

.big-letters {
    font-size: 24px !important;
}
</style>
