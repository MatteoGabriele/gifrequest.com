<script setup lang="ts">
import { PhArrowClockwise } from "@phosphor-icons/vue";

const props = defineProps<{
  name: string | undefined;
}>();

const { data: gifs, status } = await useGifs(props.name);
const { gif, nextGif } = useShuffledGif(gifs);

const isLoaded = ref<boolean>(false);
function handleLoaded(): void {
  isLoaded.value = true;
}
</script>

<template>
  <div class="relative w-full">
    <Gif
      @loaded="handleLoaded"
      :key="gif"
      :has-error="status === 'error'"
      :src="gif"
    />
    <button
      v-if="isLoaded"
      class="bottom-4 right-4 absolute active:scale-95 hover:scale-110 duration-200 transition-all size-12 bg-white text-neutral-800 flex items-center justify-center rounded-full shadow-[0_0_10px_4px_rgba(0,0,0,0.2)]"
      @click="nextGif"
    >
      <PhArrowClockwise weight="bold" :size="24" />
    </button>
  </div>
</template>
