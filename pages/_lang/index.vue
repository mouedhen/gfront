<template>
  <div class="container">
    <div class="p-background">
      <carousel :slides="slides"/>
      <splash-screen :video="video"/>
    </div>
  </div>
</template>

<script>

  import {apiUrl} from "../../models/config";
  import axios from "axios";
  import {mapGetters} from 'vuex'

  import Carousel from '../../components/home/Carousel'
  import SplashScreen from '../../components/home/SplashScreen'
  import {youtube_parser} from "../../helpers";

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
    async asyncData({ params, error }) {

      let slidesRes = await axios.get(apiUrl + 'slides?lang=' + params.locale)
      let videoRes = await axios.get(apiUrl + 'presentation-video')

      return {
        slides: slidesRes.data.data,
        video: 'https://www.youtube.com/embed/' + (youtube_parser(videoRes.data.data.url) ? youtube_parser(videoRes.data.data.url) : 'FzwZTOtzGrg')
      }
    },
    mounted() {
      console.log('---------------------------------------------')
      console.log(this.video)
      console.log('---------------------------------------------')
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>

