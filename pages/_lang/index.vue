<template>
  <div class="container">
    <div class="p-background">
      <carousel :slides="slides"/>
      <splash-screen :videoUrl="videoUrl"/>
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
      let [slidesRes, videoRes] = await Promise.all([
        axios.get(apiUrl + 'slides?lang=' + params.locale),
        axios.get(apiUrl + 'presentation-video'),
      ]);
      return {
        slides: slidesRes.data.data,
        videoUrl: videoRes.data.data.url.replace('watch?v=', 'embed/')
      }
    },
    // asyncData ({ params, error }) {
    //   return axios.get(apiUrl + 'slides?lang=' + params.locale)
    //     .then(response => {
    //       return {slides: response.data.data}
    //     })
    //     .catch(e => {
    //       console.log(e);
    //       return {
    //         slides: [{
    //           id: 0,
    //           quote: '',
    //           author: '',
    //           slide: '/images/slider/slide_0.jpg',
    //         }]
    //       }
    //     })
    // }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>

