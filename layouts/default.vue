<template>
  <div class="app" :dir="direction">

    <el-menu
      class="top-bar"
      mode="horizontal"
      background-color="#b71c1c"
      text-color="#f2f2f2"
      active-text-color="#f2f2f2">
      <el-menu-item index="1"><i class="el-icon-menu" @click="showMenu"></i></el-menu-item>
      <el-menu-item index="2" @click="goHome" style="text-transform: uppercase; font-weight: bold">
        {{$t('goulelhom')}}
      </el-menu-item>
      <div class="lang-header">
        <div class="nav-lang"
             v-for="(locale, index) in locales"
             :key="index">
          <nuxt-link
            style="color: #47494e"
            :to="{ name: $route.name, params: { lang: locale }}">
            {{ locale }}
          </nuxt-link>
        </div>
      </div>
    </el-menu>

    <side-bar/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SideBar from '@/components/base/SideBar'
  import AppFooter from '@/components/shared/AppFooter'

  export default {
    components: {
      SideBar,
      AppFooter,
    },
    mounted() {
      if (process.browser) {
        if (window.innerWidth < 480) {
          let menu = document.getElementById('aside');
          menu.style.display = 'none';
        }
      }
    },
    computed: {
      ...mapGetters({
        direction: 'getDirection',
        locales: 'getLocales',
        locale: 'getLocale',
      })
    },
    methods: {
      showMenu() {
        let menu = document.getElementById('aside');
        menu.style.display = 'block';
      },
      goHome() {
        this.$router.push({name: 'lang', params: {lang: this.locale}});
        if (window.innerWidth < 480) {
          let menu = document.getElementById('aside');
          menu.style.display = 'none';
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .top-bar {
    background: #b71c1c;
    &, li {
      color: #f2f2f2 !important;
    }
  }

  #aside {
    @media screen and (min-width: 480px) {
      display: block !important;
    }
  }
</style>
