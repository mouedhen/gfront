<template>
  <div class="container">
    <div class="p-background">
      <carousel :slides="slides"/>
      <splash-screen/>
    </div>
  </div>
</template>

<script>

  import {apiUrl} from "../../models/config";
  import axios from "axios";
  import {mapGetters} from 'vuex'

  import Carousel from '../../components/home/Carousel'
  import SplashScreen from '../../components/home/SplashScreen'

  export default {
    components: {
      Carousel,
      SplashScreen,
    },
    computed: {
      ...mapGetters({
        locale: 'getLocale',
      })
    },
    mounted() {
      console.log(this.slides)
    },
    asyncData ({ params, error }) {
      return axios.get(apiUrl + 'slides?lang=' + params.locale)
        .then(response => {
          return {slides: response.data.data}
        })
        .catch(e => {
          console.log(e);
          return {
            slides: [{
              id: 0,
              quote: this.$t('home.slogan-2-word-1'),
              author: this.$t('home.slogan-2-cite'),
              slide: '/images/slider/slide_0.jpg',
            }]
          }
        })
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>

