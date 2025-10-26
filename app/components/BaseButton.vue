<script setup lang="ts">
import { PhSpinner } from "@phosphor-icons/vue";

defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <button
    class="rounded-md px-6 py-2 active:scale-95 font-medium text-sm border transition-all duration-200 bg-green-600 hover:bg-green-700 text-white border-green-500"
  >
    <span class="flex items-center gap-2">
      <PhSpinner class="animate-spin" v-if="loading" />
      <slot name="icon" v-else-if="$slots.icon" />
      <slot />
    </span>
  </button>
</template>
