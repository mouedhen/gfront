<template>
  <div class="container">
    <div v-masonry transition-duration="0.3s" item-selector=".item" class="masonry-container">
      <el-col v-masonry-tile class="item" v-for="(event, index) in events" :key="event.id"
              :xs="24" :sm="12" :lg="8">
        <el-card class="box-card" :data-id="event.id"
                 :data-latitude="event.latitude"
                 :data-longitude="event.longitude">
          <h4>{{event['name_'+ $i18n.locale] }}</h4>

          <div class="date">
            <small style="font-size: 0.8rem; color: #82848a">
              {{formatDate(event.start_date)}} - {{formatDate(event.end_date)}}
            </small>
          </div>
          <no-ssr>
            <v-embed :id="'gist_' + event.id"
                    :options="embedOptions">
              <p>{{event['description_'+ $i18n.locale] }}</p>
            </v-embed>
          </no-ssr>
          <div style="padding-top: 1rem; text-align: center; text-align: center">
            <div class="card-btn">
              <a href="javascript:;" @click="checkDetails(event.id)">{{$t('view details')}}</a>
            </div>
          </div>

        </el-card>
      </el-col>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import {Event} from "@/models/events/Event"
  import VEmbed from '@/components/libs/VEmbed'

  export default {
    components: {VEmbed},
    asyncData() {
      return (new Event())
        .fetchAll()
        .then(events => {
          return {events}
        })
    },
    data() {
      return {
        embedOptions: {
          emoji: false,
          googleAuthKey: 'AIzaSyCd5vfKP6P5O6BTi1okd6WtHCfHurawkCg',
          videoDetails: false,
          videoHeight: 200
        }
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
      checkDetails(id) {
        this.$router.push({name: 'lang-events-id', params: {id}})
      },
    }
  }
</script>

<style lang="scss" scoped>

  .item {
    padding: .2rem .4rem;
  }

  p {
    text-align: justify;
  }

  h4 {
    text-align: center;
    margin-bottom: .8rem;
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

  .date {
    width: 100%;
    text-align: right;
    margin-bottom: 1rem;
  }

  .app[dir='rtl'] {
    .date {
      text-align: left;
    }
  }
</style>
