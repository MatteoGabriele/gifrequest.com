<script setup lang="ts">
import Gif from "@/components/Gif.vue";
import { PhArrowClockwise } from "@phosphor-icons/vue";

const ANSWER_AMOUNT = 4;

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

const {
  execute,
  data: gifUrls,
  pending,
} = useGifGenerator(answerName, {
  limit: ANSWER_AMOUNT,
});
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

async function getRandomStarredRepos(): Promise<Repo[]> {
  const per_page = 30;
  const maxPages = Math.floor(1000 / per_page);
  const randomPage = Math.floor(Math.random() * maxPages) + 1;

  const url = `https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc&per_page=${per_page}&page=${randomPage}`;

  const data = await $fetch<GithubResponse>(url);

  if (!data.items) {
    return [];
  }

  const shuffled = data.items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, ANSWER_AMOUNT).map((r) => ({
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

onMounted(() => {
  loadRepos();
});

const hasSubmitted = ref<boolean>(false);
function handleAnswer(): void {
  hasSubmitted.value = true;
}

function getStatus(name: string): "success" | "selected" | undefined {
  if (name === answerName.value && hasSubmitted.value) {
    return "success";
  }

  if (name === selectedRepoName.value) {
    return "selected";
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="pending">searching...</div>
    <div
      v-else-if="currentGif"
      class="flex flex-col gap-2 justify-center items-center p-6"
    >
      <header class="mb-6 text-center">
        <h1 class="text-6xl text-neutral-100 font-bold font-display">GifHub</h1>
        <p class="text-neutral-500 text-lg">
          Push your knowledge, pull the right repo
        </p>
      </header>
      <div
        class="relative overflow-hidden min-w-[480px] rounded-4xl shadow-[0_10px_40px_4px_rgba(0,0,0,0.4)] bg-neutral-100"
      >
        <Gif :url="currentGif" :key="currentGif" />
        <div class="relative border-t-1 border-t-neutral-200">
          <button
            class="bottom-6 right-6 absolute hover:scale-110 duration-200 transition-transform size-12 bg-white text-neutral-800 flex items-center justify-center rounded-full shadow-[0_0_10px_4px_rgba(0,0,0,0.3)]"
            @click="refreshGif"
          >
            <PhArrowClockwise weight="bold" :size="24" />
          </button>
        </div>
      </div>

      <form @submit.prevent="handleAnswer" class="mt-6">
        <ul class="grid grid-cols-2 gap-2">
          <li v-for="repo in repos" :key="repo.name">
            <CheckboxButton
              name="repo"
              :disabled="hasSubmitted"
              v-model:selected="selectedRepoName"
              :status="getStatus(repo.name)"
              :value="repo.name"
            >
              {{ repo.name }}
            </CheckboxButton>
          </li>
        </ul>
        <button
          :disabled="!selectedRepoName"
          class="w-full rounded-full px-6 py-4 bg-black text-white mt-6 disabled:opacity-20"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
