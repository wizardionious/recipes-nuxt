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
    <header class="flex gap-2 flex-col p-2">
        <div class="flex items-center justify-between">
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

        <hr class="border-zinc-400" />

        <nav class="">
            <ul class="flex justify-evenly font-caveat">
                <li
                    v-for="link in links"
                    :key="link.href"
                    class="text-2xl font-medium"
                >
                    <NuxtLink :to="'#' + link.href">{{ link.label }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
