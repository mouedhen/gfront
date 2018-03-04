<template>
  <nav class="navbar">
    <div class="row home" v-bind:class="[activeMenu === 'home' ? 'active' : '']">

      <div class="title-container">
        <div class="nav-icons">
          <svg class="icon icon-camera" style="width: auto">
            <use href="/images/svg/sprite.svg#logotype"></use>
          </svg>
        </div>
        <div style="width: 100%">
          <h1 class="navtitle" style="font-size: 2rem; padding-left: 16px">{{ $t('navigation.home.title') }}</h1>
        </div>
      </div>

      <div>
        <p>{{ $t('navigation.home.description') }}</p>
        <p>{{ $t('navigation.home.description_2') }}</p>
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

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>

    <div class="row">
      <h1>HELLO</h1>
      <p>this is a description</p>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "side-bar",
    data() {
      return {
        //
      }
    },
    computed: {
      routeName: function () {
        return this.$route.path
      },
      activeMenu: function () {
        return 'homee'
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
      // console.log(this.locales)
    }
  }
</script>
<style lang="scss" scoped>

</style>

