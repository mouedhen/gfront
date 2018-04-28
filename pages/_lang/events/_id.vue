<template>
  <div class="container">
    <div class="content">
      <h1>{{event['name_' + $i18n.locale]}}</h1>
      <div class="date">
        <p>
          {{formatDate(event.start_date)}} - {{formatDate(event.end_date)}}
        </p>
      </div>
      <no-ssr>
        <v-embed :id="'gist_' + event.id"
                 :options="embedOptions">
          <p style="text-align: justify">{{event['description_'+ $i18n.locale] }}</p>
        </v-embed>
      </no-ssr>
      <div class="social-container">
        <social-sharing :url="sharedUrl"
                        :title="event['name_' + $i18n.locale]"
                        :description="event['description_'+ $i18n.locale]"
                        :quote="event['description_'+ $i18n.locale]"
                        hashtags="GoulelHom,non-profits,organization"
                        twitter-user="GoulelHom"
                        inline-template>
          <div class="social-icons icon-circle icon-zoom">
            <network network="facebook">
              <i class="fa fa-facebook"></i>
            </network>
            <network network="googleplus">
              <i class="fa fa-google-plus"></i>
            </network>
            <network network="linkedin">
              <i class="fa fa-linkedin"></i>
            </network>
            <network network="twitter">
              <i class="fa fa-twitter"></i>
            </network>
          </div>
        </social-sharing>
      </div>
      <div id="map" style="width: 100%; height: 350px; z-index: 0"></div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {Event} from "@/models/events/Event"
  import VEmbed from '@/components/libs/VEmbed'
  import {appDomain} from "../../../models/config";

  export default {
    components: {VEmbed},
    head: {
      link: [
        {
          rel: 'stylesheet',
          crossOrigin: "",
          href: 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css'
        },
      ]
    },
    asyncData({params}) {
      return (new Event())
        .fetch(params.id)
        .then(event => {
          return {event}
        })
    },
    data() {
      return {
        embedOptions: {
          emoji: false,
          googleAuthKey: 'AIzaSyCd5vfKP6P5O6BTi1okd6WtHCfHurawkCg',
          videoDetails: false,
          videoWidth: 350,
          videoHeight: 250
        }
      }
    },
    computed: {
      sharedUrl: function () {
        return appDomain + this.$route.path;
      },
    },
    methods: {
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
      renderMap() {
        if (process.browser) {
          let that = this;
          require('leaflet');
          let position = [36.8188, 10.166];

          if (that.event.latitude !== null && that.event.longitude !== null) {
            position = [that.event.latitude, that.event.longitude];
          }

          let map = L.map('map').setView(position, 14);
          map.scrollWheelZoom.disable();
          map.dragging.disable();

          L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW91ZWRoZW4iLCJhIjoiY2o1b25ibHdiMDFqeDJ5bWxlZDBrbmJzdiJ9.KWA1osNZi6DEnhK2vBDb8w',
            {
              attribution: 'Tiles courtesy of <a href="https://www.mapbox.com/" target="_blank">Mapbox</a> &mdash; Map data &copy; <a href="https://www.mapbox.com/tos/">Mapbox</a>',
              minZoom: 6,
              maxZoom: 18,
              ZIndex: 0,
            }).addTo(map);

          let circle = L.circle(position, 1000);
          let marker = new L.marker(position, {draggable: true});
          circle.addTo(map);
          marker.addTo(map)
        }
      }
    },
    mounted() {
      this.renderMap()
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    background: #FFF;
    height: calc(100vh - 2rem);
    overflow-y: scroll;
    padding: 12px 6px;
    &::-webkit-scrollbar {
      display: none;
    }
    .content {
      margin-top: 1rem;
      padding-right: 20%;
      padding-left: 20%;
    }
    @media screen and (max-width: 840px) {
      padding: 8px 4px;
      .content {
        padding-right: 10%;
        padding-left: 10%;
      }
    }
    @media screen and (max-width: 480px) {
      padding: 4px 2px;
      .content {
        padding-right: 2%;
        padding-left: 2%;
      }
    }
  }

  h1 {
    text-align: center;
    text-transform: capitalize;
  }

  .date {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    color: #82848a
  }

  #map {
    margin-top: 1rem;
  }
  .social-container {
    text-align: right;
  }
  .app[dir='rtl'] {
    .social-container {
      text-align: left
    }
  }
</style>
