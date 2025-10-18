<script setup lang="ts">
import {
  PhArrowRight,
  PhGitBranch,
  PhGitMerge,
  PhSpinner,
} from "@phosphor-icons/vue";

const {
  data: repos,
  error: errorRepos,
  pending: pendingRepos,
  refresh,
} = await useRepos();

if (errorRepos.value) {
  throw createError(errorRepos.value);
}

const repoName = computed<string | undefined>(() => {
  return shuffle(repos.value)[0]?.name;
});

const hasSubmitted = ref<boolean>(false);
function handleSubmit(): void {
  hasSubmitted.value = true;
}

const selectedAnswer = ref<string | null>();
const isCorrect = computed<boolean>(() => {
  return hasSubmitted.value && selectedAnswer.value === repoName.value;
});

type Status = "idle" | "success" | "error";

const gameStatus = computed<Status>(() => {
  if (!hasSubmitted.value) {
    return "idle";
  }

  return isCorrect.value ? "success" : "error";
});

const streakCount = ref<number>(0);
watch(isCorrect, (value) => {
  if (value) {
    streakCount.value++;
  }
});

async function handleNext() {
  await refresh();
  hasSubmitted.value = false;
  selectedAnswer.value = null;
}

async function handleRetry() {
  await refresh();
  streakCount.value = 0;
  hasSubmitted.value = false;
  selectedAnswer.value = null;
}
</script>

<template>
  <NuxtLayout>
    <Confetti v-if="hasSubmitted && selectedAnswer === repoName" />

    <div class="w-full sm:max-w-lg 2xl:max-w-3xl">
      <GameStatusGif v-if="hasSubmitted" :is-correct="isCorrect" />
      <GifSlider v-else :name="repoName" />
    </div>

    <StatusMessage
      class="mt-2"
      :show-error="gameStatus === 'error'"
      :counter="streakCount"
    />

    <form
      class="mt-2 w-full sm:w-auto flex flex-col items-center justify-center"
      @submit.prevent="handleSubmit"
    >
      <ul class="grid w-full sm:grid-cols-2 gap-2 max-w-4xl">
        <li v-for="repo in repos" :key="repo.name">
          <AnswerButton
            type="button"
            v-model:value="selectedAnswer"
            :repo="repo"
            :error="hasSubmitted && repoName === repo.name"
            :success="hasSubmitted && selectedAnswer === repo.name"
            :selected="selectedAnswer === repo.name"
            :disabled="hasSubmitted"
          />
        </li>
      </ul>

      <div class="mt-6 text-center">
        <button
          v-if="hasSubmitted && isCorrect"
          @click="handleNext"
          class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-500 transition-all duration-200 disabled:cursor-not-allowed"
        >
          <span class="flex items-center gap-2">
            <PhSpinner class="animate-spin" v-if="pendingRepos" />
            <PhArrowRight v-else />
            Next request
          </span>
        </button>

        <button
          class="rounded-md px-6 py-2 active:scale-95 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-medium text-sm border border-green-500 transition-all duration-200 disabled:cursor-not-allowed"
          v-else-if="hasSubmitted && !isCorrect"
          @click="handleRetry"
        >
          <span class="flex items-center gap-2">
            <PhSpinner class="animate-spin" v-if="pendingRepos" />
            <PhGitBranch v-else />
            Rebase and Retry
          </span>
        </button>
        <button
          v-else
          type="submit"
          :disabled="!selectedAnswer"
          :class="
            cn(
              'rounded-md px-6 py-2 active:scale-95 bg-green-100 text-green-700 font-medium text-sm border border-green-500 transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600',
              {
                'bg-green-600 hover:bg-green-700 text-white': selectedAnswer,
              }
            )
          "
        >
          <span class="flex items-center gap-2">
            <PhGitMerge />
            Merge
          </span>
        </button>
      </div>
    </form>
  </NuxtLayout>
</template>
