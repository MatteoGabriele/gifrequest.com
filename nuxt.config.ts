import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

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
