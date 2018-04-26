<template>
  <el-card :body-style="{ padding: '0px' }" style="position: relative">

    <div style="position: relative">
      <a :href="report.document" target="_blank">
        <img v-if="report.thumb" v-bind:src="report.thumb" alt="">
      </a>
      <!-- <pdf v-else-if="report.document"  :url="report.document" height="500px"/> -->
    </div>
    <div
      style="position: absolute; bottom: 0; background: rgba(34, 34, 34, .8); width: 100%; color: #ededed; font-weight: bold">
      <div style="margin: 1rem">
        <p>{{report.title}}</p>
        <p class="note" style="color: #ededed">{{report.description}}</p>
        <dl class="note" style="color: #a2a2a2; font-size: .8rem"
            v-bind:style="{textAlign: (locale === 'ar' ? 'left' : 'right')}">
          <dt>{{$t('Published at')}}</dt>
          <dd>{{formatDate(report.published_at)}}</dd>
          <dt>{{$t('Reporting period')}}</dt>
          <dd>{{formatDate(report.period_start_at)}} - {{formatDate(report.period_end_at)}}</dd>
        </dl>
      </div>
    </div>
  </el-card>
</template>

<script>
  import moment from 'moment'

  import 'moment/locale/fr';

  import {mapGetters} from 'vuex'

  export default {
    name: "report-card",
    props: ['report'],
    computed: {
      ...mapGetters({
        locale: 'getLocale',
      })
    },
    methods: {
      formatDate(date) {
        return moment(date).format('L')
      },
    },
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>
