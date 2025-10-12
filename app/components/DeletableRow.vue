<script lang="ts" setup>
const emit = defineEmits<{
  (e: "delete"): void;
}>();

const props = withDefaults(defineProps<{ as?: "li" | "div" }>(), { as: "div" });
</script>

<template>
  <component
    :is="props.as"
    class="grid grid-cols-8 items-center gap-2"
  >
    <slot />

    <button
      type="button"
      class="trasition-colors inline-flex h-full items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 active:bg-red-100"
      title="Видалити інгредієнт"
      @click="emit('delete')"
    >
      <Icon
        name="lucide:trash-2"
        size="20"
      />
    </button>
  </component>
</template>
