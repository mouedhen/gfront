<template>
  <div class="container">
    <div class="p-background">
      <carousel/>
      <splash-screen/>
    </div>
  </div>
</template>

<script>

  import Carousel from '../../components/home/Carousel'
  import SplashScreen from '../../components/home/SplashScreen'

  export default {
    components: {
      Carousel,
      SplashScreen,
    },
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>

