<template>
  <div class="container">
    <div class="notice_container">
      <h1 v-html="notice['title_'+ $i18n.locale] " style="margin-top: 0"></h1>
      <div v-html="notice['content_'+ $i18n.locale]"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        notice: 'getTermOfUse',
      }),
    },
    mounted() {
      this.$store.dispatch('fetchPublicNotices');
    }
  }
</script>

<style scoped>
  .container {
    background: #fff;
    padding: 1rem;
  }

  p {
    line-height: 1.3rem;
  }
</style>
