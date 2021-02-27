<template>
    <v-icon
        :size="size"
        :color="color"
        :class="inventory === 1 ? 'barbell' : ''"
    >
        {{ inventoryIcons[inventory] }}
    </v-icon>
</template>

<script>
export default {
    name: 'InventoryIcon',
    props: {
        inventory: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            default: 'black'
        },
        size: {
            type: [String, Number],
            default: undefined
        }
    },
    data: () => ({
        inventoryIcons: {
            1: 'mdi-dumbbell',
            2: 'mdi-dumbbell',
            3: 'mdi-kettlebell'
        }
    })
};
</script>

<style scope>
.barbell {
    transform: rotate(-45deg);
}
</style>
