<script setup lang="ts">
useHead({
    titleTemplate(title) {
        return `${title} | Home`;
    },
});

const dishes = reactive<AppDish[]>([
    {
        id: crypto.randomUUID(),
        image: {
            alt: "Чахохбілі",
            src: "/images/chakhokhbili.png",
        },
        title: "Чахохбілі",
        description:
            "Классическое грузинское блюдо: тушёная курица с томатами, луком и специями. Высокий белок для мышц, тёплое согревающее блюдо для осени.",
        macronutrients: [
            {
                displayName: "Білки",
                amount: 48,
            },
            {
                displayName: "Жири",
                amount: 20,
            },
            {
                displayName: "Вуглеводи",
                amount: 22,
            },
        ],
        ingridients: [
            {
                title: "Курячі стегна без шкіри",
                amount: 600,
                units: "г.",
            },
            {
                title: "Цибуля ріпчаста",
                amount: 300,
                units: "г.",
            },
            {
                title: "Помідори стиглі (або томати у власному соку)",
                amount: 500,
                units: "г.",
            },
            {
                title: "Перець солодкий",
                amount: 200,
                units: "г.",
            },
            {
                title: "Часник",
                amount: 4,
                units: "зубчики",
            },
            {
                title: "Кінза свіжа",
                amount: 20,
                units: "г.",
            },
            {
                title: "Петрушка свіжа",
                amount: 20,
                units: "г.",
            },
            {
                title: "Олія оливкова",
                amount: 200,
                units: "г.",
            },
            {
                title: "Сіль, перець, хмелі-сунелі",
                amount: "за смаком",
            },
        ],
    },
]);
</script>

<template>
    <main class="flex flex-1 flex-col py-4">
        <div
            class="bg-card mx-4 flex items-center justify-center rounded-xl p-2 shadow-xs"
        >
            <h1 class="font-caveat text-4xl">Найсмачніші страви</h1>
        </div>

        <div class="grid flex-1 grid-cols-1 gap-4 p-4">
            <DishCard
                v-for="dish in dishes"
                :key="dish.id"
                :dish
            />
        </div>
    </main>
</template>
