type UseReposOptions = {
  amount?: number;
};

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

export default function useRepos(options?: UseReposOptions) {
  return useAsyncData(
    () => {
      const per_page = 30;
      const maxPages = Math.floor(1000 / per_page);
      const randomPage = Math.floor(Math.random() * maxPages) + 1;

      const url = `https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc&per_page=${per_page}&page=${randomPage}`;

      return $fetch<GithubResponse>(url);
    },
    {
      transform: (data) => {
        return shuffle(data.items)
          .slice(0, options?.amount ?? 4)
          .map((r) => ({
            name: r.name,
            stars: r.stargazers_count,
            url: r.html_url,
          }));
      },
    }
  );
}
