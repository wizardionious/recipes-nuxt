<script setup lang="ts">
const props = defineProps<{
  dish: AppDish;
}>();

const titleId = computed(() => `dish-title-${props.dish.id}`);

function printPdf(d: AppDish) {
  // TODO: сформировать/скачать PDF для блюда d
  console.log("print PDF for", d.dislayName);
}

function openInstruction(d: AppDish) {
  // TODO: открыть инструкцию/видео для блюда d
  console.log("open instruction for", d.dislayName);
}
</script>

<template>
  <article
    class="bg-card rounded-lg px-4 pt-4 shadow-xs"
    :aria-labelledby="titleId"
  >
    <slot
      name="header"
      :dish="dish"
    />

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

    <slot :dish="dish" />

    <!-- 
    <slot
      name="footer"
      :dish="dish"
    /> -->

    <DishActions
      :dish="dish"
      @pdf="printPdf"
      @instruction="openInstruction"
    />
  </article>
</template>
