<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        persistent
        max-width="400"
    >
        <template v-slot:default>
            <v-card>
                <v-toolbar color="primary">Продолжить тренировку</v-toolbar>

                <v-card-text class="big-letters text-center py-8">
                    Хотите продолжить начатую тренировку?
                </v-card-text>

                <v-card-actions class="justify-space-around pb-5">
                    <v-btn color="error" @click="$emit('cancel')">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                    <v-btn color="success" @click="$emit('confirm')">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    name: 'TrainingProcessMainContinueAsk',
    props: {
        dialog: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped></style>
