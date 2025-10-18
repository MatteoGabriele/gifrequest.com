<script setup lang="ts">
import { PhStar } from "@phosphor-icons/vue";

const props = defineProps<{
  repo: Repo;
  success?: boolean;
  error?: boolean;
  selected?: boolean;
  disabled?: boolean;
}>();

const value = defineModel<string | null>("value");

const labelClasses = computed(() => {
  return cn(
    "flex items-center gap-2 transition-all duration-200",
    "border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium",
    "hover:border-gray-400 hover:bg-gray-50",
    "bg-white text-gray-700",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
    {
      "bg-red-50 border-red-300 text-red-800 hover:border-red-400 hover:bg-red-50":
        props.error,
      "bg-blue-50 border-blue-300 text-blue-800 hover:border-blue-400 hover:bg-blue-50":
        props.selected,
      "bg-green-50 border-green-300 text-green-800 hover:border-green-400 hover:bg-green-50":
        props.success,
      "cursor-not-allowed": props.disabled,
    }
  );
});

const iconClasses = computed(() => {
  return cn("w-4 h-4 shrink-0 transition-colors text-gray-500", {
    "text-yellow-500": props.selected,
    "text-red-600": props.error,
    "text-green-600": props.success,
  });
});
</script>

<template>
  <label :for="repo.name" :class="labelClasses">
    <PhStar :weight="selected ? 'fill' : 'regular'" :class="iconClasses" />

    {{ repo.name }}
    <span class="bg-neutral-200 rounded-full px-2 text-xs">
      {{ repo.stars }}
    </span>

    <input
      :id="repo.name"
      :disabled
      :value="repo.name"
      type="radio"
      :name="repo.name"
      v-model="value"
      class="sr-only"
    />
  </label>
</template>
