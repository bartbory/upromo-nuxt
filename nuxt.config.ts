// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  plugins: ["@/plugins/vue-gtag"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
});
