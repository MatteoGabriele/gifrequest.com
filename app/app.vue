<script setup lang="ts">
import { PhArrowRight, PhGitBranch, PhGitMerge } from "@phosphor-icons/vue";
import { useGameStore } from "~/store/game";

const { data, error, pending, refresh } = await useRepos();

const gameStore = useGameStore();

if (error.value) {
  throw createError(error.value);
}

gameStore.correctRepositoryName = data.value[0]?.name;

watch(
  () => data.value,
  (value) => {
    gameStore.correctRepositoryName = shuffle(value)[0]?.name;
  }
);

const handleNext = async () => {
  gameStore.reset({ keepStreak: true });
  await refresh();
};

const handleRetry = async () => {
  gameStore.reset();
  await refresh();
};
</script>

<template>
  <NuxtLayout>
    <Confetti v-if="gameStore.isSelectedRepositoryCorrect" />

    <div class="w-full sm:max-w-lg 2xl:max-w-3xl aspect-video">
      <GameStatusGif v-if="gameStore.hasSubmitted" />
      <GifSlider v-else :name="gameStore.correctRepositoryName" />
    </div>

    <StatusMessage class="mt-2" />

    <form
      class="mt-2 w-full sm:w-auto flex flex-col items-center justify-center"
      @submit.prevent="gameStore.submit"
    >
      <ul class="grid w-full sm:grid-cols-2 gap-2 max-w-4xl">
        <li v-for="repo in data" :key="repo.name">
          <Repository
            v-model:value="gameStore.selectedRepositoryName"
            :repo="repo"
          />
        </li>
      </ul>

      <div class="mt-6 text-center">
        <BaseButton
          v-if="gameStore.isSelectedRepositoryCorrect"
          @click="handleNext"
          :loading="pending"
        >
          <template #icon>
            <PhArrowRight />
          </template>
          Next request
        </BaseButton>

        <BaseButton
          v-else-if="
            gameStore.hasSubmitted && !gameStore.isSelectedRepositoryCorrect
          "
          @click="handleRetry"
          :loading="pending"
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
