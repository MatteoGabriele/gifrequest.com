<script setup lang="ts">
import { PhSpinner } from "@phosphor-icons/vue";

defineProps<{
  url: string | undefined;
}>();

const isPending = ref<boolean>(true);
function handleLoaded() {
  nextTick(() => {
    isPending.value = false;
  });
}
</script>

<template>
  <div class="relative flex items-center justify-center aspect-3/2">
    <img
      v-if="isPending"
      class="absolute w-full h-full object-cover"
      src="https://media1.tenor.com/m/kbs-kzp0DYUAAAAC/static-tv.gif"
      alt="static tv effect"
    />

    <PhSpinner
      v-if="isPending"
      :size="48"
      weight="bold"
      class="animate-spin z-10 bottom-4 right-4 absolute text-white"
    />

    <img
      @load="handleLoaded"
      :class="[
        'absolute w-full h-full object-cover',
        {
          'opacity-0': isPending,
        },
      ]"
      :src="url"
    />
  </div>
</template>
