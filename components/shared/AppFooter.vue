<template>
  <footer>
    <div class="nav-lang"
         v-for="(locale, index) in locales"
         :key="index">
      <nuxt-link
        style="color: #47494e"
        :to="{ name: 'lang', params: { lang: locale }}">
        {{ locale }}
      </nuxt-link>
    </div>
  </footer>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        locales: 'getLocales',
      })
    },
  }
</script>
