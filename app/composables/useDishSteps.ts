// composables/useDishSteps.ts
export function useDishSteps(dish: Ref<AppDish | null | undefined>) {
  type ApiStep = DishStep & { id?: string };
  type UiStep = DishStepWithCompleted & { id: string };

  const steps = ref<UiStep[]>([]);

  watchEffect(() => {
    const base: ApiStep[] = dish.value?.steps ?? [];
    steps.value = base.map(
      (s, i): UiStep => ({
        ...s,
        id: s.id ?? `step-${i}`,
        completed: false,
      }),
    );
  });

  return { steps };
}
