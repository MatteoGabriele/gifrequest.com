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

type useGifGeneratorReturn = {
  generate: (
    searchTerm: MaybeRef<string | undefined>
  ) => Promise<string[] | undefined>;
};

export function useGifGenerator(): useGifGeneratorReturn {
  const { tenorKey } = useRuntimeConfig().public;

  async function generate(
    searchTerm: MaybeRef<string | undefined>
  ): Promise<string[] | undefined> {
    const searchTermRaw = unref(searchTerm);
    if (!searchTermRaw) {
      return;
    }

    const clientkey = "repo_roulette";
    const searchQuery = fromObjectToQuerystring({
      q: searchTermRaw,
      key: tenorKey,
      client_key: clientkey,
      limit: 5,
      ar_range: "standard",
    });

    const response = await $fetch<TenorResponse>(
      `https://tenor.googleapis.com/v2/search?${searchQuery}`
    );

    return response.results.map((result) => {
      return result.media_formats.mediumgif.url;
    });
  }

  return {
    generate,
  };
}
