<template>

  <div class="p-forground" id="splash">
    <div class="splash-screen">
      <div>
        <el-button class="splash-up" id="splash-up" type="default"
                   style="background: #b71c1c; border-color: #b71c1c; color: #f2f2f2">
          <i id="splash-btn-up" style="display: block" class="el-icon-caret-top"></i>
          <i id="splash-btn-down" style="display: none;" class="el-icon-caret-bottom"></i>
        </el-button>
      </div>

      <transition name="fade">

        <div v-if="videoVisible" style="position: relative; display: flex; flex-direction: row;">

          <div v-if="direction === 'rtl'"
            style="margin-left: .5rem;display: flex; align-items: center; justify-content: center; cursor: pointer">
            <el-button @click="nextSlide" type="info" plain icon="el-icon-caret-right" circle
                       style="width: 4rem; height: 4rem"/>
          </div>

          <div v-else
            style="margin-right: .5rem;display: flex; align-items: center; justify-content: center; cursor: pointer">
            <el-button @click="previousSlide" type="info" plain icon="el-icon-caret-left" circle
                       style="width: 4rem; height: 4rem"/>
          </div>

          <div class="iframe-container" v-if="videos.length > 0">
            <iframe
              :src="setEmbedLink(videos[index])"
              frameborder="0"
              gesture="media"
              class="splash-iframe"
              allow="encrypted-media"
              allowfullscreen="allowfullscreen"
              height="100%"
              width="100%">
            </iframe>
          </div>

          <div v-if="direction === 'rtl'"
            style="margin-right: .5rem;display: flex; align-items: center; justify-content: center; cursor: pointer">
            <el-button @click="previousSlide" type="info" plain icon="el-icon-caret-left" circle
                       style="width: 4rem; height: 4rem"/>
          </div>

          <div v-else
               style="margin-left: .5rem;display: flex; align-items: center; justify-content: center; cursor: pointer">
            <el-button @click="nextSlide" type="info" plain icon="el-icon-caret-right" circle
                       style="width: 4rem; height: 4rem"/>
          </div>

        </div>

      </transition>
    </div>
  </div>

</template>

<script>
  import {youtube_parser} from "../../helpers";
  import {mapGetters} from 'vuex'

  export default {
    props: ['videos'],
    data() {
      return {
        isVisible: false,
        index: 0,
        videoVisible: true,
      }
    },
    computed: {
      ...mapGetters({
        direction: 'getDirection'
      })
    },
    methods: {
      previousSlide() {
        this.videoVisible = false;
        if (this.index === 0 && this.videos.length > 0) {
          this.index = this.videos.length - 1
        } else {
          this.index--;
        }
        this.videoVisible = true;
      },
      nextSlide() {
        this.videoVisible = false;
        if (this.index === (this.videos.length - 1)) {
          this.index = 0
        } else {
          this.index++;
        }
        this.videoVisible = true;
      },
      setEmbedLink(video) {
        return 'https://www.youtube.com/embed/' + (youtube_parser(video.url) ? youtube_parser(video.url) : 'FzwZTOtzGrg')
      }
    },
    mounted() {
      console.log(this.videos)
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
    background: none;
    color: #f2f2f2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    // box-shadow: 3px 0 3px rgba(0, 0, 0, .3);
    z-index: 20;
    top: 88%;
  }

  .el-button {
    font-size: 2rem;
    line-height: 2rem;
    padding: 10px 15px;
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
