<template>
  <div>
    <v-row>
      <v-col>
        <h4>Выберите программу</h4>
      </v-col>
    </v-row>
    <v-row v-for="(program, index) in programs" :key="program.id">
      <v-col>
        <v-btn @click="setCurrentProgram(index)">
          {{ program.name }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProgramSelect',

  computed: {
    ...mapState('programs', {
      programs: state => state.programs
    })
  },

  methods: {
    ...mapActions('programs', ['loadPrograms', 'setCurrentProgram'])
  },

  created() {
    this.loadPrograms();
  }
};
</script>

<style scoped></style>
