<template>

  <div id="carousel" class="carousel">
    <no-ssr>
      <flickity ref="flickity" :options="flickityOptions">

        <div v-for="item in slides" :key="item.id" class="carousel__item">
          <img :src="item.slide" alt="Sonio">
          <div class="slogan">
            <blockquote><span class="word">{{ item.quote }}</span><br>
              <cite v-if="item.author">-- {{ item.author }} --</cite></blockquote>
          </div>
        </div>
        <!--
        <div class="carousel__item">
          <img src="/images/slider/slide_0.jpg" alt="Sonio">
          <div class="slogan">
            <blockquote><span class="word">{{ $t('home.slogan-2-word-1') }}</span><br>
              <strong class="word">{{ $t('home.slogan-2-word-2') }}</strong><br>
              <cite>-- {{ $t('home.slogan-2-cite') }} --</cite></blockquote>
          </div>
        </div>
        <div class="carousel__item">
          <img src="/images/slider/slide_1.jpg" alt="Sonio">
          <div class="slogan">
            <blockquote><span class="word">{{ $t('home.slogan-3-word-1') }}</span><br>
              <strong class="word">{{ $t('home.slogan-3-word-2') }}</strong><br>
              <cite>-- {{ $t('home.slogan-3-cite') }} --</cite></blockquote>
          </div>
        </div>
        <div class="carousel__item">
          <img src="/images/slider/slide_2.jpg" alt="Sonio">
          <div class="slogan">
            <blockquote>
              <span class="word">{{ $t('home.slogan-4-word-1') }}</span><br>
              <strong class="word">{{ $t('home.slogan-4-word-2') }}</strong><br>
              <cite class="word">-- {{ $t('home.slogan-4-cite') }} --</cite>
            </blockquote>
          </div>
        </div>
        <div class="carousel__item">
          <img src="/images/slider/slide_3.jpg" alt="Sonio">
          <div class="slogan">
            <blockquote>
              <span class="word">{{ $t('home.slogan-4-word-1') }}</span><br>
              <strong class="word">{{ $t('home.slogan-4-word-2') }}</strong><br>
              <cite class="word">-- {{ $t('home.slogan-4-cite') }} --</cite>
            </blockquote>
          </div>
        </div>
        -->
      </flickity>
    </no-ssr>

  </div>
</template>

<script>

  export default {
    props: ['slides'],
    data() {
      return {
        preloading: true,
        flickityOptions: {
          autoPlay: 6000,
          pauseAutoPlayOnHover: true,
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        },
      }
    },
  }

</script>

<style lang="scss" scoped>

  .carousel {
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100vh;

    .carousel__item {
      width: 100%;
      height: 100vh;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .slogan {
        width: 100%;
        position: absolute;
        bottom: 20%;
        letter-spacing: -0.1rem;
      }
      .slogan blockquote {
        color: #ef9a9a;
        font-size: 1.6rem;
        line-height: 1.3rem;
        font-weight: 900;
        text-align: right;
        padding-right: 5%;
        padding-left: 5%;
        text-transform: uppercase;
        strong {
          font-weight: 900;
          color: #b71c1c;
          font-size: 2rem;
          text-transform: uppercase;
        }
        cite {
          font-size: 1.2rem;
          color: #bdc3c7;
          text-transform: capitalize;
        }
      }
    }
  }

  blockquote {
    text-align: right !important;
  }

  .app[dir='rtl'] {
    blockquote {
      text-align: left !important;
    }
  }
</style>
