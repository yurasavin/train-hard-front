<template>
  <div>
    <audio ref="timer" preload="auto" src="@/assets/timer_end.mp3"></audio>
    <audio ref="finish" preload="auto" src="@/assets/finish_audio.mp3"></audio>
    <v-row v-if="showAlert" class="d-flex justify-center">
      <v-alert
        v-model="showAlert"
        dismissible
        color="success"
        border="left"
        elevation="2"
        colored-border
        transition="scale-transition"
        icon="mdi-flag-checkered"
      >
        Тренировка завершена за <strong>{{ trainingDuration }}</strong> минут!
      </v-alert>
    </v-row>
    <v-row v-if="!startTraining" class="start d-flex justify-center py-2">
      <v-btn @click="onStartTraining">
        <v-icon class="pr-1">mdi-dumbbell</v-icon>
        Начать тренировку
      </v-btn>
    </v-row>

    <v-row v-else class="d-flex justify-center">
      <v-col cols="auto" align-self="center">
        <v-card elevation="2">
          <v-card-title>
            Тренировка начата в {{ trainingStartDisplay }}
          </v-card-title>

          <v-card-title>
            Текущее упражнение
          </v-card-title>

          <v-card-text>
            <b>Номер:</b> {{ currentExercise.displayIndex }} из
            {{ exercises.length }}
            <v-spacer></v-spacer>

            <b>Название:</b> {{ currentExercise.name }}
            <v-spacer></v-spacer>

            <b>Инвентарь:</b> {{ currentExercise.displayInventory }}
            <v-spacer></v-spacer>

            <b>Вес (кг):</b> {{ currentExercise.weight }}
            <v-spacer></v-spacer>

            <b>Подход:</b> {{ currentApproach }} из
            {{ currentExercise.approaches }}
            <v-spacer></v-spacer>

            <b>Повторений:</b> {{ currentExercise.repeats }}
            <v-spacer></v-spacer>
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              elevation="2"
              :color="restLeft ? 'error' : 'success'"
              fab
              width="100px"
              height="100px"
              @click="onRestClick"
            >
              <span v-if="restLeft" class="text-h4">{{ restLeft }}</span>
              <v-icon v-else dark x-large>
                mdi-timer
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="d-flex justify-center">
          <v-card-title>
            Программа тренировки
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="exercisesList"
          hide-default-footer
          dense
          disable-filtering
          disable-pagination
          disable-sort
          :item-class="getItemClass"
          mobile-breakpoint="0"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Training',

  data: () => ({
    showAlert: false,
    audio: undefined,
    startTraining: false,
    exerciseStart: undefined,
    training: undefined,
    currentExerciseIndex: 0,
    currentApproach: 1,
    restLeft: 0,
    inventoryMap: {
      0: 'Ничего',
      1: 'Штанга',
      2: 'Гантели',
      3: 'Гиря'
    },
    headers: [
      {
        text: '№',
        align: 'center',
        value: 'displayIndex'
      },
      {
        text: 'Название',
        align: 'start',
        value: 'name'
      },
      {
        text: 'Инвертарь',
        align: 'center',
        value: 'displayInventory'
      },
      {
        text: 'Вес (кг)',
        align: 'center',
        value: 'displayWeight'
      },
      {
        text: 'Подходов',
        align: 'center',
        value: 'approaches'
      },
      {
        text: 'Повторений',
        align: 'center',
        value: 'repeats'
      }
    ]
  }),

  computed: {
    ...mapState('programs', {
      currentProgram: state => state.currentProgram
    }),

    ...mapState('training', {
      exercises: state => state.exercises
    }),

    ...mapState('users', {
      currentUser: state => state.currentUser
    }),

    exercisesList: function() {
      return this.exercises.map((exercise, index) => {
        exercise.displayIndex = ++index;
        exercise.displayInventory = this.inventoryMap[exercise.inventory];
        exercise.displayWeight =
          exercise.weight != '0.00' ? exercise.weight : '-';
        return exercise;
      });
    },

    currentExercise: function() {
      return this.exercisesList[this.currentExerciseIndex];
    },

    trainingStartDisplay: function() {
      if (this.training)
        return new Date(this.training.start).toLocaleTimeString();
      return '';
    },

    trainingDuration: function() {
      if (this.training) {
        let start = new Date(this.training.start);
        let end = new Date(this.training.end);
        return parseInt((end - start) / 1000 / 60);
      }
      return 0;
    }
  },

  methods: {
    ...mapActions('training', ['loadExercises', 'setCurrentExercise']),

    onStartTraining: function() {
      axios
        .post('training-history/start/', { program: this.currentProgram.id })
        .then(response => {
          this.training = response.data;
          this.startTraining = true;
          this.exerciseStart = new Date();
        });
    },

    endTraining: function() {
      axios.post(`training-history/${this.training.id}/end/`).then(response => {
        this.training = response.data;
        this.startTraining = false;
        this.showAlert = true;
        this.$refs.finish.play();
      });
    },

    getItemClass: function(exercise) {
      if (
        this.currentExerciseIndex === null ||
        this.currentExerciseIndex > exercise.displayIndex - 1
      ) {
        return 'success';
      } else if (this.currentExerciseIndex < exercise.displayIndex - 1) {
        return 'warning';
      } else if (this.currentExerciseIndex === exercise.displayIndex - 1) {
        return 'info';
      }
    },

    onRestClick: function() {
      if (this.restLeft) return;

      this.saveExerciseDone();

      this.currentApproach++;

      if (this.currentApproach > this.currentExercise.approaches) {
        this.currentApproach = 1;
        this.restLeft = this.currentProgram.rest_between_exercises;

        if (this.currentExerciseIndex + 1 == this.exercises.length) {
          this.endTraining();
          return;
        } else {
          this.currentExerciseIndex++;
          this.setCurrentExercise(this.currentExerciseIndex);
        }
      } else {
        this.restLeft = this.currentProgram.rest_between_repeats;
      }

      let intervalId = setInterval(() => {
        if (!--this.restLeft) {
          clearInterval(intervalId);
          this.$refs.timer.play();
          this.exerciseStart = new Date();
        }
      }, 1000);
    },

    saveExerciseDone: function() {
      let requestData = {
        training_history: this.training.id,
        exercise: this.currentExercise.id,
        repeat: this.currentApproach,
        duration_seconds: parseInt((new Date() - this.exerciseStart) / 1000)
      };
      axios.post(`exercise-done/`, requestData);
    }
  },

  watch: {
    showAlert: function(val) {
      if (!val) {
        this.$refs.finish.pause();
        this.$refs.finish.currentTime = 0;
      }
    }
  },

  created() {
    this.loadExercises(this.currentProgram.id);
  }
};
</script>

<style></style>
