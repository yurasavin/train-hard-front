<template>
  <v-app id="app">
    <v-system-bar id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </v-system-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<style scoped></style>
