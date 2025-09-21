<script setup lang="ts">
useHead({
    titleTemplate(title) {
        return `${title} | Home`;
    },
});

const dishesStore = useDishesStore();
</script>

<template>
    <main class="flex flex-1 flex-col py-4">
        <div
            class="bg-card mx-4 flex items-center justify-center rounded-xl p-2 shadow-xs"
        >
            <h1 class="font-caveat text-4xl">Найсмачніші страви</h1>
        </div>

        <div class="grid flex-1 grid-cols-1 gap-4 p-4">
            <DishCard
                v-for="dish in dishesStore.dishes"
                :key="dish.id"
                :dish
            />
        </div>
    </main>
</template>
