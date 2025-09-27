type TenorResult = {
  media_formats: {
    mediumgif: {
      url: string;
    };
  };
};
type TenorResponse = {
  results: TenorResult[];
};

export function useGifGenerator(text: Ref<string | undefined>) {
  const { tenorKey } = useRuntimeConfig().public;

  async function generateGif(
    searchTerm: string | undefined
  ): Promise<string[] | undefined> {
    if (!text) {
      return;
    }

    var clientkey = "repo_roulette";
    var lmt = 5;

    var searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${tenorKey}&client_key=${clientkey}&limit=${lmt}`;

    const response = await $fetch<TenorResponse>(searchUrl);
    console.log(response);
    return response.results.map((result) => {
      return result.media_formats.mediumgif.url;
    });
  }

  return useAsyncData(() => generateGif(text.value), {
    immediate: false,
  });
}
