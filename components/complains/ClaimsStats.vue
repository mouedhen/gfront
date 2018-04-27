<template>
    <div v-swiper:mySwiper="swiperOption" style="height: 120px">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="theme in themes" :key="theme.id">
            <circular-stats
                    :percentage="(theme.claims_count / totalClaims) * 100"
                    :color="theme.color" :title="theme['name']"
                    :id="'stat' + theme.id"/>
        </div>
      </div>
    </div>
</template>

<script>
    import CircularStats from './CircularStats'

    import 'swiper/dist/css/swiper.css'

    export default {
        components: {CircularStats},
        props: ['themes', 'totalClaims'],
        data() {
            return {
                swiperOption: {
                    direction: 'horizontal',
                    slidesPerView: 3,
                    mousewheel: true,
                    // centeredSlides: true,
                    freeMode: true,
                    grabCursor: true,
                    loop: true,
                    slideToClickedSlide: true,
                    autoplay: true,

                }
            }
        }
    }
</script>
