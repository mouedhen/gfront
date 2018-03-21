<template>
  <footer style="display: flex; align-items: center">
    <div class="nav-lang"
         v-for="(locale, index) in locales"
         :key="index">
      <nuxt-link
        style="color: #47494e"
        :to="{ name: $route.name, params: { lang: locale }}">
        {{ locale }}
      </nuxt-link>
    </div>
    <div class="footer-menu">
      <nuxt-link
        :to="{ name: 'lang-contact-us', params: { lang: locale }}">
        {{ $t('contact us') }}
      </nuxt-link>
    </div>

  </footer>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    mounted() {
      console.log(this.$route.name)
    },
    computed: {
      ...mapGetters({
        locales: 'getLocales',
        locale: 'getLocale',
      })
    },
  }
</script>

<style scoped>
  .footer-menu {
    margin: 0 2rem;
    a {
      color: #f2f2f2;
    }
  }
</style>
