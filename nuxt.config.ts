import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  ssr: false,

  runtimeConfig: {
    public: {
      googleAiKey: "",
      tenorKey: "",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/fonts"],
});
