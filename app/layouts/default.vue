<script setup lang="ts">
import { PhHeart, PhMoon, PhSun } from "@phosphor-icons/vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="bg-white h-10 px-4 flex items-center justify-between"
    ></header>

    <main
      class="flex items-center justify-center h-full flex-1 flex-col gap-2 p-6"
    >
      <header class="mb-6 text-center">
        <h1 class="text-6xl text-neutral-800 font-bold font-display mb-2">
          GifRequest
        </h1>
        <p class="text-neutral-400">Push your limits, pull the right repo.</p>
      </header>

      <slot />
    </main>

    <footer class="bg-white h-10 px-4 flex items-center justify-between">
      <div>
        <p class="text-xs text-neutral-500 flex items-center gap-1">
          Developed with <PhHeart weight="fill" size="10" /> by
          <a
            class="underline"
            href="https://github.com/matteogabriele"
            target="_blank"
          >
            a human
          </a>
          #noai
        </p>
      </div>
      <img
        class="h-3"
        src="~/assets/images/tenor_logo.svg"
        alt="powered by Tenor"
      />
    </footer>
  </div>
</template>
