<script lang="ts" setup>
const ingridients = ref([
  {
    text: "",
  },
]);
</script>

<template>
  <main class="flex flex-1 flex-col py-4">
    <div class="p-4">
      <Form>
        <Formfield label="Назва страви">
          <FormInput
            type="text"
            name="title"
            placeholder="Чахохбілі"
            required
          />
        </Formfield>
        <FormField label="Опис страви">
          <FormTextarea
            type="text"
            name="description"
            placeholder="Грузинское блюдо..."
            required
          />
          <div class="flex flex-col gap-2">
            <FormInput
              v-for="(value, index) in ingridients"
              :key="value.text"
              v-model="value.text"
              :name="'Ingridient' + index"
              placeholder="Введіть інгрідієнт"
            />

            <button
              type="button"
              class="bg-accent-background inline-flex items-center justify-center rounded-2xl p-2"
              @click="() => ingridients.push({ text: '' })"
            >
              Add ingridient
            </button>
          </div>
        </FormField>
      </Form>
    </div>
  </main>
</template>
