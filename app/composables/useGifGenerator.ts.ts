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

type UseGifGeneratorOptions = {
  limit?: number;
};

export function useGifGenerator(
  text: Ref<string | undefined>,
  { limit = 5 }: UseGifGeneratorOptions
) {
  const { tenorKey } = useRuntimeConfig().public;

  async function generateGif(
    searchTerm: string | undefined
  ): Promise<string[] | undefined> {
    if (!text) {
      return;
    }

    const clientkey = "repo_roulette";
    const searchQuery = fromObjectToQuerystring({
      q: searchTerm,
      key: tenorKey,
      client_key: clientkey,
      limit,
      ar_range: "standard",
    });

    const response = await $fetch<TenorResponse>(
      `https://tenor.googleapis.com/v2/search?${searchQuery}`
    );

    return response.results.map((result) => {
      return result.media_formats.mediumgif.url;
    });
  }

  return useAsyncData(() => generateGif(text.value), {
    immediate: false,
  });
}
