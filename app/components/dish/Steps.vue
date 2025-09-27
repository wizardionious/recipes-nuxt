<script lang="ts" setup>
import type { DishStepWithCompleted } from "~~/shared/types/dish";

const props = withDefaults(
    defineProps<{
        steps?: DishStepWithCompleted[];
    }>(),
    {
        steps: () => [],
    },
);

const total = computed(() => props.steps.length);
const done = computed(() => props.steps.filter((step) => !!s.completed).length);
const percent = computed(() =>
    total.value ? Math.round((done.value / total.value) * 100) : 0,
);
</script>

<template>
    <section aria-labelledby="steps-heading">
        <h2
            id="steps-heading"
            class="sr-only"
        >
            Шаги приготовления
        </h2>

        <!--If steps absent-->
        <div
            v-if="props.steps.length === 0"
            class="text-sm opacity-70"
        >
            <p>Кроки приготування рецепту відсутні</p>
        </div>

        <ul
            v-else
            class="space-y-2"
        >
            <li
                v-for="(step, index) in props.steps"
                :key="step.id ?? index"
                class="flex items-center gap-4"
            >
                <input
                    :id="`step-${index}`"
                    v-model="step.completed"
                    type="checkbox"
                    name="step-checkbox"
                />
                <label :for="`step-${index}`">
                    {{ step.description }} ({{
                        Math.round(step.durationSec / 60)
                    }}
                    хв)
                </label>
            </li>
        </ul>
    </section>
</template>
