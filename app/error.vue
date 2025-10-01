<script setup lang="ts">
import type { NuxtError } from "#app";
import { PhGitBranch } from "@phosphor-icons/vue";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center h-screen p-6">
    <div
      class="w-full max-w-lg gap-4 flex items-center justify-center flex-col"
    >
      <div class="w-full">
        <GifContainer>
          <Gif
            url="https://media1.tenor.com/m/0iaAOtOyrY4AAAAC/you-need-to-relax-will-ferrell.gif"
          />
        </GifContainer>
      </div>

      <p class="text-center text-neutral-600 text-balance">
        You are most likely a developer, I don't need to tell you that shit
        happens.
      </p>

      <button
        @click="handleError"
        class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 text-white font-medium text-sm border border-green-500 transition-all duration-200"
      >
        <span class="flex items-center gap-2">
          <PhGitBranch />
          Open a new gif request
        </span>
      </button>
    </div>
  </div>
</template>
