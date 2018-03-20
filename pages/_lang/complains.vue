<template>
  <div class="content">
    <div class="container">
      <div id="mapid" style="width: 100%; height: 100%; z-index: 0"></div>
      <splash-screen :claim="claim" :claims="claims" v-on:finish="reinit" />
    </div>
  </div>
</template>

<script>
  import {Complain} from "../../models/complains/Complain";
  import SplashScreen from '../../components/complains/SplashScreen'

  async function addMarkers(data, layer) {
    for (let i = 0; i < data.length; i++) {
      let a = data[i];
      let title = '<h3>' + a.subject + '</h3><p>' + a.description + '</p>';

      if (a.latitude !== null && a.longitude !== null) {

        let icon = L.icon.fontAwesome({
          iconClasses: 'fa fa-circle',
          markerColor: a.theme.color,
          iconColor: '#f2f2f2',
          iconXOffset: -1,
          iconYOffset: 0,
        });

        let marker = L.marker([a.latitude, a.longitude], {title, icon});
        marker.bindPopup(title);
        marker.addTo(layer)
      }
    }
  }

  export default {
    components: {
      SplashScreen
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
        },
        {
          rel: 'stylesheet',
          crossOrigin: "",
          href: 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css'
        },
        {
          rel: 'stylesheet',
          type: "text/css",
          href: 'https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.62.0/dist/L.Control.Locate.min.css'
        },
        {
          rel: 'stylesheet',
          type: "text/css",
          href: 'https://unpkg.com/leaflet.markercluster@1.2.0/dist/MarkerCluster.css'
        },
        {
          rel: 'stylesheet',
          type: "text/css",
          href: 'https://unpkg.com/leaflet.markercluster@1.2.0/dist/MarkerCluster.Default.css'
        },
        {
          rel: 'stylesheet',
          type: "text/css",
          href: 'https://cdn.jsdelivr.net/npm/leaflet-fa-markers@0.0.5/L.Icon.FontAwesome.css'
        },
      ]
    },
    data() {
      return {
        // claims: [],
        claim: new Complain()
      }
    },
    asyncData() {
      return (new Complain()).fetchAll()
        .then((claims) => {
          return {claims}
        })
    },
    methods: {
      reinit() {
        window.location.reload(true)
      },
      renderMap() {
        if (process.browser) {
          let that = this;

          require('leaflet');
          require('leaflet-fa-markers');
          require('leaflet.locatecontrol');
          require('leaflet.markercluster');

          let position = [36.8188, 10.166];

          that.claim.latitude = position[0];
          that.claim.longitude = position[1];

          let map = L.map('mapid').setView(position, 13);

          L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW91ZWRoZW4iLCJhIjoiY2o1b25ibHdiMDFqeDJ5bWxlZDBrbmJzdiJ9.KWA1osNZi6DEnhK2vBDb8w',
            {
              attribution: 'Tiles courtesy of <a href="https://www.mapbox.com/" target="_blank">Mapbox</a> &mdash; Map data &copy; <a href="https://www.mapbox.com/tos/">Mapbox</a>',
              minZoom: 6,
              maxZoom: 18,
              ZIndex: 0,
            }).addTo(map);

          let markers = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: false
          });

          addMarkers(that.claims, markers);

          map.addLayer(markers);

          let circle = L.circle(position, 1000);
          let marker = new L.marker(position, {draggable: true});

          marker.on('dragstart', function (event) {
            circle.setRadius(0)
          });

          marker.on('dragend', function (event) {
            circle.setLatLng(event.target.getLatLng()).setRadius(1000);

            position = [event.target.getLatLng().lat, event.target.getLatLng().lng];
            that.claim.latitude = position[0];
            that.claim.longitude = position[1];
          });

          let lc = L.control.locate({
            onLocationError: function (err, control) {
              marker.addTo(map);
              circle.addTo(map);

              that.claim.latitude = position[0];
              that.claim.longitude = position[1];

              lc.stop()
            },
            setView: true,
            flyTo: true,
            cacheLocation: true,
            maxZoom: 14,
            drawCircle: true,
            locateOptions: {
              enableHighAccuracy: true
            }
          }).addTo(map);

          map.on('locationfound', layer => {

            marker.setLatLng(layer.latlng);
            circle.setLatLng(layer.latlng);

            let latLng = {
              lat: layer.latlng.lat,
              lng: layer.latlng.lng,
            };
            map.flyTo(latLng, 14, {
              bearing: 0,
              speed: 0.2,
              curve: 1,
              easing: function (t) {
                return t;
              }
            });

            marker.addTo(map);
            circle.addTo(map);

            position = [layer.latlng.lat, layer.latlng.lng];
            that.claim.latitude = position[0];
            that.claim.longitude = position[1];

            lc.stop()
          });

          map.on('click', function (event) {
            marker.setLatLng(event.latlng);
            circle.setLatLng(event.latlng).setRadius(1000);

            position = [event.latlng.lat, event.latlng.lng];
            that.claim.latitude = position[0];
            that.claim.longitude = position[1];
          });

          lc.start();
        }
      }
    },
    mounted() {
      this.renderMap()
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
</style>
