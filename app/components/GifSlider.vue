<script setup lang="ts">
import { PhArrowClockwise } from "@phosphor-icons/vue";

const props = defineProps<{
  gifs?: string[];
}>();

const currentGifIndex = ref<number>(0);
const currentGif = computed<string | undefined>(() => {
  return props.gifs?.[currentGifIndex.value];
});
function refreshGif(): void {
  if (!props.gifs) {
    return;
  }

  if (currentGifIndex.value >= props.gifs.length - 1) {
    currentGifIndex.value = 0;
  } else {
    currentGifIndex.value++;
  }
}
</script>

<template>
  <div class="relative rounded-4xl border border-neutral-200 bg-neutral-100">
    <Gif :url="currentGif" :key="currentGif" />

    <button
      class="bottom-4 right-4 absolute active:scale-95 hover:scale-110 duration-200 transition-all size-12 bg-white text-neutral-800 flex items-center justify-center rounded-full shadow-[0_0_10px_4px_rgba(0,0,0,0.2)]"
      @click="refreshGif"
    >
      <PhArrowClockwise weight="bold" :size="24" />
    </button>
  </div>
</template>
