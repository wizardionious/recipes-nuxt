<script lang="ts" setup>
type Ingridient = DishIngridient & { id: string };

const model = defineModel<Ingridient>({ required: true });

defineEmits<{ delete: [] }>();

type UnitRule = { units: IngridientUnits; lock: boolean };

const UNIT_RULES: Readonly<Record<string, UnitRule>> = {
  петрушка: { units: "g", lock: true },
  петрушки: { units: "g", lock: true },

  мясо: { units: "kg", lock: true },
} as const;

const rule = computed(() => UNIT_RULES[norm(model.value?.title || "")] || null);

watch(rule, (newRule) => {
  if (!newRule) return;
  if (!hasUnits(model.value)) return;

  if (model.value.units !== newRule.units) model.value.units = newRule.units;
});
</script>

<template>
  <li class="grid grid-cols-[1fr_auto_auto] items-center gap-2">
    <FormInput
      v-model="model.title"
      placeholder="Назва інгредієнта"
      name="title"
      class="col-span-5"
    />
    <FormInput
      v-model="model.amount"
      type="number"
      min="0"
      placeholder="0"
      name="amount"
    />
    <select
      v-if="hasUnits(model)"
      v-model="model.units"
      :disabled="!!rule?.lock"
    >
      <option
        v-for="unit in ALL_UNITS"
        :key="unit"
        :value="unit"
      >
        {{ unit }}
      </option>
    </select>
    <button
      type="button"
      class="inline-flex h-full items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 active:bg-red-100"
      title="Видалити інгредієнт"
      @click="$emit('delete')"
    >
      <Icon
        name="lucide:trash-2"
        size="20"
      />
    </button>
  </li>
</template>
