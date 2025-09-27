<script setup lang="ts">
defineProps<{
  url: string;
}>();

const isPending = ref<boolean>(true);
</script>

<template>
  <div class="max-w-96 max-h-96 border">
    <div v-if="isPending">loading gif...</div>
    <img @load="isPending = false" :src="url" />
  </div>
</template>
