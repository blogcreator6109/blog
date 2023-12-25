// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // client-side
    public: {
      gtagId: "G-WWRFZC0F1B",
      siteUrl: "https://blogcreator.blog",
      github: {
        BASE_URL: "https://github.com/",
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      },
      firebase: {
        API_KEY: process.env.FIREBASE_API_KEY,
        AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
        PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        APP_ID: process.env.FIREBASE_APP_ID,
        MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
  css: ["~/assets/scss/index.scss"],
  modules: [
    // ...
    "@pinia/nuxt",
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
        { property: "og:title", content: "Blog Creator's blog" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://blogcreator.blog" },
        {
          property: "og:description",
          content: "Blog 꾸미는 걸 좋아하는 Blog Creator의 공간입니다.",
        },
        { property: "og:image", content: "/images/logo.svg" },
        { hid: "og:locale", property: "og:locale", content: "ko_KR" },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Blog Creator's blog",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Blog 꾸미는 걸 좋아하는 Blog Creator의 공간입니다.",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/images/logo.svg",
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@BlogCreator6109",
        },
      ],
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4009482052735536",
          async: true,
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
