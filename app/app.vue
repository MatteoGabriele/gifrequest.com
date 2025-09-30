<script setup lang="ts">
import { PhGitMerge, PhShuffle, PhSpinner } from "@phosphor-icons/vue";

const { data: repos, pending: pendingRepos, refresh } = useRepos();
const pickedRepo = computed<Repo | undefined>(() => {
  return shuffle(repos.value)[0];
});
const pickedRepoName = computed<string | undefined>(() => {
  return pickedRepo.value?.name;
});

const { data: gifs, pending: pendingGifs } = useGifs(pickedRepoName);

const selectedRepoName = ref<string | null>();

const hasSubmitted = ref<boolean>(false);
function handleSubmit(): void {
  hasSubmitted.value = true;
}

const isAnswerCorrect = computed<boolean>(() => {
  return hasSubmitted.value && selectedRepoName.value === pickedRepoName.value;
});

async function handleNext() {
  await refresh();
  hasSubmitted.value = false;
  selectedRepoName.value = null;
}
</script>

<template>
  <NuxtLayout>
    <Confetti v-if="isAnswerCorrect" />
    <div class="flex w-full justify-center">
      <div
        class="flex items-center justify-center gap-2 text-neutral-500"
        v-if="pendingGifs || pendingRepos"
      >
        <PhSpinner class="animate-spin" />
        <span>Fetching the best repositories...</span>
      </div>

      <div
        v-else
        class="w-full flex flex-col items-center gap-2 justify-center"
      >
        <div class="w-full sm:max-w-xl 2xl:max-w-3xl">
          <GameStatusGif v-if="hasSubmitted" :is-correct="isAnswerCorrect" />
          <GifSlider v-else :items="gifs" />
        </div>

        <div class="mt-2 text-center">
          <p class="text-neutral-600 text-sm">
            Pick the repository that matches the GIF
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="mt-2 flex flex-col items-center justify-center"
        >
          <ul class="grid sm:grid-cols-2 gap-2">
            <li v-for="repo in repos" :key="repo.name">
              <AnswerButton
                v-model:value="selectedRepoName"
                :error="hasSubmitted && pickedRepoName === repo.name"
                :success="hasSubmitted && selectedRepoName === repo.name"
                :selected="selectedRepoName === repo.name"
                :disabled="hasSubmitted"
                :repo="repo"
              />
            </li>
          </ul>

          <div class="mt-6">
            <button
              class="rounded-md px-6 py-2 active:scale-95 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-purple-500 transition-all duration-200 disabled:cursor-not-allowed"
              v-if="hasSubmitted"
              @click="handleNext"
            >
              <span class="flex items-center gap-2">
                <PhShuffle />
                Fetch new repos
              </span>
            </button>
            <button
              v-else
              :disabled="!selectedRepoName"
              class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-500 transition-all duration-200 disabled:cursor-not-allowed"
              type="submit"
            >
              <span class="flex items-center gap-2">
                <PhGitMerge />
                Merge
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
