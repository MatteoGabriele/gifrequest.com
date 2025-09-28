<script setup lang="ts">
import { PhGitFork } from "@phosphor-icons/vue";

const { data: repos, pending: pendingRepos } = useRepos();
const answer = computed<Repo | undefined>(() => {
  if (!repos.value) {
    return;
  }

  return shuffle(repos.value)[0];
});
const answerName = computed<string | undefined>(() => answer.value?.name);
const selectedRepoName = ref<string | undefined>();

const { generate } = useGifGenerator();
const { data: gifs, pending: pendingGifs } = useAsyncData(
  () => {
    return generate(answerName);
  },
  {
    watch: [answerName],
  }
);

const hasSubmitted = ref<boolean>(false);
function handleAnswer(): void {
  hasSubmitted.value = true;
}

type CheckboxSatus = "success" | "selected" | undefined;
function getCheckboxStatus(name: string): CheckboxSatus {
  if (name === answerName.value && hasSubmitted.value) {
    return "success";
  }

  if (name === selectedRepoName.value) {
    return "selected";
  }
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <Confetti v-if="hasSubmitted && selectedRepoName === answerName" />

    <div
      class="flex h-full flex-1 flex-col gap-2 justify-center items-center p-6"
    >
      <header class="mt-4 md:mt-8 mb-6 text-center">
        <h1 class="text-6xl text-neutral-800 font-bold font-display mb-2">
          GifRequest
        </h1>
        <p class="text-neutral-400">Push your knowledge, pull the right repo</p>
      </header>

      <MainLoader v-if="pendingRepos || pendingGifs" />
      <template v-else>
        <Gif
          v-show="hasSubmitted && selectedRepoName === answerName"
          key="success"
          url="https://media1.tenor.com/m/0Sh7u1lRsyEAAAAC/wedding-crasher-hro.gif"
        />
        <Gif
          v-show="hasSubmitted && selectedRepoName !== answerName"
          key="error"
          url="https://media1.tenor.com/m/DKj_JQhjAo8AAAAd/wrong-incorrect.gif"
        />

        <GifSlider v-if="!hasSubmitted" key="slider" :gifs="gifs" />

        <div class="mt-2 text-center">
          <p class="text-neutral-600 text-sm">
            Pick the repository that matches the GIF
          </p>
        </div>

        <form
          @submit.prevent="handleAnswer"
          class="mt-2 flex flex-col items-center justify-center"
        >
          <ul class="grid sm:grid-cols-2 gap-2">
            <li v-for="repo in repos" :key="repo.name">
              <CheckboxButton
                name="repo"
                :disabled="hasSubmitted"
                v-model:selected="selectedRepoName"
                :status="getCheckboxStatus(repo.name)"
                :value="repo.name"
              >
                {{ repo.name }}
                <span class="bg-neutral-200 rounded-full px-2 text-xs">{{
                  repo.stars
                }}</span>
              </CheckboxButton>
            </li>
          </ul>

          <button
            :disabled="!selectedRepoName"
            class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-700 shadow-sm transition-all duration-200 mt-6 disabled:cursor-not-allowed flex items-center justify-center"
            type="submit"
          >
            <span class="flex items-center gap-2">
              <PhGitFork />
              Fork it
            </span>
          </button>
        </form>
      </template>
    </div>

    <MainFooter />
  </div>
</template>
