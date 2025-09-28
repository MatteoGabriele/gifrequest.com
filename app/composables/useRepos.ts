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

const ITEMS_COUNT = 4;

export default function useRepos() {
  return useAsyncData(
    () => {
      const perPage = 30;
      const maxPages = Math.floor(1000 / perPage);
      const randomPage = Math.floor(Math.random() * maxPages);

      const query = fromObjectToQuerystring({
        q: "stars:>=500",
        per_page: perPage,
        page: randomPage,
      });

      const url = `https://api.github.com/search/repositories?${query}`;

      return $fetch<GithubResponse>(url);
    },
    {
      transform: (data) => {
        return shuffle(data.items)
          .slice(0, ITEMS_COUNT)
          .map((r) => ({
            name: r.name,
            stars: r.stargazers_count,
            url: r.html_url,
          }));
      },
    }
  );
}
