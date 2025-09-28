<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";
</script>

<template>
  <div
    class="fixed flex pointer-events-none items-center justify-center z-50 w-screen h-screen left-1/2 -translate-x-1/2 overflow-hidden"
  >
    <ConfettiExplosion
      :particleCount="200"
      :force="0.3"
      class="w-full h-full"
    />
  </div>
</template>
