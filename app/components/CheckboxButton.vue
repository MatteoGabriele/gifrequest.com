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
      ' border text-center flex gap-2 items-center justify-center px-8 py-4 rounded-full relative focus-within:ring focus-within:ring-blue-500',
      {
        'bg-blue-100 border-blue-300 text-neutral-800': status === 'selected',
        'bg-green-500 border-green-500 text-white': status === 'success',
        'bg-neutral-100 border-neutral-200': !status,
      },
    ]"
  >
    <PhStar
      :weight="status === 'selected' ? 'fill' : 'duotone'"
      class="text-yellow-500"
    />
    <slot />

    <input
      :id="value"
      :disabled
      :value="value"
      type="radio"
      :name="name"
      v-model="selected"
      class="opacity-0 absolute"
    />
  </label>
</template>
