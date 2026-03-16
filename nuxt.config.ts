import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/fonts", "@nuxt/image", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  image: {
    provider: "none",
  },

  runtimeConfig: {
    public: {
      tenorKey: "",
    },
  },

  plugins: ["~/plugins/plausible.client"],

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
    optimizeDeps: {
      include: [
        "@phosphor-icons/vue",
        "vue-confetti-explosion",
        "clsx",
        "tailwind-merge",
        "lodash.snakecase",
        "@plausible-analytics/tracker",
      ],
    },
  },
});
