import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const correctRepositoryName = ref<string | null | undefined>();
  const selectedRepositoryName = ref<string | null | undefined>();

  const hasSubmitted = ref<boolean>(false);
  const submit = () => {
    if (!selectedRepositoryName.value) {
      return;
    }

    hasSubmitted.value = true;
  };

  const isSelectedRepositoryCorrect = computed<boolean>(() => {
    return (
      hasSubmitted.value &&
      correctRepositoryName.value === selectedRepositoryName.value
    );
  });

  const streakCounter = ref<number>(0);
  watch(isSelectedRepositoryCorrect, (value) => {
    if (value) {
      streakCounter.value++;
    }
  });

  const reset = ({ keepStreak = false } = {}) => {
    hasSubmitted.value = false;
    selectedRepositoryName.value = null;
    correctRepositoryName.value = null;
    streakCounter.value = keepStreak ? streakCounter.value : 0;
  };

  return {
    correctRepositoryName,
    selectedRepositoryName,
    isSelectedRepositoryCorrect,
    hasSubmitted,
    submit,
    streakCounter,
    reset,
  };
});
