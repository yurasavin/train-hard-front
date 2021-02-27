<template>
    <v-card elevation="10" color="teal">
        <v-card-title class="d-flex justify-space-between">
            <div>
                <span class="pr-2 wrap-by-word">
                    {{ index }}. {{ training.name }}
                </span>
            </div>

            <div>
                <v-btn
                    elevation="4"
                    class="btn-fix mr-2"
                    fab
                    small
                    :to="{
                        name: 'training-process',
                        params: { trainingId: training.id }
                    }"
                >
                    <v-icon>mdi-arm-flex</v-icon>
                </v-btn>

                <v-btn
                    elevation="4"
                    class="btn-fix mr-2"
                    fab
                    small
                    @click="showExercises = !showExercises"
                >
                    <v-icon>{{
                        showExercises ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    }}</v-icon>
                </v-btn>

                <v-btn elevation="4" class="btn-fix mr-2" fab small>
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </div>
        </v-card-title>

        <v-expand-transition>
            <div v-show="showExercises">
                <v-divider></v-divider>

                <v-card color="blue-grey">
                    <v-card-text
                        v-for="exercise in training.exercises"
                        :key="`exercise-${exercise.id}`"
                        class="white--text"
                    >
                        {{ exercise }}
                    </v-card-text>
                </v-card>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    name: 'Training',
    props: {
        training: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        showExercises: false
    })
};
</script>

<style scoped>
.wrap-by-word {
    word-break: normal;
}
</style>
