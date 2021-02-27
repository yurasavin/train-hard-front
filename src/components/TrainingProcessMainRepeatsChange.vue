<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                outlined
                color="black"
                class="btn-fix big-letters mt-2"
            >
                {{ exercise.repeats }}
            </v-btn>
            <v-snackbar
                v-model="notificationSuccess"
                timeout="2000"
                color="success"
            >
                Количество повторений успешно обновлено!
            </v-snackbar>

            <v-snackbar
                v-model="notificationError"
                timeout="2000"
                color="error"
            >
                Не удалось обновить количество повторений! Повторите попытку
                позже...
            </v-snackbar>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark
                    >Изменение количества повторений</v-toolbar
                >
                <v-card-text
                    class="d-flex justify-center align-center py-10 big-letters"
                >
                    <span class="value">
                        {{ displayRepeats }}
                    </span>
                    <div class="ml-3 d-flex flex-column">
                        <v-btn small elevation="2 mb-1" @click="delta += 1">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-btn small elevation="2" @click="delta -= 1">
                            <v-icon>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-space-around pb-5">
                    <v-btn color="error" @click="dialog.value = false">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                    <v-btn color="success" @click="onSuccess">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    name: 'TrainingProcessMainRepeatsChange',
    props: {
        exercise: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        dialog: false,
        delta: 0,
        notificationSuccess: false,
        notificationError: false
    }),
    computed: {
        displayRepeats: function() {
            return this.exercise.repeats + this.delta;
        }
    },
    methods: {
        onSuccess: function() {
            let data = { repeats: this.displayRepeats };
            this.$axios
                .patch(`exercises/${this.exercise.id}/`, data)
                .then(response => {
                    this.notificationSuccess = true;
                    this.$emit(
                        'valueUpdate',
                        parseFloat(response.data.repeats)
                    );
                })
                .catch(() => (this.notificationError = true))
                .then(() => {
                    this.delta = 0;
                    this.dialog = false;
                });
        }
    }
};
</script>

<style scoped>
.value {
    font-size: 30px;
}
</style>
