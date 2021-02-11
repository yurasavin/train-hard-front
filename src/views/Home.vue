<template>
  <div class="home">
    <ProgramSelect v-if="!currentProgram" />
    <Training v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ProgramSelect from '@/components/ProgramSelect.vue';
import Training from '@/components/Training.vue';

export default {
  name: 'Home',

  components: {
    ProgramSelect,
    Training
  },

  computed: {
    ...mapState('programs', {
      currentProgram: state => state.currentProgram
    })
  },

  methods: {}
};
</script>
