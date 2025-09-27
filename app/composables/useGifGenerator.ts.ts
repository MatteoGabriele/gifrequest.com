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

function fromObjectToQuerystring(obj: Record<string, unknown>): string {
  return Object.keys(obj)
    .reduce<string[]>((acc, key) => {
      acc.push(`${key}=${obj[key]}`);
      return acc;
    }, [])
    .join("&");
}

export function useGifGenerator(
  text: Ref<string | undefined>,
  {
    limit = 5,
  }: {
    limit?: number;
  }
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

    const searchUrl = `https://tenor.googleapis.com/v2/search?${searchQuery}`;

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
