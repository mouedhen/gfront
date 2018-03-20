<template>
  <nav class="navbar">
    <div class="row home" v-bind:class="[activeMenu === 'home' ? 'active' : '']">

      <nuxt-link :to="{ name: 'lang', params: { lang: locale }}">
        <div class="title-container">
          <div class="nav-icons">
            <svg class="icon icon-camera" style="width: 90px">
              <use href="/images/svg/sprite.svg#logotype"></use>
            </svg>
          </div>
          <div>
            <h1 class="navtitle">{{ $t('navigation.home.title') }}</h1>
          </div>
        </div>
      </nuxt-link>

      <div>
        <p>{{ $t('navigation.home.description') }}</p>
        <p>{{ $t('navigation.home.description_2') }}</p>
      </div>
    </div>

    <div class="row"  v-bind:class="[activeMenu === 'complains' ? 'active' : '']">
      <nuxt-link :to="{ name: 'lang-complains', params: { lang: locale }}">
        <div class="title-container">
          <div class="nav-icons">
            <svg class="icon icon-camera">
              <use href="/images/svg/symbol-defs.svg#icon-camera"></use>
            </svg>
          </div>
          <div style="width: 100%">
            <h1 class="navtitle">{{ $t('navigation.complains.title') }}</h1>
          </div>
        </div>
      </nuxt-link>
      <div>
        <p>{{ $t('navigation.complains.description') }}</p>
      </div>

    </div>

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>

    <div class="row"  v-bind:class="[activeMenu === 'press' ? 'active' : '']">
      <nuxt-link :to="{ name: 'lang-press', params: { lang: locale }}">
        <div class="title-container">
          <div class="nav-icons">
            <svg class="icon icon-bullhorn">
              <use href="/images/svg/symbol-defs.svg#icon-bullhorn"></use>
            </svg>
          </div>
          <div style="width: 100%">
            <h1 class="navtitle">{{ $t('navigation.press.title') }}</h1>
          </div>
        </div>
      </nuxt-link>
      <div>
        <p>{{ $t('navigation.press.description') }}</p>
      </div>

    </div>

  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "side-bar",
    data() {
      return {
        //
      }
    },
    computed: {
      ...mapGetters({
        locale: 'getLocale',
      }),
      activeMenu: function () {
        let name = this.$route.name;
        if (name === 'index' || name === 'lang') return 'home'
        if (name === 'complains' || name === 'lang-complains') return 'complains'
        if (name === 'press' || name === 'lang-press') return 'press'
      }
    },
    methods: {
      changeDirection() {
        if (this.$store.state.config.direction === 'rtl') {
          this.$store.dispatch('setDirection', {direction: 'tlr'});
          return
        }
        this.$store.dispatch('setDirection', {direction: 'rtl'});
      }
    },
    mounted() {
      console.log(this.$route.name)
      console.log(this.$router.options.routes)
    }
  }
</script>

