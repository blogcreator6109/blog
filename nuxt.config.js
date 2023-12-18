import dynamicRoutes from "./src/sitemapRoute";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // client-side
    public: {
      github: {
        BASE_URL: "https://github.com/",
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      },
      firebase: {
        API_KEY: process.env.FIREBASE_API_KEY,
        AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        DATABASE_URL: process.env.FIREBASE_DATABASE_RUL,
        PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        APP_ID: process.env.FIREBASE_APP_ID,
        MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
        DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      },
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

  plugins: ["~/plugins/firebase.js"],

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
      title: "Blog Creator's blog",
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
