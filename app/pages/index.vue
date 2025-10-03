<script setup lang="ts">
useHead({
  titleTemplate(title) {
    return `${title} | Home`;
  },
});

const { data, error, status } = await useFetch<AppDish[]>(
  "/api/dishes",
  { key: "dishes-list" }, // стабильный ключ для кеша/рефетча
);

const dishes = computed(() => data.value ?? []);
</script>

<template>
  <main class="flex flex-1 flex-col space-y-4 py-4">
    <div
      v-if="status === 'pending'"
      class="flex flex-1 items-center justify-center"
    >
      <p>Loading...</p>
    </div>

    <div
      v-else-if="error"
      class="flex flex-1 items-center justify-center"
    >
      <p>{{ error.message || "Не вдалося завантажити рецепти" }}</p>
    </div>

    <template v-else-if="dishes">
      <div
        class="bg-card mx-4 flex items-center justify-center rounded-xl p-2 shadow-xs"
      >
        <h1 class="font-caveat text-4xl">Найсмачніші страви</h1>
      </div>

      <div class="grid flex-1 grid-cols-1 gap-4 px-4">
        <DishCard
          v-for="dish in dishes"
          :key="dish.id"
          :dish
        >
          <template #header>
            <h2>{{ dish.dislayName }}</h2>
          </template>

          <template #default>
            <div class="flex items-center justify-center p-4">
              <NuxtLink
                :to="createLink(dish)"
                class="border-border rounded-lg border p-2"
              >
                Перейти до приготування
              </NuxtLink>
            </div>
          </template>
        </DishCard>
      </div>
    </template>

    <div
      v-else
      class="flex flex-1 items-center justify-center"
    >
      <p class="font-caveat text-4xl font-medium">Рецепти не знайдено.</p>
    </div>
  </main>
</template>
