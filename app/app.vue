<script setup lang="ts">
import { PhArrowClockwise, PhGitFork } from "@phosphor-icons/vue";

const ANSWER_AMOUNT = 4;

type GithubResponseRepo = {
  name: string;
  stargazers_count: number;
  html_url: string;
};

type GithubResponse = {
  items: GithubResponseRepo[];
};

type Repo = {
  name: string;
  stars: number;
  url: string;
};

const repos = ref<Repo[]>([]);
const answer = ref<Repo | undefined>();
const answerName = computed<string | undefined>(() => answer.value?.name);
const selectedRepoName = ref<string | undefined>();

const { generate } = useGifGenerator();
const { execute, data: gifs } = await useAsyncData(() => generate(answerName));

async function getRandomStarredRepos(): Promise<Repo[]> {
  const perPage = 30;
  const maxPages = Math.floor(1000 / perPage);
  const randomPage = Math.floor(Math.random() * maxPages);

  const query = fromObjectToQuerystring({
    q: "stars:>=500",
    per_page: perPage,
    page: randomPage,
  });

  const url = `https://api.github.com/search/repositories?${query}`;

  const data = await $fetch<GithubResponse>(url);

  if (!data.items) {
    return [];
  }

  return shuffle(data.items)
    .slice(0, ANSWER_AMOUNT)
    .map((r) => ({
      name: r.name,
      stars: r.stargazers_count,
      url: r.html_url,
    }));
}

async function loadRepos() {
  const response = await getRandomStarredRepos();

  repos.value = response;
  answer.value = shuffle(response)[0];

  return execute();
}

const { pending } = await useAsyncData(() => loadRepos(), {
  lazy: true,
  server: false,
});

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
  <Confetti v-if="hasSubmitted && selectedRepoName === answerName" />
  <div class="flex flex-col h-screen">
    <div
      class="flex h-full flex-1 flex-col gap-2 justify-center items-center p-6"
    >
      <header class="mt-4 md:mt-8 mb-6 text-center">
        <h1 class="text-6xl text-neutral-800 font-bold font-display mb-2">
          GifRequest
        </h1>
        <p class="text-neutral-400">Push your knowledge, pull the right repo</p>
      </header>

      <MainLoader v-if="pending" />
      <template v-else>
        <Gif
          v-if="hasSubmitted && selectedRepoName === answerName"
          key="success"
          url="https://media1.tenor.com/m/0Sh7u1lRsyEAAAAC/wedding-crasher-hro.gif"
        />
        <Gif
          v-else-if="hasSubmitted && selectedRepoName !== answerName"
          key="error"
          url="https://media1.tenor.com/m/DKj_JQhjAo8AAAAd/wrong-incorrect.gif"
        />
        <GifSlider v-else key="slider" :gifs="gifs" />

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
