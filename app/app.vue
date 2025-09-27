<script setup lang="ts">
import Gif from "./components/Gif.vue";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  const result: T[] = [];

  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const spliced = copy.splice(randomIndex, 1);
    if (spliced.length > 0 && spliced[0]) {
      result.push(spliced[0]);
    }
  }

  return result;
}

const userName = ref<string>("MatteoGabriele");

type Repo = {
  name: string;
  url: string;
};

type Response = {
  name: string;
  html_url: string;
};

const repos = ref<Repo[]>([]);
const answer = ref<Repo | undefined>();
const answerName = computed<string | undefined>(() => answer.value?.name);
const selectedRepoName = ref<string | undefined>();

const { execute, data: gifUrls, pending } = useGifGenerator(answerName);
const currentGifIndex = ref<number>(0);
const currentGif = computed<string | undefined>(() => {
  return gifUrls.value?.[currentGifIndex.value];
});
function refreshGif(): void {
  if (!gifUrls.value) {
    return;
  }

  if (currentGifIndex.value >= gifUrls.value.length - 1) {
    currentGifIndex.value = 0;
  } else {
    currentGifIndex.value++;
  }
}

async function handleSubmit(): Promise<void> {
  const response = await $fetch<Response[]>(
    `https://api.github.com/users/${userName.value}/repos`
  );

  const mappedRepos = response.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
  }));

  repos.value = shuffle(mappedRepos).slice(0, 5);
  answer.value = shuffle(repos.value)[0];

  return execute();
}

const hasSubmitted = ref<boolean>(false);
function handleAnswer(): void {
  hasSubmitted.value = true;
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="userName" />
      <button type="submit">Search</button>
    </form>

    <div v-if="pending">searching...</div>
    <div
      v-else-if="currentGif"
      class="flex flex-col gap-2 justify-center items-center"
    >
      <Gif :url="currentGif" :key="currentGif" />
      <button @click="refreshGif">pick another gif</button>

      <div v-if="hasSubmitted">
        <div v-if="selectedRepoName === answerName">YES!!!</div>
        <div v-else>NNNNOPE! it was {{ answerName }}</div>
      </div>
      <div v-else>
        <h1>Which repository is this?</h1>
        <form @submit.prevent="handleAnswer">
          <div v-for="repo in repos" :key="repo.name">
            <label :for="repo.name">
              <input
                :id="repo.name"
                type="radio"
                name="repo"
                :value="repo.name"
                v-model="selectedRepoName"
              />
              {{ repo.name }}
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
