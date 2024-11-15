import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Japan Calendar API",
  description: "Document",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "ホーム", link: "/" },
      { text: "リファレンス", link: "/reference" },
      { text: "Swagger UI", link: "https://jpcal.rest/v1/ui" },
      { text: "Playground", link: "https://playground.jpcal.rest/holiday" },
    ],

    sidebar: [
      {
        text: "リファレンス",
        items: [{ text: "祝日API", link: "/reference/holiday" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/YuheiFUJITA" }],
  },
});
