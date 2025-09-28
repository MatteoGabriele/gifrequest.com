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
  <div
    :class="[
      'relative h-[280px] w-[280px] md:h-[400px] md:w-[500px] aspect-auto overflow-hidden',
    ]"
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
        'w-full h-full object-cover',
        {
          'opacity-0': isPending,
        },
      ]"
      :src="url"
    />
  </div>
</template>
