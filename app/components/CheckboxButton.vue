<script setup lang="ts">
import { PhStar } from "@phosphor-icons/vue";

defineProps<{
  name: string;
  value: string;
  disabled?: boolean;
  status?: "selected" | "success" | "error";
}>();

const selected = defineModel<string>("selected");
</script>

<template>
  <label
    :for="value"
    :class="[
      'flex items-center gap-2 cursor-pointer select-none transition-all duration-200',
      'border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium',
      'hover:border-gray-400 hover:bg-gray-50',
      'focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
      status === 'selected'
        ? 'bg-blue-50 border-blue-300 text-blue-800'
        : status === 'success'
        ? 'bg-green-50 border-green-300 text-green-800'
        : status === 'error'
        ? 'bg-red-50 border-red-300 text-red-800'
        : 'bg-white text-gray-700',
      disabled && 'cursor-not-allowed',
    ]"
  >
    <PhStar
      :weight="status === 'selected' ? 'fill' : 'regular'"
      :class="[
        'w-4 h-4 transition-colors',
        status === 'selected'
          ? 'text-yellow-500'
          : status === 'success'
          ? 'text-green-600'
          : status === 'error'
          ? 'text-red-600'
          : 'text-gray-500',
      ]"
    />

    <slot />

    <input
      :id="value"
      :disabled
      :value="value"
      type="radio"
      :name="name"
      v-model="selected"
      class="sr-only"
    />
  </label>
</template>
