import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
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

  image: {},

  modules: ["@nuxt/fonts", "@nuxt/image"],
});
