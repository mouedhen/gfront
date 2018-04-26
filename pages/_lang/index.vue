<template>
  <div class="container">
    <div class="p-background">
      <carousel :slides="slides"/>
      <splash-screen :videos="videos"/>
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
    async asyncData({ params, error }) {

      let slidesRes = await axios.get(apiUrl + 'slides?lang=' + params.locale);
      let videoRes = await axios.get(apiUrl + 'presentation-video');

      return {
        slides: slidesRes.data.data,
        videos: videoRes.data.data,
      }
    },
    mounted() {
      console.log(this.videos)
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>

