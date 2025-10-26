<script setup lang="ts">
defineProps<{
  showError?: boolean;
  counter: number;
}>();
</script>

<template>
  <div class="text-center text-sm">
    <div
      v-if="showError"
      class="text-red-500 flex items-center flex-col justify-center"
    >
      <p v-if="counter > 1">
        You had a {{ counter > 10 ? "amazing" : "good" }} run with
        {{ counter }} consecutive wins!
      </p>
      <p v-else>Merge aborted. You're better than this!</p>
    </div>
    <p v-else-if="counter === 1" class="text-neutral-500">
      ⚡ First merge landed, keep going!
    </p>
    <p class="text-green-600" v-else-if="counter > 1">
      🔥 {{ counter }} merges in a row and no conflicts!
    </p>
    <p v-else class="text-neutral-600">
      Pick the repository that matches the GIF
    </p>
  </div>
</template>
