<template>
  <div class="home">
    <UserSelect v-if="!currentUser" />
    <ProgramSelect v-else-if="!currentProgram" />
    <Training v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ProgramSelect from '@/components/ProgramSelect.vue';
import Training from '@/components/Training.vue';
import UserSelect from '@/components/UserSelect.vue';

export default {
  name: 'Home',

  components: {
    ProgramSelect,
    Training,
    UserSelect
  },

  computed: {
    ...mapState('users', {
      currentUser: state => state.currentUser
    }),
    ...mapState('programs', {
      currentProgram: state => state.currentProgram
    })
  },

  methods: {}
};
</script>
