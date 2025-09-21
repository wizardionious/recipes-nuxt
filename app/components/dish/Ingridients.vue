<script setup lang="ts">
const props = defineProps<{
    ingridients: DishIngridient[];
}>();

const formatIngridient = (ingr: DishIngridient) => {
    if (hasUnits(ingr)) {
        return `${ingr.title} - ${ingr.amount} ${ingr.units}`;
    } else {
        return `${ingr.title} - ${ingr.amount}`;
    }
};
</script>

<template>
    <details>
        <summary class="cursor-pointer py-4 font-medium">Інгрідієнти</summary>
        <ul class="list-disc pb-4 pl-10">
            <li
                v-for="ingridient in ingridients"
                :key="ingridient.title"
            >
                <p>{{ formatIngridient(ingridient) }}</p>
            </li>
        </ul>
    </details>
</template>
