import snakecase from "lodash.snakecase";

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

export function useGifs(searchTerm: MaybeRef<string | undefined>) {
  const { tenorKey } = useRuntimeConfig().public;
  const searchTermRef = ref(searchTerm);

  async function loadGifs(): Promise<string[] | undefined> {
    if (!searchTermRef.value) {
      return;
    }

    const clientkey = "repo_roulette";
    const searchQuery = fromObjectToQuerystring({
      q: snakecase(searchTermRef.value).replaceAll("_", " "),
      key: tenorKey,
      client_key: clientkey,
      limit: 5,
      ar_range: "standard",
    });

    console.log(searchQuery);

    const response = await $fetch<TenorResponse>(
      `https://tenor.googleapis.com/v2/search?${searchQuery}`
    );

    return response.results.map((result) => {
      return result.media_formats.mediumgif.url;
    });
  }

  return useAsyncData("gifs", loadGifs, {
    watch: [searchTermRef],
  });
}
