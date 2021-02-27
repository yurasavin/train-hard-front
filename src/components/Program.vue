<template>
    <v-card elevation="10" class="mx-auto" max-width="500" color="green">
        <v-card-title class="d-flex justify-space-between">
            <div>
                <span class="pr-2 wrap-by-word"> {{ program.name }} </span>
            </div>

            <div>
                <v-btn
                    elevation="4"
                    class="btn-fix mr-2"
                    fab
                    small
                    @click="showTrainings = !showTrainings"
                >
                    <v-icon>{{
                        showTrainings ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    }}</v-icon>
                </v-btn>

                <v-btn elevation="4" class="btn-fix mr-2" fab small>
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-spacer></v-spacer>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="showTrainings">
                <v-divider></v-divider>

                <training
                    v-for="(training, index) in program.trainings"
                    :key="`training-${training.id}`"
                    :training="training"
                    :index="index + 1"
                />
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import Training from './Training.vue';
export default {
    name: 'Program',

    components: { Training },

    props: {
        program: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        showTrainings: false
    })
};
</script>

<style scoped>
.wrap-by-word {
    word-break: normal;
}
</style>
