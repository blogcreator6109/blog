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

  routerRules: {
    "/": { prerender: true },
    "/post/*": {
      cache: {
        maxAge: 60 * 60 * 3, // 3시간
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
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/ico",
          href: "/favicon.ico",
        },
      ],

      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          async: true,
          crossorigin: "anonymous",
          "data-ad-client": "ca-pub-4009482052735536",
        },
      ],
    },
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },
});
