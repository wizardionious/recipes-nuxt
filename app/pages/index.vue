<script setup lang="ts">
useHead({
    titleTemplate(title) {
        return `${title} | Home`;
    },
});

const dishes = reactive<AppDish[]>([
    {
        image: {
            alt: "Чахохбілі",
            src: "/images/chakhokhbili.png",
        },
        title: "Чахохбілі",
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
            <section
                v-for="dish in dishes"
                :key="dish.title"
                class="bg-card rounded-lg px-4 shadow-xs"
            >
                <div class="flex items-center justify-center p-3">
                    <h2 class="font-caveat text-4xl">
                        {{ dish.title }}
                    </h2>
                </div>

                <figure>
                    <img
                        :src="dish.image.src"
                        :alt="dish.image.alt"
                        class="w-full rounded-lg object-contain"
                    />
                    <figcaption class="sr-only">Чахохбілі</figcaption>
                </figure>
            </section>
        </div>
    </main>
</template>
