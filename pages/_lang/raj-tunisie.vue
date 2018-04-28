<template>
  <div class="container" style="padding: 1rem 1rem 2rem 1rem">
    <div class="notice_container">
      <el-card>
        <div style="text-align: center">
          <img width="100%" src="/images/logo-raj.jpg" />
        </div>
        <raj-ar v-if="locale==='ar'"/>
        <raj-fr v-else-if="locale=== 'fr'"/>
        <raj-en v-else/>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import RajAr from '../../components/temp/raj-tunisie/raj-ar'
  import RajFr from '../../components/temp/raj-tunisie/raj-fr'
  import RajEn from '../../components/temp/raj-tunisie/raj-en'

  export default {
    name: "raj-tunisie",
    components: {
      RajAr,
      RajFr,
      RajEn,
    },
    computed: {
      ...mapGetters({
        locale: 'getLocale'
      })
    }
  }
</script>

<style scoped>

</style>
