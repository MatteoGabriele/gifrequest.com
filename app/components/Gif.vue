<script setup lang="ts">
defineProps<{
  url: string | undefined;
}>();
</script>

<template>
  <div class="relative flex items-center justify-center aspect-3/2">
    <img class="absolute w-full h-full object-cover" :src="url" />
  </div>
</template>
