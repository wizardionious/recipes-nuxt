<script setup lang="ts">
const links: { href: string; label: string }[] = [
    {
        label: "Страви",
        href: "/",
    },
    {
        label: "Нова страва",
        href: "/add",
    },
];
</script>

<template>
    <header class="flex flex-col">
        <div class="flex items-center justify-between p-2">
            <NuxtLink
                to="/"
                class="inline-flex items-center gap-1"
            >
                <Icon
                    name="lucide:beef"
                    size="24"
                />
                <span class="font-bold text-lg"> My recipes </span>
            </NuxtLink>
            <button
                class="inline-flex items-center rounded-xl active:bg-muted-background hover:bg-accent-background p-2"
            >
                <Icon
                    name="lucide:user"
                    size="24"
                />
            </button>
        </div>

        <hr class="border-border" />

        <nav class="p-2">
            <ul class="flex justify-evenly font-caveat">
                <li
                    v-for="link in links"
                    :key="link.href"
                    class="text-2xl hover:scale-110 transition-transform font-medium"
                >
                    <NuxtLink :to="'#' + link.href">{{ link.label }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
