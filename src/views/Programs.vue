<template>
    <div class="text-center">
        <div v-if="loading">
            <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>

        <template v-else>
            <program
                v-for="program in programs"
                :key="`program-${program.id}`"
                :program="program"
            />

            <program-create />
        </template>
    </div>
</template>

<script>
import Program from '../components/Program.vue';
import ProgramCreate from '../components/ProgramCreate.vue';

export default {
    name: 'Programs',

    components: {
        Program,
        ProgramCreate
    },

    data: () => ({
        programs: [],
        loading: true
    }),

    created() {
        this.$axios.get('programs/').then(response => {
            this.programs = response.data;
            this.loading = false;
        });
    }
};
</script>

<style scoped></style>
