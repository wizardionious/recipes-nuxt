<script setup lang="ts">
const dishesStore = useDishesStore();
const route = useRoute();

const dish = dishesStore.getByLink(route.params.id)!;
</script>

<template>
    <main class="flex flex-1 flex-col space-y-4 py-4">
        <div
            class="bg-card mx-4 flex items-center justify-center rounded-xl p-2 shadow-xs"
        >
            <h1 class="font-caveat text-4xl">{{ dish.dislayName }}</h1>
        </div>

        <div class="bg-card mx-4 rounded-lg p-4 shadow-xs">
            <DishImgFigure :dish />

            <div class="flex py-2">
                <p>{{ dish.description }}</p>
            </div>

            <div class="flex gap-1">
                <DishMacros
                    :dish-title="dish.dislayName"
                    :macronutrients="dish.macronutrients"
                />
            </div>

            <DishIngridients :ingridients="dish.ingridients" />

            <hr class="border-border my-2" />

            <div class="py-2">
                <ul class="">
                    <li class="flex items-center gap-4">
                        <input
                            :id="1 + 'c'"
                            type="checkbox"
                            name="checkbox"
                            class=""
                        />
                        <label :for="1 + 'c'">
                            Подготовьте продукты: снимите кожу с бёдер,
                            обсушите, нарежьте лук полукольцами, перец соломкой,
                            помидоры кубиком. (10 мин)
                        </label>
                    </li>
                </ul>
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
        </div>
    </main>
</template>
