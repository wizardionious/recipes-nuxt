<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
    const link = route.params.id;
    if (!link) return undefined;

    if (Array.isArray(link)) return undefined;

    const linkParts = link.split("-");
    const idFromlink = linkParts[linkParts.length - 1]!;
    return idFromlink;
});

const {
    data: dish,
    status,
    error,
} = await useFetch<AppDish>(() => `/api/dishes/${id.value}`);

const steps = ref<DishStepWithCompleted[]>(
    dish.value!.steps.map((step, index) => ({
        ...step,
        id: `step-${index}`,
        completed: false,
    })),
);

const stepsCompleted = computed(
    () => steps.value.filter((s) => s.completed).length,
);
const percent = computed(() =>
    steps.value.length
        ? Math.round((stepsCompleted.value / steps.value.length) * 100)
        : 0,
);

const totalSec = computed(() =>
    steps.value.reduce((sum, step) => sum + (step.durationSec || 0), 0),
);

const spentSec = computed(() =>
    steps.value.reduce(
        (sum, step) => sum + (step.completed ? step.durationSec || 0 : 0),
        0,
    ),
);

const timePct = computed(() =>
    totalSec.value ? Math.round((spentSec.value / totalSec.value) * 100) : 0,
);

const remainingSec = computed(() =>
    Math.max(0, totalSec.value - spentSec.value),
);

function fmt(sec?: number) {
    const s = Math.max(0, sec ?? 0);
    const h = Math.floor(s / 3600);
    const m = Math.round((s % 3600) / 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")} год`;
    return `${m} хв`;
}

const eta = computed(() => {
    const d = new Date(Date.now() + remainingSec.value * 1000);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});
</script>

<template>
    <main class="flex flex-1 flex-col space-y-4 py-4">
        <div
            v-if="status === 'pending'"
            class="flex flex-1 items-center justify-center"
        >
            <p>Loading...</p>
        </div>

        <div
            v-else-if="error"
            class="flex flex-1 items-center justify-center"
        >
            <p>{{ error.message || "Не вдалося завантажити рецепт" }}</p>
        </div>

        <template v-else-if="dish">
            <div
                class="bg-card mx-4 flex items-center justify-center rounded-xl p-2 shadow-xs"
            >
                <h1 class="font-caveat text-4xl">{{ dish.dislayName }}</h1>
            </div>
            <div class="bg-card mx-4 rounded-lg p-4 shadow-xs">
                <DishImgFigure :dish />

                <div class="flex py-2">
                    <p>{{ dish.description }}</p>
                </div>

                <div class="flex gap-1">
                    <DishMacros
                        :dish-title="dish.dislayName"
                        :macronutrients="dish.macronutrients"
                    />
                </div>

                <DishIngridients :ingridients="dish.ingridients" />
                <hr class="border-border" />

                <div class="flex flex-col py-2">
                    <div class="flex items-center gap-4 p-2">
                        <span class="whitespace-nowrap">
                            <span>
                                {{ stepsCompleted }}
                            </span>
                            / {{ steps.length }}
                        </span>
                        <div class="relative h-2 w-full rounded-md bg-zinc-200">
                            <span
                                class="absolute top-0 bottom-0 left-0 rounded-md bg-blue-600"
                                :aria-valuemin="0"
                                :aria-valuemax="100"
                                :aria-valuenow="percent"
                                :style="{ width: percent + '%' }"
                            ></span>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 p-2">
                        <span class="text-sm whitespace-nowrap">
                            {{ fmt(spentSec) }} / {{ fmt(totalSec) }}
                        </span>

                        <div
                            class="relative h-2 w-full overflow-hidden rounded-md bg-zinc-200"
                        >
                            <span
                                class="absolute inset-y-0 left-0 rounded-md bg-emerald-500 transition-[width] duration-500"
                                role="progressbar"
                                aria-label="Прогресс по времени приготовления"
                                :aria-valuemin="0"
                                :aria-valuemax="100"
                                :aria-valuenow="timePct"
                                :style="{ width: timePct + '%' }"
                            ></span>
                        </div>
                        <span
                            class="text-xs whitespace-nowrap text-zinc-500"
                            :title="`Залишилось ~ ${fmt(totalSec - spentSec)}`"
                        >
                            ETA {{ eta }}
                        </span>
                    </div>
                    <DishSteps :steps="steps" />
                </div>

                <div class="flex gap-2 py-4">
                    <button
                        type="button"
                        class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
                    >
                        <Icon
                            name="lucide:printer"
                            class=""
                            size="16"
                        />
                        <span>PDF</span>
                    </button>
                    <button
                        type="button"
                        class="border-border inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2"
                    >
                        <Icon
                            name="lucide:clipboard-list"
                            class=""
                            size="16"
                        />
                        <span>Інструкція</span>
                    </button>
                </div>
            </div>
        </template>

        <div
            v-else
            class="flex flex-1 items-center justify-center"
        >
            <p class="font-caveat text-4xl font-medium">Рецепт не знайдено.</p>
        </div>
    </main>
</template>
