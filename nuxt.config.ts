// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
  },
})
