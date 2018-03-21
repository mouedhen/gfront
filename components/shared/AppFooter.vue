<template>
  <footer style="display: flex; align-items: center; justify-content: flex-end;">
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

<style lang="scss" scoped>
  .footer-menu {
    width: 100%;
    padding: 0 2rem;
    text-align: right;
    a {
      color: #f2f2f2;
    }
  }
  .app[dir='rtl'] {
    .footer-menu {
      width: 100%;
      text-align: left;
    }
  }
</style>
