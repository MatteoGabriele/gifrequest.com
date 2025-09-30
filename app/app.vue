<script setup lang="ts">
import {
  PhArrowRight,
  PhFire,
  PhGitBranch,
  PhGitMerge,
  PhSpinner,
  PhXCircle,
} from "@phosphor-icons/vue";

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

type GameStatus = "idle" | "success" | "error";
const gameStatus = computed<GameStatus>(() => {
  if (hasSubmitted.value) {
    return selectedRepoName.value === pickedRepoName.value
      ? "success"
      : "error";
  }

  return "idle";
});

const isAnswerCorrect = computed<boolean>(() => {
  return gameStatus.value === "success";
});

const streakCount = ref<number>(0);
watch(isAnswerCorrect, (value) => {
  if (value) {
    streakCount.value++;
  }
});

async function handleNext() {
  await refresh();
  hasSubmitted.value = false;
  selectedRepoName.value = null;
}

async function handleRetry() {
  await refresh();
  streakCount.value = 0;
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

        <div class="mt-2 text-center text-sm">
          <div
            v-if="gameStatus === 'success'"
            class="flex items-center gap-2 text-green-600"
          >
            <PhGitMerge weight="fill" size="20" />
            <span>Gif request successfully merged</span>
          </div>
          <div
            v-else-if="gameStatus === 'error'"
            class="flex items-center gap-2 text-red-500"
          >
            <PhXCircle weight="fill" size="20" />
            <span>Merging is blocked.</span>
          </div>
          <p v-else class="text-neutral-600">
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

          <div class="mt-6 text-center">
            <button
              v-if="gameStatus === 'success'"
              class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-500 transition-all duration-200 disabled:cursor-not-allowed"
              @click="handleNext"
            >
              <span class="flex items-center gap-2">
                <PhArrowRight />
                Next request
              </span>
            </button>

            <button
              class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-500 transition-all duration-200 disabled:cursor-not-allowed"
              v-else-if="gameStatus === 'error'"
              @click="handleRetry"
            >
              <span class="flex items-center gap-2">
                <PhGitBranch />
                Rebase and Retry
              </span>
            </button>
            <button
              v-else
              :disabled="!selectedRepoName"
              :class="
                cn(
                  'rounded-md px-6 py-2 active:scale-95 bg-green-100 text-green-700 font-medium text-sm border border-green-500 transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600',
                  {
                    'bg-green-600 hover:bg-green-700 text-white':
                      selectedRepoName,
                  }
                )
              "
              type="submit"
            >
              <span class="flex items-center gap-2">
                <PhGitMerge />
                Merge
              </span>
            </button>

            <div
              :class="
                cn('flex gap-2 items-center mt-2 opacity-0', {
                  'opacity-100': streakCount > 1,
                })
              "
            >
              <p class="text-orange-600">
                <span class="text-lg">🔥</span> {{ streakCount }} merges in a
                row!
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
