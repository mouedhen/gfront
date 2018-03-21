<template>

  <no-ssr style="margin-top: 1rem">
    <doughnut-chart :chartData="dataSet"
                    :options="{responsive: true, maintainAspectRatio: false}" :height="400"/>
  </no-ssr>

</template>

<script>
  import axios from 'axios'
  import {apiDomain} from "@/models/config";

  export default {
    props: ['id'],
    data() {
      return {
        dataSet: null
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      async getData() {

        let themes = [];
        let colors = [];
        let counter = [];

        axios(
          {
            method: 'GET',
            url: apiDomain + '/public/municipalities/' + this.id + '/stats',
          })
          .then(response => {
            let data = response.data;
            for (let i = 0; i < data.length; i++) {
              themes.push(data[i].theme);
              colors.push(data[i].color);
              counter.push(data[i].count);
            }
            this.dataSet = {
              labels: themes,
              datasets: [
                {
                  label: 'Plaintes par thèmes',
                  backgroundColor: colors,
                  data: counter
                },
              ]
            };
          })
      }
    }
  }
</script>
