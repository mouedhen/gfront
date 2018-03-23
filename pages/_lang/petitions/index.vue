<template>
  <div class="Content">
    <div class="container">
      <div v-masonry transition-duration="0.3s" item-selector=".item" class="masonry-container">

        <el-col v-masonry-tile class="item" :xs="24" :sm="24" :lg="8">
          <el-card class="p-form-2">
            <h1 class="title" style="text-transform: capitalize">{{$t('petitions')}}</h1>

            <div>
              <el-form ref="petitioner" :rules="petitioner_rules" :model="petitioner" v-if="step === 0">

                <el-form-item :label="$t('name')" prop="name">
                  <el-input :placeholder="$t('your name')" v-model="petitioner.name"/>
                </el-form-item>

                <el-form-item :label="$t('phone number')" prop="phone_number">
                  <div class="el-input" dir="ltr">
                    <cleave v-model="petitioner.phone_number" :options="cleaveOptions"
                            :placeholder="$t('your phone number')"
                            v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
                            class="el-input__inner" name="phone_number"/>
                  </div>
                </el-form-item>

                <el-form-item :label="$t('email')" prop="mail" dir="ltr">
                  <div class="el-input" dir="ltr">
                    <input
                      type="email"
                      :placeholder="$t('your email address')"
                      v-model="petitioner.mail"
                      v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
                      class="el-input__inner"
                      name="email" />
                  </div>
                  <!--
                  <el-input :placeholder="$t('your email address')"
                            v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
                            v-model="petitioner.mail"/>
                    -->
                </el-form-item>

                <el-form-item :label="$t('address')">
                  <el-input type="textarea" :rows="3" :placeholder="$t('your street address')"
                            v-model="petitioner.address"/>
                </el-form-item>

                <el-form-item class="controls">
                  <el-button>{{$t('cancel')}}</el-button>
                  <el-button type="default" @click="submitPetitioner">{{$t('next step')}}</el-button>
                </el-form-item>

              </el-form>

              <el-form ref="petition" :model="petition" v-if="step === 1">

                <el-form-item :label="$t('end date')" dir="ltr">
                  <el-date-picker
                    style="width: 100%"
                    v-model="petition.end_date"
                    value-format="yyyy-MM-dd"
                    format="dd-MM-yyyy"
                    :placeholder="$t('end date')">
                  </el-date-picker>
                </el-form-item>

                <el-form-item :label="$t('theme')">
                  <el-select
                    v-model="petition.theme_id"
                    style="width: 100%"
                    :placeholder="$t('please select the related theme')">
                    <el-option
                      v-for="theme in themes"
                      :key="theme.id"
                      :label="theme['name_' + $i18n.locale]"
                      :value="theme.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="$t('petition target')">
                  <el-select
                    v-model="petitionTarget"
                    filterable
                    allow-create
                    style="width: 100%"
                    :placeholder="$t('must be submitted to')">
                    <el-option
                      v-for="item in targets"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="$t('requested signatures')">
                  <el-input :placeholder="$t('requested signatures number')"
                            type="number" :min="0"
                            v-model="petition.requested_signatures_number"/>
                </el-form-item>

                <el-form-item class="controls">
                  <el-button>{{$t('cancel')}}</el-button>
                  <el-button type="default" @click="submitTarget">{{$t('next step')}}</el-button>
                </el-form-item>

              </el-form>

              <el-form ref="petition2" :model="petition" v-if="step === 2">

                <el-form-item :label="$t('title')">
                  <el-input :placeholder="$t('choose a title')" v-model="petition.name"/>
                </el-form-item>

                <el-form-item :label="$t('description')">
                  <el-input type="textarea" :rows="12" :placeholder="$t('description')"
                            v-model="petition.description"/>
                </el-form-item>

                <el-form-item class="controls">
                  <el-button>{{$t('cancel')}}</el-button>
                  <el-button type="default" @click="submitPetition">{{$t('next step')}}</el-button>
                </el-form-item>

              </el-form>

              <el-form ref="fileList" v-if="step === 3">
                <el-form-item>
                  <el-upload
                    style="width: 100%"
                    class="upload-demo"
                    drag
                    :action="petitionUpload"
                    :file-list="fileList"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">{{$t('drop file here or')}} <em>{{$t('click to upload')}}</em></div>
                    <div class="el-upload__tip" slot="tip">jpg/png {{$t('files with a size less than 500kb')}}
                    </div>
                  </el-upload>
                  <el-form-item class="controls margin-top">
                    <el-button type="primary" @click="finish" plain>{{$t('submit')}}</el-button>
                  </el-form-item>
                </el-form-item>
              </el-form>

            </div>

          </el-card>
        </el-col>

        <el-col v-masonry-tile class="item" v-for="(item, index) in petitions" :key="item.id"
                :xs="24" :sm="24" :lg="8">

          <el-card :body-style="{ padding: '0px' }">
            <img style="max-height: 300px" v-if="item.cover !== null" :src="setCover(item.cover.url)">
            <div style="padding: 14px;">
              <h3>{{item.name}}</h3>
              <p>{{item.description}}</p>

              <div style="text-align: center">
                <social-sharing :url="'https://www.goulelhom.org/'+ $i18n.locale +'/petitions/' + item.uuid"
                                :title="item.name"
                                :description="item.description"
                                :quote="item.description"
                                hashtags="GoulelHom,non-profits,organization"
                                twitter-user="GoulelHom"
                                inline-template>
                  <div class="social-icons icon-zoom">
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

              <div style="padding-top: 1rem; text-align: center; text-align: center">
                <div class="card-btn">
                  <a href="javascript:;" @click="checkDetails(item.uuid)">{{$t('view details')}}</a>
                </div>
              </div>

            </div>
          </el-card>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiDomain as apiUrl, storageDomain} from "@/models/config";
  import {mapGetters} from 'vuex'
  import Cleave from 'vue-cleave-component';
  require('cleave.js/dist/addons/cleave-phone.tn');

  import {Petitioner} from '@/models/petitions/Petitioner';
  import {Petition} from '@/models/petitions/Petition';
  import {Theme} from "@/models/petitions/Theme";
  import {Target} from "@/models/petitions/Target";

  export default {
    components: {
      Cleave
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
        },
      ]
    },
    data() {
      return {
        petitioner: new Petitioner(),
        petition: new Petition(),
        petitionTarget: null,
        themes: [],
        targets: [],
        petitions: [],
        date_range: [],
        step: 0,
        petitionID: -1,
        fileList: [],
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'TN'
        },
        petitioner_rules: {
          name: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
          ],
          phone_number: [
            {min: 8, max: 16, message: 'This is not a valid phone number.', trigger: 'blur'},
          ],
          mail: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {type: 'email', message: 'This is not a valid email.', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      petitionUpload: function () {
        return apiUrl + '/public/petitions/upload/' + this.petitionID
      },
      ...mapGetters({
        direction: 'getDirection'
      })
    },
    methods: {
      setCover(uri) {
        return storageDomain + uri
      },
      checkDetails(uuid) {
        this.$router.push({name: 'lang-petitions-uuid', params: {uuid}})
      },
      submitPetitioner() {
        this.$refs['petitioner'].validate((valid) => {
            if (valid) {
              this.petitioner.save()
                .then(petitioner => {
                  this.petition.petitioner_id = petitioner.id;
                  this.step++;
                });
              return true
            } else {
              this.$message.warning('Please check your data');
              return false
            }
          }
        )
      },
      submitTarget() {
        let target = new Target();
        target.name_en = this.petitionTarget;
        target.save()
          .then(target => {
            this.petition.target_id = target.id;
            this.step++;
          });
      },
      submitPetition() {
        this.petition.end_date = '2018/03/30'
        this.petition.save()
          .then(petition => {
            this.petitionID = petition.id;
            this.step++;
          })
      },
      finish() {
        this.initialState();
        this.loadData();
      },
      initialState() {
        this.petitioner = new Petitioner();
        this.petition = new Petition();
        this.petitionTarget = null;
        this.themes = [];
        this.targets = [];
        this.date_range = [];
        this.step = 0;
        this.petitionID = -1;
        this.fileList = [];
      },
      loadData() {
        let theme = new Theme();
        theme.fetchAll()
          .then(themes => {
            this.themes = themes
          });

        let targets = new Target();
        targets.fetchAll()
          .then(targets => {
            targets.map(item => {
              if (item.name_en !== null) {
                this.targets.push(item.name_en)
              }
            });
          });
      }
    },
    mounted() {
      this.loadData();
      this.petition.fetchAll()
        .then(petitions => {
          this.petitions = petitions
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

  .el-input__prefix {
    position: absolute;
    right: auto !important;
    left: 5px !important;
    color: #c0c4cc;
  }
</style>
