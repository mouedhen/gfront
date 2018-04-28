<template>
  <footer class="clearfix">

    <div class="lang-container">
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

    <div class="footer-links">

      <div class="footer-menu">
        <nuxt-link
          :to="{ name: 'lang-raj-tunisie', params: { lang: locale }}">
          {{ $t('raj-tunisia') }}
        </nuxt-link>
      </div>

      <div class="footer-menu">
        <nuxt-link
          :to="{ name: 'lang-partners', params: { lang: locale }}">
          {{ $t('partners') }}
        </nuxt-link>
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

      <div style="text-align: center">

        <ul class="social-icons icon-zoom list-unstyled list-inline social-footer">
          <li>
            <a href="https://www.facebook.com/GoulelHom/" target="_blank">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/goulelhom" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCNVW0ABp0EMHDKeiBKkq4pQ/featured" target="_blank">
              <i class="fa fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/GoulelHom/" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/goulel-hom/" target="_blank">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>

      </div>

      <div class="cc-license">
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
          <img alt="Licence Creative Commons"
               style="border-width:0;"
               src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"/>
        </a>
        <!--<br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Goulel'Hom</span> de <a xmlns:cc="http://creativecommons.org/ns#" href="https://www.raj-tunisie.com/" property="cc:attributionName" rel="cc:attributionURL">RAJ Tunisie</a> est mis à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">licence Creative Commons Attribution - Pas d’Utilisation Commerciale 4.0 International</a>.<br />Fondé(e) sur une œuvre à <a xmlns:dct="http://purl.org/dc/terms/" href="https://www.goulelhom.org/" rel="dct:source">https://www.goulelhom.org/</a>.-->
      </div>

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
    // width: 100%;
    padding: 0 1rem;
    // text-align: right;
    a {
      color: #f2f2f2;
      font-size: .7rem;
    }
  }

  .lang-container {
    float: left;
  }

  .footer-links {
    float: right;
    display: flex
  }

  .app[dir='rtl'] {
    .lang-container {
      float: right;
    }

    .footer-links {
      float: left;
    }
  }
</style>
