<script lang="ts" setup>
type LabelMode = "remaining" | "finishAt" | "both";

const {
  steps = [],
  labelMode = "remaining" as LabelMode,
  timeLocale = "uk-UA",
} = defineProps<{
  steps?: DishStepWithCompleted[];
  labelMode?: LabelMode;
  timeLocale?: string;
}>();
// суммарная длительность рецепта (секунды)
const totalSeconds = computed(() =>
  steps.reduce(
    (totalSecondsAcc, step) =>
      totalSecondsAcc +
      (Number.isFinite(step.durationSec) ? step.durationSec : 0),
    0,
  ),
);

// «потраченное» время по завершённым шагам (секунды)
const spentSeconds = computed(() =>
  steps.reduce(
    (spentSecondsAcc, step) =>
      spentSecondsAcc +
      (step.completed
        ? Number.isFinite(step.durationSec)
          ? step.durationSec
          : 0
        : 0),
    0,
  ),
);

// сколько осталось (секунды)
const remainingSeconds = computed(() =>
  Math.max(0, totalSeconds.value - spentSeconds.value),
);

// форматируем секунды в «H:MM год» или «M хв»
function formatDuration(seconds?: number) {
  const safe = Math.max(0, seconds ?? 0);
  let hours = Math.floor(safe / 3600);
  let minutes = Math.round((safe % 3600) / 60);
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  } // правим округление до 60
  const mm = String(minutes).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm} год` : `${minutes} хв`;
}

// «Готово о …» (локальное время)
const finishTimeText = computed(() =>
  new Date(Date.now() + remainingSeconds.value * 1000).toLocaleTimeString(
    timeLocale,
    { hour: "2-digit", minute: "2-digit" },
  ),
);

// a11y-значение «X із Y» для прогрессбара
const valueText = computed(
  () =>
    `${formatDuration(spentSeconds.value)} із ${formatDuration(totalSeconds.value)}`,
);
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="flex items-center gap-4">
      <span class="text-sm whitespace-nowrap">
        {{ formatDuration(spentSeconds) }} / {{ formatDuration(totalSeconds) }}
      </span>

      <ProgressBar
        :min="0"
        :max="totalSeconds"
        :now="spentSeconds"
        :valuetext="valueText"
        thumb-color="bg-emerald-500"
        label="Прогрес за часом"
      />
    </div>

    <!-- подписи справа в выбранном режиме -->
    <div
      class="flex items-center gap-2 text-xs whitespace-nowrap text-zinc-500"
    >
      <template v-if="labelMode === 'remaining'">
        <span :title="`Готово о ${finishTimeText}`">
          Залишилось ~ {{ formatDuration(remainingSeconds) }}
        </span>
      </template>

      <template v-else-if="labelMode === 'finishAt'">
        <span :title="`Залишилось ~ ${formatDuration(remainingSeconds)}`">
          Готово о {{ finishTimeText }}
        </span>
      </template>

      <template v-else>
        <span>Залишилось ~ {{ formatDuration(remainingSeconds) }}</span>
        <span class="opacity-60">·</span>
        <span>Готово о {{ finishTimeText }}</span>
      </template>
    </div>
  </div>
</template>
