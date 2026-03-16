import { init } from "@plausible-analytics/tracker";

export default defineNuxtPlugin({
  name: "plausible",
  setup() {
    init({
      domain: "gifrequest.com",
    });
  },
});
