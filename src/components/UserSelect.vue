<template>
  <div>
    <v-row>
      <v-col>
        <h4>Выберите пользователя</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          v-for="(user, index) in users"
          :key="user.id"
          @click="setCurrentUser(index)"
        >
          {{ user.username }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserSelect',

  computed: {
    ...mapState('users', {
      users: state => state.users
    })
  },

  methods: {
    ...mapActions('users', ['loadUsers', 'setCurrentUser'])
  },

  created() {
    this.loadUsers();
  }
};
</script>

<style scoped></style>
