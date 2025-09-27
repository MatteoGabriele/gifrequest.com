<script setup lang="ts">
import { PhSpinner } from "@phosphor-icons/vue";

defineProps<{
  url: string;
}>();

const isPending = ref<boolean>(true);
function handleLoaded() {
  nextTick(() => {
    isPending.value = false;
  });
}
</script>

<template>
  <div
    class="relative aspect-auto flex items-center justify-center min-h-[200px] min-w-[200px] max-h-[400px] w-full overflow-hidden"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      v-if="isPending"
    >
      <PhSpinner :size="48" class="animate-spin" />
    </div>
    <img
      @load="handleLoaded"
      :class="[
        {
          'opacity-0': isPending,
        },
      ]"
      :src="url"
    />
  </div>
</template>
