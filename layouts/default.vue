<template>
  <div class="app" :dir="direction">
    <aside class="navbar">
      <button @click="changeDirection">TO RTL</button>
      <nav>
        <h1>GOULELHOM</h1>
        <h2>CLIAMS</h2>
      </nav>
    </aside>

    <nuxt/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        //
      }
    },
    computed: {
      ...mapGetters({
        direction: 'getDirection'
      })
    },
    methods: {
      changeDirection() {
        if (this.direction === 'rtl') {
          this.$store.dispatch('setDirection', {direction: 'tlr'});
          return
        }
        this.$store.dispatch('setDirection', {direction: 'rtl'});
      }
    }
  }
</script>
