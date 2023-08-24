export default defineNuxtConfig({
  ssr: false,
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "Cocktails App",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },
  },
});
