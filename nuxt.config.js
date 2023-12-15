import dynamicRoutes from "./src/sitemapRoute";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // client-side
    public: {
      github: {
        baseUrl: "https://github.com/",
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },
  css: ["~/assets/scss/index.scss"],
  modules: [
    // ...
    "@pinia/nuxt",
    "@funken-studio/sitemap-nuxt-3",
    "@nuxtjs/robots",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "~/assets/scss/base/variables.scss";
          @import "~/assets/scss/base/keyframes.scss";
          @import "~/assets/scss/base/mixins.scss";
          @import "~/assets/scss/base/transitions.scss";
          `,
        },
      },
    },
  },

  image: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },

  sitemap: {
    hostname: "https://blogcreator.blog",
    cacheTime: 1,
    routes: dynamicRoutes,
  },
  robots: {
    UserAgent: "*",
    Allow: "/",
  },
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      title: "Blog Creator's World",
      meta: [
        {
          name: "google-site-verification",
          content: "u-DbnFBeB6xIAu-je_UUdxZqhT4NwXitusf8l6gN2Jk",
        },
        {
          name: "naver-site-verification",
          content: "0a206cd8c8459d557904dab8b1a699db97b2aa45",
        },
        {
          hid: "og:locale",
          property: "og:locale",
          content: "ko_KR",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    },
  },
});
