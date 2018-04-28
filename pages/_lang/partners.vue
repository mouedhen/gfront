<template>
  <div class="container" style="padding: 1rem 1rem 2rem 1rem">
    <div class="notice_container">
      <el-card>
        <h1 style="text-align: center">{{$t('partners')}}</h1>
        <div style="text-align: center">
          <img width="100%" src="/images/EED.jpg" />
        </div>
        <part-ar v-if="locale==='ar'"/>
        <part-fr v-else-if="locale=== 'fr'"/>
        <part-en v-else/>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import PartAr from '../../components/temp/partners/part-ar'
  import PartFr from '../../components/temp/partners/part-fr'
  import PartEn from '../../components/temp/partners/part-en'

  export default {
    name: "partners",
    components: {
      PartAr,
      PartFr,
      PartEn,
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
