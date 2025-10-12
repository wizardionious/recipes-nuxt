<script lang="ts" setup>
import type { DishMacronutrients } from '~~/shared/types/dish';

const title = ref<string>("");
const description = ref<string>("");

let lastID = 1;
const ingridients = ref<(DishIngridient & { id: string })[]>([
  {
    id: String(lastID),
    title: "",
    amount: 0,
    units: "g",
  },
]);

const addIngredient = () => {
  ingridients.value.push({
    id: String(++lastID),
    title: "",
    amount: 0,
    units: "g",
  });
};

const deleteIngredient = (index: number) => {
  if (ingridients.value.length > 1) {
    ingridients.value.splice(index, 1);
  }
};

const macronutrients = ref<DishMacronutrients>({
  proteins: {
    displayName: "Білки",
    amount: 48,
  },
  fats: {
    displayName: "Жири",
    amount: 20,
  },
  carbs: {
    displayName: "Вуглеводи",
    amount: 22,
  },
});

function handleSubmit() {
  const dish = {
    title: title.value,
    description: description.value,
    ingridients: ingridients.value,
    macronutrients: macronutrients.value,
  };

  console.log(dish);
}
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4">
    <PageHeading text="Додаваня нової страви" />

    <div class="bg-card space-y-4 rounded-2xl p-4 shadow-xs">
      <Form>
        <FormField label="Назва страви">
          <FormInput
            v-model="title"
            type="text"
            name="title"
            placeholder="Чахохбілі"
            required
          />
        </FormField>
        <FormField label="Опис страви">
          <FormTextarea
            v-model="description"
            name="description"
            placeholder="Грузинское блюдо..."
            required
          />
        </FormField>
        <section class="flex flex-col gap-2">
          <h2 class="font-bad-script text-lg">Інгрідієнти:</h2>
          <ul class="space-y-2">
            <IngridientRow
              v-for="(ingridient, idx) in ingridients"
              :key="ingridient.id"
              v-model="ingridients[idx]!"
              @delete="deleteIngredient(idx)"
            />
          </ul>

          <button
            type="button"
            class="bg-accent-background inline-flex items-center justify-center rounded-2xl p-2"
            @click="addIngredient"
          >
            Add ingridient
          </button>
        </section>
        <FormMacronutrients v-model="macronutrients" />
      </Form>

      <button
        type="button"
        class="bg-accent-background inline-flex rounded-2xl px-6 py-2"
        @click="handleSubmit"
      >
        Відправити
      </button>
    </div>
  </main>
</template>
