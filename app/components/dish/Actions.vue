<script setup lang="ts">
const props = defineProps<{ dish: AppDish }>();

/**
 * Один сигнатурный тип вместо перегрузок:
 * событие 'pdf' | 'instruction' + полезная нагрузка dish.
 */
const emit = defineEmits<{
  (e: "pdf" | "instruction", dish: AppDish): void;
}>();

const onPdf = () => emit("pdf", props.dish);
const onInstruction = () => emit("instruction", props.dish);
</script>

<template>
  <div class="flex gap-2 py-4">
    <button
      type="button"
      class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
      @click="onPdf"
    >
      <Icon
        name="lucide:printer"
        size="16"
      />
      <span>PDF</span>
    </button>

    <button
      type="button"
      class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
      @click="onInstruction"
    >
      <Icon
        name="lucide:clipboard-list"
        size="16"
      />
      <span>Інструкція</span>
    </button>
  </div>
</template>
