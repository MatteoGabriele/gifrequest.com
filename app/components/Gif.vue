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
    <div class="p-8" v-if="isPending">
      <PhSpinner :size="48" class="animate-spin" />
    </div>
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
