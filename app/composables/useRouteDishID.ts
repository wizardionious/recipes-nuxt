// app/composables/useRouteDishID.ts
export function useRouteDishID() {
  const route = useRoute();

  // Возвращаем РЕАКТИВНЫЙ computed, чтобы .value работал и watch([id]) видел изменения
  return computed<string | undefined>(() => {
    const raw = route.params.id; // string | string[] | undefined
    if (!raw) return undefined;

    const slug = Array.isArray(raw) ? raw.at(-1)! : String(raw);

    const pos = slug.lastIndexOf("-");
    if (pos < 0 || pos === slug.length - 1) return undefined;

    const tail = slug.slice(pos + 1);
    return /^[A-Za-z0-9]+$/.test(tail) ? tail : undefined;
  });
}
