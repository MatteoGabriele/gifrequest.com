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
  url: string;
};

export default function useRepos() {
  return useAsyncData(
    () => {
      const perPage = 4;
      const maxPages = Math.floor(1000 / perPage);
      const page = Math.floor(Math.random() * maxPages) + 1;
      const query = fromObjectToQuerystring({
        q: [
          "stars:>200",
          "pushed:>2024-01-01",
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
      transform: (data) => {
        return shuffle(data.items).map((r) => ({
          name: r.name,
          stars: r.stargazers_count,
          url: r.html_url,
        }));
      },
    }
  );
}
