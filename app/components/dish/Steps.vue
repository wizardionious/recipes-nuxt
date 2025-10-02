<script lang="ts" setup>
const steps = defineModel<DishStepWithCompleted[]>("steps", { default: [] });

const toMinutes = (sec?: number) => Math.round(Math.max(0, sec ?? 0) / 60);
</script>

<template>
  <fieldset>
    <legend
      id="steps-heading"
      class="sr-only"
    >
      Кроки приготування
    </legend>

    <div
      v-if="steps.length === 0"
      class="text-sm opacity-70"
    >
      <p>Кроки приготування рецепту відсутні</p>
    </div>

    <ul
      v-else
      class="space-y-2"
    >
      <li
        v-for="step in steps"
        :key="step.id"
        class="flex items-center gap-4"
      >
        <input
          :id="step.id"
          v-model="step.completed"
          type="checkbox"
          name="steps"
        />
        <label :for="step.id">
          {{ step.description }} ({{ toMinutes(step.durationSec) }} хв)
        </label>
      </li>
    </ul>
  </fieldset>
</template>
