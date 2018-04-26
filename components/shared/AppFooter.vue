<template>
  <footer>
    <div style="width: 460px">
      <div class="nav-lang"
           v-for="(locale, index) in locales"
           :key="index">
        <nuxt-link
          style="color: #47494e"
          :to="{ name: currentRoute, params: { lang: locale }}">
          {{ locale }}
        </nuxt-link>
      </div>
    </div>
    <div class="footer-menu">
      <nuxt-link
        :to="{ name: 'lang-term-of-uses', params: { lang: locale }}">
        {{ $t('term of use') }}
      </nuxt-link>
    </div>
    <div class="footer-menu">
      <nuxt-link
        :to="{ name: 'lang-confidentiality-and-cookies', params: { lang: locale }}">
        {{ $t('confidentiality and cookies') }}
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
    data() {
      return {
        currentRoute: '',
      }
    },
    mounted() {
      this.currentRoute = (this.$route.name !== 'index' ? this.$route.name : 'lang');
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
      font-size: .7rem;
    }
  }

  .app[dir='rtl'] {
    .footer-menu {
      width: 100%;
      text-align: left;
    }
  }
</style>
