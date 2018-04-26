<template>
  <div class="container">

    <div class="no-reports margin-top" v-if="reports.length < 1">
      <div>
        <p>{{$t('No reports for now, come back later')}}</p>
      </div>
    </div>

    <div v-else>
      <el-row :gutter="16" type="flex" style="flex-flow: row wrap; margin: 1rem 1rem 2rem 1rem;">
        <el-col :xs="24" :sm="24" :lg="8" v-for="r in reports" :key="r.id" class="margin-top">
          <report-card :report="r"/>
        </el-col>
      </el-row>

    </div>

    <!-- <div id="p-content-undeconstruction">
      <div id="container">
        <img src="https://pbs.twimg.com/profile_images/459505368234606592/nuxaaQoo_400x400.jpeg" id="avatar"
             width="250" draggable="false"/>

        <div id=text>
          <h1>Building…</h1>
          <p title="(I guess)">(coming soon)</p>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  import {apiUrl} from "@/models/config";
  import ReportCard from '@/components/reports/ReportCard'
  import axios from "axios";
  import {mapGetters} from 'vuex'

  export default {
    components: {ReportCard},
    computed: {
      ...mapGetters({
        locale: 'getLocale',
      })
    },
    asyncData({params, error}) {
      return axios.get(apiUrl + 'reports?lang=' + params.lang)
        .then(response => {
          return {reports: response.data.data}
        })
        .catch(e => {
          console.log(e);
          return {
            reports: []
          }
        })
    },
  }
</script>
