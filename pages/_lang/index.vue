<template>
  <div class="Content">
    <div class="container">
      <div class="p-background">
        <carousel/>
        <splash-screen/>
      </div>
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
    mounted() {
      if (process.browser) {
        let splash = document.getElementById('splash');
        let splashTrigger = document.getElementById('splash-up');
        let splashBtnUp = document.getElementById('splash-btn-up');
        let splashBtnDown = document.getElementById('splash-btn-down');

        splash.style.top = '88%';

        splashTrigger.addEventListener("click", (ev => {
          if (splash.style.top !== '20%') {
            splash.style.top = '20%';
            splashBtnUp.style.display = 'none';
            splashBtnDown.style.display = 'block';
          } else {
            splash.style.top = '88%';
            splashBtnUp.style.display = 'block';
            splashBtnDown.style.display = 'none';
          }

        }));
      }
    }
  }
</script>

