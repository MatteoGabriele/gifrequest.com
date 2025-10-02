<script setup lang="ts">
import { PhArrowClockwise } from "@phosphor-icons/vue";

const props = defineProps<{
  items?: string[];
}>();

const currentGifIndex = ref<number>(0);
const currentGif = computed<string | undefined>(() => {
  return props.items?.[currentGifIndex.value];
});
function refreshGif(): void {
  if (!props.items) {
    return;
  }

  if (currentGifIndex.value >= props.items.length - 1) {
    currentGifIndex.value = 0;
  } else {
    currentGifIndex.value++;
  }
}
</script>

<template>
  <GifContainer>
    <Gif :url="currentGif" :key="currentGif" />

    <button
      v-if="items && items.length > 1"
      class="bottom-4 right-4 absolute active:scale-95 hover:scale-110 duration-200 transition-all size-12 bg-white text-neutral-800 flex items-center justify-center rounded-full shadow-[0_0_10px_4px_rgba(0,0,0,0.2)]"
      @click="refreshGif"
    >
      <PhArrowClockwise weight="bold" :size="24" />
    </button>
  </GifContainer>
</template>
