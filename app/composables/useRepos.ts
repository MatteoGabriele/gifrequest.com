export type GithubResponseRepo = {
  name: string;
  stargazers_count: number;
  html_url: string;
};

export type GithubResponse = {
  items: GithubResponseRepo[];
};

export type Repo = {
  name: string;
  stars: number;
};

export default function useRepos() {
  return useAsyncData(
    "repos",
    () => {
      const perPage = 4;

      const starRanges = shuffle(["stars:>200", "stars:>500", "stars:>1000"]);
      const selectedStarRange = starRanges[0];

      const maxPages = Math.floor(1000 / perPage);
      const page = Math.floor(Math.random() * maxPages) + 1;

      const query = fromObjectToQuerystring({
        q: [
          selectedStarRange,
          "pushed:>2020-01-01",
          "fork:false",
          "archived:false",
        ].join(" "),
        sort: "stars",
        order: "desc",
        per_page: perPage,
        page,
      });

      const url = `https://api.github.com/search/repositories?${query}`;

      return $fetch<GithubResponse>(url);
    },
    {
      default: () => [],
      transform: (data): Repo[] => {
        return data.items.map((r) => ({
          name: r.name,
          stars: r.stargazers_count,
        }));
      },
    }
  );
}
