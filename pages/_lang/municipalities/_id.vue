<template>
  <div class="container">

    <div class="cover" v-bind:style="{backgroundImage: 'url('+ cover +')'}" style="height: 150px"></div>

    <el-row :gutter="24" style="padding: 1rem; flex-wrap: wrap" type="flex">
      <el-col :xs="24" :sm="12" :lg="16">
        <h1 class="title" style="text-align: center">{{ municipality['name_'+ $i18n.locale] }}</h1>

        <el-col :xs="24" :lg="12" style="text-align: center">
          <el-progress type="circle" :percentage="parseFloat(relativePopulation)"/>
          <br>
          <span>{{$t('% total population of')}} {{ municipality.city['name_'+ $i18n.locale] }}</span>
        </el-col>

        <el-col :xs="24" :lg="12" style="text-align: center">
          <el-progress type="circle" :percentage="parseFloat(relativeHouses)"/>
          <br>
          <span>{{$t('% total housing of')}} {{ municipality.city['name_'+ $i18n.locale] }}</span>
        </el-col>

        <el-card class="stat margin-top">
          <div style="padding: 1rem; line-height: 1rem; text-align: center">
            <p><b>{{$t('Inhabitants / Housing')}} : </b> {{ inhabitantsHousing }}</p>
          </div>
        </el-card>

        <p style="text-align: justify" v-if="municipality['description_'+ $i18n.locale] !== null">{{
          municipality['description_'+ $i18n.locale] }}</p>
        <div style="margin-top: 1rem; text-align: center">
          <h3>{{$t('Complaints by topic')}}</h3>
          <municipality-stats :id="municipality.id"/>
        </div>

        <div style="text-align: center; margin-top: 1rem" dir="ltr">
          <h3>{{$t('navigation.complains.title')}}</h3>
          <el-card v-for="claim in municipality.claims" :key="claim.id" style="margin-top: 1rem">
            <p>{{claim.description}}</p>

            <div style="margin-top: 1rem; display: flex; flex-wrap: wrap">
              <img :src="attachment.src" height="120" v-for="attachment in claim.attachments" :key="attachment.id"
                   style="margin-left: 1rem">
            </div>

          </el-card>
        </div>

      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="infos">

        <h3>{{$t('Contact information')}}</h3>
        <el-row style="padding: 0; flex-wrap: wrap" type="flex">
          <el-col v-if="municipality.city" :xs="24" :lg="12" style="padding: 0"><b>{{$t('City')}}</b></el-col>
          <el-col v-if="municipality.city" :xs="24" :lg="12" style="padding: 0">{{ municipality.city['name_' +
            $i18n.locale] }}
          </el-col>
          <el-col v-if="municipality.website" :xs="24" :lg="12" style="padding: 0"><b>{{$t('Website')}}</b></el-col>
          <el-col v-if="municipality.website" :xs="24" :lg="12" style="padding: 0" dir="ltr"
                  v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''">{{ municipality.website }}
          </el-col>
          <el-col v-if="municipality.phone" :xs="24" :lg="12" style="padding: 0"><b>{{$t('Phone number')}}</b></el-col>
          <el-col v-if="municipality.phone" :xs="24" :lg="12" style="padding: 0" dir="ltr"
                  v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''">{{ municipality.phone }}
          </el-col>
          <el-col v-if="municipality.email" :xs="24" :lg="12" style="padding: 0"><b>{{$t('E-mail')}}</b></el-col>
          <el-col v-if="municipality.email" :xs="24" :lg="12" style="padding: 0" dir="ltr"
                  v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''">{{ municipality.email }}
          </el-col>
          <el-col v-if="municipality.fax" :xs="24" :lg="12" style="padding: 0"><b>{{$t('Fax')}}</b></el-col>
          <el-col v-if="municipality.fax" :xs="24" :lg="12" style="padding: 0" dir="ltr"
                  v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''">{{ municipality.fax }}
          </el-col>
        </el-row>
        <h3>{{$t('General')}}</h3>
        <el-row style="padding: 0; flex-wrap: wrap" type="flex">
          <el-col :xs="24" :lg="12" style="padding: 0">
            <b>{{$t('Population')}}</b></el-col>
          <el-col v-if="municipality.population" :xs="24" :lg="12" style="padding: 0">{{ municipality.population }}
          </el-col>
          <el-col v-if="!municipality.population" :xs="24" :lg="12" style="padding: 0"><i>{{$t('not defined')}}</i>
          </el-col>

          <el-col :xs="24" :lg="12" style="padding: 0"><b>{{$t('Housing')}}</b></el-col>
          <el-col v-if="municipality.houses" :xs="24" :lg="12" style="padding: 0">{{ municipality.houses }}</el-col>
          <el-col v-if="!municipality.population" :xs="24" :lg="12" style="padding: 0"><i>{{$t('not defined')}}</i>
          </el-col>

          <el-col :xs="24" :lg="12" style="padding: 0"><b>{{$t('Municipal council')}}</b></el-col>
          <el-col v-if="municipality.municipal_council_number" :xs="24" :lg="12" style="padding: 0">{{
            municipality.municipal_council_number }}
          </el-col>
          <el-col v-if="!municipality.municipal_council_number" :xs="24" :lg="12" style="padding: 0"><i>{{$t('not defined')}}</i>
          </el-col>

          <el-col :xs="24" :lg="12" style="padding: 0"><b>{{$t('Regional council')}}</b></el-col>
          <el-col v-if="municipality.regional_council_number" :xs="24" :lg="12" style="padding: 0">{{ municipality.regional_council_number }}
          </el-col>
          <el-col v-if="!municipality.regional_council_number" :xs="24" :lg="12" style="padding: 0"><i>{{$t('not defined')}}</i>
          </el-col>
        </el-row>

        <el-col :xs="24" style="text-align: center; padding: 1rem">
          <img :src="cover" style="width: 100%; margin-bottom: 1rem">
          <div v-for="attachment in attachments" :key="attachment.id">
            <img :src="setImg(attachment.url)" style="width: 100%; margin-bottom: 1rem">
          </div>
        </el-col>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Municipality} from "../../../models/complains/Municipality";
  import {storageDomain} from "../../../models/config";
  import MunicipalityStats from "../../../components/municipalities/MunicipalityStats"


  export default {
    components: {
      MunicipalityStats,
    },
    asyncData({params}) {
      return (new Municipality()).fetch(params.id)
        .then(municipality => {
          return {municipality}
        })
    },
    mounted() {
      console.log(this.municipality)
    },
    methods: {
      setImg(uri) {
        return storageDomain + uri
      },
    },
    computed: {
      ...mapGetters({
        direction: 'getDirection'
      }),
      relativeHouses: function () {
        let relativeHouses = this.municipality.houses * 100 / this.municipality.city.houses;
        if (isNaN(relativeHouses)) {
          return 0
        }
        return parseFloat(relativeHouses).toFixed(2)
      },
      relativePopulation: function () {
        let relativePopulation = this.municipality.houses * 100 / this.municipality.city.population;
        if (isNaN(relativePopulation)) {
          return 0
        }
        return parseFloat(relativePopulation).toFixed(2)
      },
      inhabitantsHousing: function () {
        let x = this.municipality.population / this.municipality.houses;
        if (isNaN(x)) {
          return 0
        }
        return parseFloat(x).toFixed(2)
      },
      attachments: function () {
        return this.municipality.attachments
      },
      cover: function () {
        if (this.municipality.cover)
          return storageDomain + this.municipality.cover.url;
        return storageDomain + '/images/default-municipality-cover.jpg'
      },
    }
  }
</script>

<style scoped>
  .el-col {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 840px) {
    .infos {
      text-align: center;
    }
  }
</style>
