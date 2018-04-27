<template>
  <div class="container">
    <div v-masonry transition-duration="0.3s" item-selector=".item" class="masonry-container">
      <el-col v-masonry-tile class="item" v-for="municipality in municipalities" :key="municipality.id"
              :xs="24" :sm="12" :lg="8">
        <el-card :body-style="{ padding: '0px' }">
          <img style="max-height: 300px" v-if="municipality.cover === null" :src="setCover('/images/default-municipality-cover.jpg')" class="image">
          <img style="max-height: 300px" v-if="municipality.cover !== null" :src="setCover(municipality.cover)">
          <div style="padding: 14px;">
            <h3 style="text-align: center">{{municipality['name']}}</h3>
            <div style="padding-top: 1rem; text-align: center; text-align: center">
              <div class="card-btn">
                <a href="javascript:;" @click="checkDetails(municipality.id)">{{$t('view details')}}</a>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
  import {storageDomain} from "@/models/config";
  import {Municipality} from "../../../models/complains/Municipality";
  import {mapGetters} from 'vuex'

  export default {
    methods: {
      setCover(uri) {
        return storageDomain + uri
      },
      checkDetails(id) {
        this.$router.push({name: 'lang-municipalities-id', params: {id}})
      },
    },
    computed: {
      ...mapGetters({
        locale: 'getLocale'
      })
    },
    asyncData({ params, error }) {
      console.log(params)
      return (new Municipality()).fetchAll({lang: params.lang})
        .then(municipalities => {
          return {municipalities: municipalities.map(record => {
              record.cover = (record.attachments.left > 0 ? record.attachments[0] : null)
              return record
            })}
        })
    },
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
