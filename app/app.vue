<script setup lang="ts">
import { PhArrowRight, PhGitBranch, PhGitMerge } from "@phosphor-icons/vue";

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
  if (!selectedAnswer.value) {
    return;
  }

  hasSubmitted.value = true;
}

const selectedAnswer = ref<string | null>();
const isCorrect = computed<boolean>(() => {
  return hasSubmitted.value && selectedAnswer.value === repoName.value;
});

const streakCount = ref<number>(0);
watch(isCorrect, (value) => {
  if (value) {
    streakCount.value++;
  }
});

async function handleNext() {
  hasSubmitted.value = false;
  selectedAnswer.value = null;
  await refresh();
}

async function handleRetry() {
  streakCount.value = 0;
  hasSubmitted.value = false;
  selectedAnswer.value = null;
  await refresh();
}
</script>

<template>
  <NuxtLayout>
    <Confetti v-if="hasSubmitted && selectedAnswer === repoName" />

    <div class="w-full sm:max-w-lg 2xl:max-w-3xl aspect-video">
      <GameStatusGif v-if="hasSubmitted" :is-correct="isCorrect" />
      <GifSlider v-else :name="repoName" />
    </div>

    <StatusMessage
      class="mt-2"
      :show-error="hasSubmitted && !isCorrect"
      :counter="streakCount"
    />

    <form
      class="mt-2 w-full sm:w-auto flex flex-col items-center justify-center"
      @submit.prevent="handleSubmit"
    >
      <ul class="grid w-full sm:grid-cols-2 gap-2 max-w-4xl">
        <li v-for="repo in repos" :key="repo.name">
          <Repository
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
        <BaseButton
          v-if="hasSubmitted && isCorrect"
          @click="handleNext"
          :loading="pendingRepos"
        >
          <template #icon>
            <PhArrowRight />
          </template>
          Next request
        </BaseButton>

        <BaseButton
          v-else-if="hasSubmitted && !isCorrect"
          @click="handleRetry"
          :loading="pendingRepos"
        >
          <template #icon>
            <PhGitBranch />
          </template>
          Rebase and Retry
        </BaseButton>

        <BaseButton v-else type="submit">
          <template #icon>
            <PhGitMerge />
          </template>
          Merge
        </BaseButton>
      </div>
    </form>
  </NuxtLayout>
</template>
