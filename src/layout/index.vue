<template>
    <v-app>
        <AppHeader />

        <v-main id="main">
            <SideNavigation />
            <v-container fluid>
                <!-- <v-row>
                    <v-col cols="auto">
                    </v-col>
                    <v-col> -->
                <transition name="fade">
                    <router-view />
                </transition>
                <!-- </v-col>
                </v-row> -->
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

<style scoped>
#main {
    /* background-color: #204165; */
}
</style>
