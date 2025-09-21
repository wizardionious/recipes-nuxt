<script setup lang="ts">
const props = defineProps<{
    dish: AppDish;
}>();

const total = props.dish.macronutrients.reduce(
    (acc, macronut) => (acc += macronut.amount),
    0,
);
if (total < 1)
    console.error(
        `total amount of macronutrients in dish ${props.dish.title} must be greater than 1`,
    );

const macronutrients = () => {
    return props.dish.macronutrients.map((macronut) => ({
        ...macronut,
        rate: Math.round((macronut.amount / total) * 100),
    }));
};

const formatIngridient = (ingr: DishIngridient) => {
    if (hasUnits(ingr)) {
        return `${ingr.title} - ${ingr.amount} ${ingr.units}`;
    } else {
        return `${ingr.title} - ${ingr.amount}`;
    }
};
</script>

<template>
    <section class="bg-card rounded-lg px-4 shadow-xs">
        <div class="flex items-center justify-center p-3">
            <h2 class="font-caveat text-4xl">
                {{ dish.title }}
            </h2>
        </div>

        <figure>
            <img
                :src="dish.image.src"
                :alt="dish.image.alt"
                class="w-full rounded-lg object-contain"
            />
            <figcaption class="sr-only">{{ dish.title }}</figcaption>
        </figure>

        <div class="flex py-2">
            <p>{{ dish.description }}</p>
        </div>

        <div class="flex gap-1">
            <div
                v-for="macronut in macronutrients()"
                :key="macronut.displayName"
                class="bg-card flex flex-1 flex-col gap-2 rounded-lg p-2 shadow-xs"
            >
                <p class="text-xs">
                    {{ macronut.displayName }}:
                    <b class="text-sm"> {{ macronut.amount }} г </b>
                </p>
                <div
                    class="h-1.5 rounded-l-full bg-gradient-to-r from-amber-500 to-amber-200"
                    :style="{ width: macronut.rate + '%' }"
                    :aria-label="
                        'Співвідношення ' +
                        macronut.displayName +
                        ' в ' +
                        dish.title
                    "
                    :aria-valuemax="total"
                    :aria-valuemin="0"
                    :aria-valuenow="macronut.rate"
                ></div>
            </div>
        </div>

        <div class="py-4">
            <details>
                <summary class="font-medium">Інгрідієнти</summary>
                <ul class="list-disc pl-10">
                    <li
                        v-for="ingridient in dish.ingridients"
                        :key="ingridient.title"
                    >
                        <p>{{ formatIngridient(ingridient) }}</p>
                    </li>
                </ul>
            </details>
        </div>

        <div class="flex gap-2 py-4">
            <button
                type="button"
                class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
            >
                <Icon
                    name="lucide:printer"
                    class=""
                    size="16"
                />
                <span>PDF</span>
            </button>
            <button
                type="button"
                class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
            >
                <Icon
                    name="lucide:clipboard-list"
                    class=""
                    size="16"
                />
                <span>Інструкція</span>
            </button>
        </div>
    </section>
</template>

<!-- <div class="">
        <div class="">
            Прогресс:
            <span class=""></span>
        </div>
        <div class="">
            <span style=""></span>
        </div>
        <div>
            <button class="">Сбросить прогресс</button>
        </div>
    </div> -->
