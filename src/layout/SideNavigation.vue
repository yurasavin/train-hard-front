<template>
    <v-navigation-drawer absolute v-model="showDrawer">
        <v-list>
            <v-list-item-group color="primary">
                <v-list-item
                    v-for="item in items"
                    :key="item.route.name"
                    :to="item.route"
                    exact
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn block>
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SideNavigation',
    data() {
        return {
            items: [
                {
                    title: 'Главная',
                    icon: 'mdi-view-dashboard',
                    route: { name: 'home' }
                },
                {
                    title: 'Профиль',
                    icon: 'mdi-image',
                    route: { name: 'profile' }
                },
                {
                    title: 'Мои программы',
                    icon: 'mdi-help-box',
                    route: { name: 'programs' }
                }
            ]
        };
    },
    computed: {
        showDrawer: {
            get: function() {
                return this.$store.state.layout.showDrawer;
            },
            set: function(newValue) {
                this.setShowDrawer(newValue);
            }
        }
    },
    methods: {
        ...mapActions('layout', ['setShowDrawer'])
    },
    mounted: function() {
        this.setShowDrawer(!this.$vuetify.breakpoint.mobile);
    }
};
</script>

<style scoped></style>
