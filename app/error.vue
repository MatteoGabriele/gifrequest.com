<script setup lang="ts">
import type { NuxtError } from "#app";
import { PhGitBranch, PhHourglass } from "@phosphor-icons/vue";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });

const countdown = ref<number>(10);
let interval: number | undefined;

onMounted(() => {
  interval = setInterval(() => {
    if (countdown.value <= 0) {
      clearInterval(interval);
      return;
    }
    countdown.value = countdown.value - 1;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center h-screen p-6">
    <div
      class="w-full max-w-lg gap-4 flex items-center justify-center flex-col"
    >
      <div class="w-full">
        <Gif
          src="https://media1.tenor.com/m/0iaAOtOyrY4AAAAC/you-need-to-relax-will-ferrell.gif"
        />
      </div>

      <div class="text-center text-neutral-600 text-sm text-balance">
        <p>Hey stop smashing that button so fast!</p>
        <p>I'm using free services. Calm down!</p>
      </div>

      <button
        @click="handleError"
        class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 text-white font-medium text-sm border border-green-500 transition-all duration-200"
      >
        <span class="flex items-center gap-2">
          <template v-if="countdown">
            <PhHourglass class="animate-pulse" />
            Retry in {{ countdown }} second{{ countdown === 1 ? "" : "s" }}
          </template>
          <template v-else>
            <PhGitBranch />
            Open a new gif request
          </template>
        </span>
      </button>
    </div>
  </div>
</template>
