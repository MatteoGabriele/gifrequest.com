<script setup lang="ts">
import { ProgressiveImage } from "vue-progressive-image";

defineProps<{
  src: string | undefined;
  hasError?: boolean;
}>();

const emit = defineEmits<{
  (e: "loaded"): void;
}>();

function handleLoaded() {
  emit("loaded");
}
</script>

<template>
  <div
    class="relative shadow-sm w-full aspect-video overflow-hidden rounded-4xl"
  >
    <ProgressiveImage
      v-if="src"
      @success="handleLoaded"
      object-cover
      class="absolute inset-0"
      placeholder-src="https://media1.tenor.com/m/kbs-kzp0DYUAAAAC/static-tv.gif"
      fallback-src="https://media1.tenor.com/m/51xvC35-fDEAAAAd/manhunt.gif"
      :src="src"
    />
  </div>
</template>
