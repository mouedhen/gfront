<template>
  <div class="p-forground" id="splash">
    <div class="splash-screen">
      <div>
        <el-button class="splash-up" id="splash-up" type="primary">
          <i id="splash-btn-up" style="display: block" class="el-icon-arrow-up"></i>
          <i id="splash-btn-down" style="display: none" class="el-icon-arrow-down"></i>
        </el-button>
      </div>
      <div class="iframe-container">
        <iframe :src="videoUrl" frameborder="0" gesture="media"
                class="splash-iframe"
                allow="encrypted-media" allowfullscreen="allowfullscreen" width="100%"
                height="100%"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiUrl} from "../../models/config";
  import axios from "axios";

  export default {
    data() {
      return {
        isVisible: false,
        videoUrl: 'https://www.youtube.com/watch?v=FzwZTOtzGrg'.replace('watch?v=', 'embed/')
      }
    },
    methods: {},
    mounted() {
      axios.get(apiUrl + 'presentation-video')
        .then(response => {
          this.videoUrl = response.data.data.url.replace('watch?v=', 'embed/')
        })
        .catch((e) => {
          console.log(e)
        });
      if (process.browser) {
        let splash = document.getElementById('splash');
        let splashTrigger = document.getElementById('splash-up');
        let splashBtnUp = document.getElementById('splash-btn-up');
        let splashBtnDown = document.getElementById('splash-btn-down');

        splash.style.top = '85%';

        splashTrigger.addEventListener("click", (ev => {
          if (splash.style.top !== '20%') {
            splash.style.top = '20%';
            splashBtnUp.style.display = 'none';
            splashBtnDown.style.display = 'block';
          } else {
            splash.style.top = '85%';
            splashBtnUp.style.display = 'block';
            splashBtnDown.style.display = 'none';
          }

        }));
      }
    }
  }
</script>

<style lang="scss" scoped>
  .p-middle {
    margin-top: 20% !important;
    transform: translateY(-50%);
  }

  .p-forground {
    position: relative;
    height: auto;
    transition: top .3s;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    top: 88%;
  }

  .splash-screen {
    width: 90%;
    height: auto;
    background: #f2f2f2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 3px 0 3px rgba(0, 0, 0, .3);
    z-index: 20;
    top: 88%;
  }

  .iframe-container {
    position: relative;
    padding-bottom: 56.25%;
    width: 100%;
    height: 0
  }

  .splash-iframe {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
