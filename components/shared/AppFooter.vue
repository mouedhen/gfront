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

    <div>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
        <img alt="Licence Creative Commons"
             style="border-width:0; margin-top: .8rem"
             src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"/>
      </a>
      <!--<br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Goulel'Hom</span> de <a xmlns:cc="http://creativecommons.org/ns#" href="https://www.raj-tunisie.com/" property="cc:attributionName" rel="cc:attributionURL">RAJ Tunisie</a> est mis à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">licence Creative Commons Attribution - Pas d’Utilisation Commerciale 4.0 International</a>.<br />Fondé(e) sur une œuvre à <a xmlns:dct="http://purl.org/dc/terms/" href="https://www.goulelhom.org/" rel="dct:source">https://www.goulelhom.org/</a>.-->
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
