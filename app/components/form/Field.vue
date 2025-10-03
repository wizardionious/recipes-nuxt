<script lang="ts" setup>
const { label } = defineProps<{
  label: string;
}>();

const id = useId();
provide("input-id", id);
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <label
      :for="id"
      class="font-bad-script text-lg"
    >
      {{ label }}
    </label>

    <slot />
  </div>
</template>
