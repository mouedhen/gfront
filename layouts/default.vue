<template>
  <div class="app" :dir="direction">
    <side-bar/>
    <nuxt/>
    <app-footer />
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
    computed: {
      ...mapGetters({
        direction: 'getDirection',
      })
    },
  }
</script>
