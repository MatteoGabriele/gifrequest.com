<script setup lang="ts">
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
    <NuxtImg
      v-if="hasError"
      class="absolute w-full h-full object-cover object-center"
      src="https://media1.tenor.com/m/51xvC35-fDEAAAAd/manhunt.gif"
    />

    <NuxtImg
      v-else
      @load="handleLoaded"
      class="absolute w-full h-full object-cover object-center"
      placeholder="https://media1.tenor.com/m/kbs-kzp0DYUAAAAC/static-tv.gif"
      :src="src"
    />
  </div>
</template>
