<template>
    <div>
        <v-row v-if="!training" class="d-flex justify-center py-2">
            <v-btn small loading />
        </v-row>

        <template v-if="!startTraining && training">
            <v-row class="start d-flex justify-center pt-2">
                <v-btn elevation="2" @click="startTraining = true">
                    <v-icon class="pr-1">mdi-weight-lifter</v-icon>
                    Начать тренировку
                </v-btn>
            </v-row>

            <v-row class="d-flex justify-center pt-2">
                <training-process-exercises :exercises="training.exercises" />
            </v-row>

            <v-row class="d-flex justify-center pt-2">
                <v-btn elevation="2" @click="$router.back()">
                    <v-icon class="pr-1">mdi-arrow-left</v-icon>
                    Назад
                </v-btn>
            </v-row>
        </template>

        <v-row v-if="startTraining" class="d-flex justify-center">
            <training-process-main :training="training" />
        </v-row>
    </div>
</template>

<script>
import TrainingProcessExercises from '../components/TrainingProcessExercises.vue';
import TrainingProcessMain from '../components/TrainingProcessMain.vue';

export default {
    components: { TrainingProcessExercises, TrainingProcessMain },
    name: 'TrainingProcess',

    props: {
        trainingId: {
            type: [Number, String],
            required: true
        }
    },

    data: () => ({
        startTraining: false,
        training: null
    }),

    created() {
        this.$axios.get(`trainings/${this.trainingId}/`).then(response => {
            this.training = response.data;
            this.training.exercises = this.training.exercises.map(exercise => {
                exercise.weight = parseFloat(exercise.weight);
                return exercise;
            });
        });
    }
};
</script>

<style scoped></style>
