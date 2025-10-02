<script lang="ts" setup>
const { steps = [] } = defineProps<{ steps?: DishStepWithCompleted[] }>();

// без лишнего массива
const totalSteps = computed(() => steps.length);
const completedSteps = computed(() =>
  steps.reduce(
    (completedCount, step) => completedCount + (step.completed ? 1 : 0),
    0,
  ),
);
const percent = computed(() =>
  totalSteps.value
    ? Math.round((completedSteps.value / totalSteps.value) * 100)
    : 0,
);
</script>

<template>
  <div class="flex items-center gap-4 p-2">
    <span class="whitespace-nowrap">
      <span>{{ completedSteps }}</span> / {{ totalSteps }}
    </span>

    <ProgressBar
      :now="percent"
      labelledby="steps-heading"
      thumb-color="bg-blue-600"
      label="Виконані кроки приготування"
    />
  </div>
</template>
