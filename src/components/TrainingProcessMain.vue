<template>
    <v-col align-self="center" class="main-card">
        <audio ref="timer" preload="auto" src="@/assets/timer_end.mp3"></audio>
        <audio
            ref="finish"
            preload="auto"
            src="@/assets/finish_audio.mp3"
        ></audio>

        <v-card
            elevation="2"
            class="text-center d-flex flex-column justify-center"
        >
            <v-card-text class="text--primary big-letters pb-1">
                {{ currentExerciseIndex + 1 }}/{{ training.exercises.length }}
                {{ currentExercise.name }}
            </v-card-text>

            <v-card-text class="text--primary big-letters py-1">
                <inventory-icon
                    :inventory="currentExercise.inventory"
                    :size="55"
                />
                <training-process-main-weight-change
                    :exercise="currentExercise"
                    @valueUpdate="currentExercise.weight = $event"
                />
            </v-card-text>

            <v-card-text
                class="text--primary d-flex justify-center big-letters pt-1"
            >
                <div class="d-flex flex-column mr-2 big-letters">
                    Подход
                    <training-process-main-approaches-change
                        :exercise="currentExercise"
                        :currentApproach="currentApproach"
                        @valueUpdate="currentExercise.approaches = $event"
                    />
                </div>

                <div class="d-flex flex-column big-letters">
                    Повторений
                    <training-process-main-repeats-change
                        :exercise="currentExercise"
                        @valueUpdate="currentExercise.repeats = $event"
                    />
                </div>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-around">
                <v-btn
                    elevation="2"
                    color="error"
                    fab
                    width="40px"
                    height="40px"
                    class="btn-fix"
                >
                    <v-icon dark>mdi-window-close</v-icon>
                </v-btn>

                <v-btn
                    elevation="2"
                    :color="restLeft ? 'error' : 'success'"
                    fab
                    width="75px"
                    height="75px"
                    class="btn-fix"
                    @click="onRestClick"
                >
                    <span v-if="restLeft" class="text-h4">{{ restLeft }}</span>
                    <v-icon v-else dark x-large>
                        mdi-timer
                    </v-icon>
                </v-btn>

                <v-btn
                    elevation="2"
                    fab
                    width="40px"
                    height="40px"
                    class="btn-fix"
                >
                    <v-icon dark>mdi-debug-step-over</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar
            v-model="showAlert"
            color="success"
            timeout="10000"
            transition="scale-transition"
            elevation="6"
        >
            <v-icon dark x-large>
                mdi-flag-checkered
            </v-icon>
            Тренировка завершена за
            <strong>{{ trainingDuration }}</strong> минут!
        </v-snackbar>

        <training-process-main-continue-ask
            :dialog="continueAsk"
            @cancel="onContinueCancel"
            @confirm="onContinueConfirm"
        />
    </v-col>
</template>

<script>
import axios from 'axios';
import InventoryIcon from './InventoryIcon.vue';
import TrainingProcessMainWeightChange from './TrainingProcessMainWeightChange.vue';
import TrainingProcessMainApproachesChange from './TrainingProcessMainApproachesChange.vue';
import TrainingProcessMainRepeatsChange from './TrainingProcessMainRepeatsChange.vue';
import TrainingProcessMainContinueAsk from './TrainingProcessMainContinueAsk.vue';

export default {
    components: {
        InventoryIcon,
        TrainingProcessMainWeightChange,
        TrainingProcessMainApproachesChange,
        TrainingProcessMainRepeatsChange,
        TrainingProcessMainContinueAsk
    },
    name: 'TrainingProcessMain',
    props: {
        training: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        trainingHistory: null,
        audio: null,
        exerciseStart: null,
        showAlert: false,
        currentExerciseIndex: 0,
        currentApproach: 1,
        restLeft: 0,
        continueAsk: false
    }),
    computed: {
        currentExercise: function() {
            return this.training.exercises[this.currentExerciseIndex];
        }
    },
    async created() {
        await axios
            .post('training-history/check/', {
                training: this.training.id
            })
            .then(response => {
                if (response.data.started_training) {
                    this.continueAsk = true;
                    return;
                }
            });

        this.exerciseStart = new Date();
        await axios
            .post('training-history/start/', {
                training: this.training.id
            })
            .then(response => {
                this.trainingHistory = response.data;
            });
    },
    watch: {
        showAlert: function(val) {
            if (val) {
                this.$refs.finish.play();
            } else {
                this.$refs.finish.pause();
                this.$refs.finish.currentTime = 0;
            }
        }
    },
    methods: {
        onContinueCancel: function() {
            this.exerciseStart = new Date();
            this.continueAsk = false;
            axios
                .post('training-history/start/', {
                    training: this.training.id
                })
                .then(response => {
                    this.trainingHistory = response.data;
                });
        },

        onContinueConfirm: function() {
            this.continueAsk = false;
            alert('еще не сделал');
        },

        trainingDuration: function() {
            if (this.trainingHistory) {
                let start = new Date(this.trainingHistory.start);
                let end = new Date(this.trainingHistory.end);
                return parseInt((end - start) / 1000 / 60);
            }
            return 0;
        },

        endTraining: function() {
            axios
                .post(`training-history/${this.trainingHistory.id}/end/`)
                .then(response => {
                    this.trainingHistory = response.data;
                    this.showAlert = true;
                });
        },

        onRestClick: function() {
            if (this.restLeft) return;

            this.saveExerciseDone();

            this.currentApproach++;

            if (this.currentApproach > this.currentExercise.approaches) {
                this.currentApproach = 1;
                this.restLeft = this.training.rest_between_exercises;

                if (
                    this.currentExerciseIndex + 1 ==
                    this.training.exercises.length
                ) {
                    this.restLeft = 0;
                    this.endTraining();
                    return;
                } else {
                    this.currentExerciseIndex++;
                }
            } else {
                this.restLeft = this.training.rest_between_repeats;
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
                training_history: this.trainingHistory.id,
                exercise: this.currentExercise.id,
                repeat: this.currentApproach,
                duration_seconds: parseInt(
                    (new Date() - this.exerciseStart) / 1000
                )
            };
            axios.post(`exercise-done/`, requestData);
        }
    }
};
</script>

<style scope>
.main-card {
    max-width: 800px;
}
</style>
