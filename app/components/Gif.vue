<script setup lang="ts">
defineProps<{
  src: string | undefined;
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
      @load="handleLoaded"
      class="absolute w-full h-full object-cover object-center"
      placeholder="https://media1.tenor.com/m/kbs-kzp0DYUAAAAC/static-tv.gif"
      :src="src"
    />
  </div>
</template>
