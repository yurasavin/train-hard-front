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
                {{ currentApproach }} / {{ exercise.approaches }}
            </v-btn>
            <v-snackbar
                v-model="notificationSuccess"
                timeout="2000"
                color="success"
            >
                Количество подходов успешно обновлено!
            </v-snackbar>

            <v-snackbar
                v-model="notificationError"
                timeout="2000"
                color="error"
            >
                Не удалось обновить количество подходов! Повторите попытку
                позже...
            </v-snackbar>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark
                    >Изменение количества подходов</v-toolbar
                >
                <v-card-text
                    class="d-flex justify-center align-center py-10 big-letters"
                >
                    <span class="value">
                        {{ displayApproaches }}
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
    name: 'TrainingProcessMainApproachesChange',
    props: {
        exercise: {
            type: Object,
            required: true
        },
        currentApproach: {
            type: Number,
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
        displayApproaches: function() {
            return this.exercise.approaches + this.delta;
        }
    },
    methods: {
        onSuccess: function() {
            let data = { approaches: this.displayApproaches };
            this.$axios
                .patch(`exercises/${this.exercise.id}/`, data)
                .then(response => {
                    this.notificationSuccess = true;
                    this.$emit(
                        'valueUpdate',
                        parseFloat(response.data.approaches)
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
