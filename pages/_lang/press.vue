<template>
  <div class="Content">
    <div class="container">
      <no-ssr>
        <div v-masonry transition-duration="0.4s" item-selector=".item" class="masonry-container">
          <el-col v-masonry-tile class="item"
                  v-for="(item, index) in reviews"
                  :key="item.id" :xs="24" :sm="12" :lg="8">
            <link-preview cardWidth="100%" :url="item.url" @loaded="$redrawVueMasonry()"/>
          </el-col>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>

  import {PressReview} from "../../models/press/PressReview";
  import LinkPreview from '../../components/shared/LinkPreview'

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  export default {
    components: {
      LinkPreview
    },
    asyncData() {
      return (new PressReview()).fetchAll()
        .then(reviews => {
          return {reviews}
        })
    },
    mounted() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }

      sleep(2000).then(() => {
        this.$redrawVueMasonry();
      })
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    padding: 12px;

    @media screen and (max-width: 840px) {
      padding: 8px;
    }
    @media screen and (max-width: 480px) {
      padding: 4px;
    }
  }

  .container {
    height: calc(100vh - 2rem);
    overflow-y: scroll;
    padding: 12px 6px;
    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (max-width: 840px) {
      padding: 8px 4px;
    }
    @media screen and (max-width: 480px) {
      padding: 4px 2px;
    }
  }
</style>
