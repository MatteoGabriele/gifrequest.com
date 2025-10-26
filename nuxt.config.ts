import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/fonts", "@nuxt/image", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  image: {
    provider: "ipx",
    domains: [
      "media1.tenor.com",
      "media2.tenor.com",
      "media3.tenor.com",
      "media4.tenor.com",
    ],
    netlify: {
      baseURL: "",
    },
  },

  runtimeConfig: {
    public: {
      tenorKey: "",
    },
  },

  app: {
    head: {
      title: "GifRequest — Merge Your Memes",
      meta: [
        { property: "og:title", content: "GifRequest — Merge Your Memes" },
        {
          property: "og:description",
          content: "Push your limits, pull the right repo.",
        },
        {
          property: "og:image",
          content: "/gifrequest.jpg",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon-dark.svg",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon-light.svg",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
