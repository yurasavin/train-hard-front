<template>
    <div>
        <v-dialog
            v-model="showExercises"
            transition="dialog-top-transition"
            :max-width="this.$vuetify.breakpoint.mobile ? '90%' : '50%'"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="btn-fix" elevation="2" v-bind="attrs" v-on="on">
                    <v-icon class="pr-1">mdi-clipboard-list</v-icon>
                    Посмотреть упражнения
                </v-btn>
            </template>

            <v-simple-table dense class="text-center" max-width="400">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Упражнение
                            </th>
                            <th class="text-center">
                                Инв.
                            </th>
                            <th class="text-center">
                                <v-icon>
                                    mdi-weight-kilogram
                                </v-icon>
                            </th>
                            <th class="text-center">
                                <v-icon>
                                    mdi-repeat
                                </v-icon>
                            </th>
                            <th class="text-center">
                                <v-icon>
                                    mdi-weight-lifter
                                </v-icon>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(exercise, index) in exercises"
                            :key="exercise.id"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ exercise.name }}</td>
                            <td>
                                <inventory-icon
                                    :inventory="exercise.inventory"
                                />
                            </td>
                            <td>
                                {{
                                    exercise.weight === '0.00'
                                        ? '-'
                                        : exercise.weight
                                }}
                            </td>
                            <td>{{ exercise.approaches }}</td>
                            <td>{{ exercise.repeats }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-dialog>
    </div>
</template>

<script>
import InventoryIcon from './InventoryIcon.vue';

export default {
    components: { InventoryIcon },
    name: 'TrainingProcessExercises',
    props: {
        exercises: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        showExercises: false
    }),
    methods: {}
};
</script>

<style scope></style>
