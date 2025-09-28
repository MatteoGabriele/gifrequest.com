<script setup lang="ts">
import { PhHeart } from "@phosphor-icons/vue";
</script>

<template>
  <footer class="p-4 flex items-center justify-between">
    <div>
      <p class="text-xs text-neutral-500 flex items-center gap-1">
        Developed with <PhHeart weight="fill" size="10" /> by
        <a
          class="underline"
          href="https://github.com/matteogabriele"
          target="_blank"
          >a human</a
        >
        with no AI
      </p>
    </div>
    <img
      class="h-3"
      src="~/assets/images/tenor_logo.svg"
      alt="powered by Tenor"
    />
  </footer>
</template>
