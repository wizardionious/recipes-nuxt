<script setup lang="ts">
const props = defineProps<{
    dish: AppDish;
}>();
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
            <DishMacros
                :dish-title="dish.title"
                :macronutrients="dish.macronutrients"
            />
        </div>

        <DishIngridients :ingridients="dish.ingridients" />

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
