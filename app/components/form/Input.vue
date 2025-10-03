<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';

const model = defineModel<string | number>();

const props = withDefaults(
  defineProps<{
    type?: InputHTMLAttributes["type"];
    name: string;
    placeholder?: string;
    required?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "Введіть текст",
  },
);

const id = inject("input-id") as string;

onMounted(() => {
  if (!id || id.trim() === "") {
    console.error("No id provided for input");
  }
});
</script>

<template>
  <input
    :id
    v-bind="props"
    v-model="model"
    class="bg-accent-background rounded-lg p-1 px-2"
  />
</template>
