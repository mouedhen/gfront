<template>
  <div class="p-forground" id="splash">
    <div class="splash-screen">
      <div style="padding-top: .5rem; text-align: center">
        <el-button id="splash-up" type="default">
          <i id="splash-btn-up" style="display: block" class="el-icon-arrow-up"></i>
          <i id="splash-btn-down" style="display: none" class="el-icon-arrow-down"></i>
        </el-button>
      </div>
      <div class="form-container">
        <h1 class="title" style="text-transform: capitalize">{{ $t('navigation.complains.title') }}</h1>
        <el-form ref="claimForm" :model="claim" :rules="rules">
          <no-ssr>

            <claims-stats :themes="themes" class="claims-stats" :totalClaims="totalClaims"/>

          </no-ssr>
          <div v-if="stepOne">
            <el-form-item prop="claimer_name">
              <el-input :placeholder="$t('name')" v-model="claim.claimer_name"/>
            </el-form-item>


            <el-form-item prop="claimer_phone_number">
              <div class="el-input" dir="ltr">
                <cleave v-model="claim.claimer_phone_number" :options="cleaveOptions"
                        :placeholder="$t('your phone number')"
                        v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
                        class="el-input__inner" name="claimer_phone_number"/>
              </div>
            </el-form-item>

            <el-form-item prop="municipality_id">
              <el-select
                style="width: 100%"
                v-model="claim.municipality_id"
                :placeholder="$t('municipality')">
                <el-option
                  v-for="municipality in municipalities"
                  :key="municipality.id"
                  :label="municipality['name']"
                  :value="municipality.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="theme_id">
              <el-select
                style="width: 100%"
                v-model="claim.theme_id"
                :placeholder="$t('subject')">
                <el-option
                  v-for="theme in themes"
                  :key="theme.id"
                  :label="theme['name']"
                  :value="theme.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="description">
              <el-input :placeholder="$t('description')" type="textarea" :rows="3"
                        v-model="claim.description"/>
            </el-form-item>

            <el-form-item prop="acceptConditions">
              <el-checkbox v-model="claim.acceptConditions" name="acceptCondition"/>
              <span style="margin: 1rem">{{$t('acceptConditions')}}</span>
            </el-form-item>

            <el-form-item class="controls" style="text-align: center;">
              <el-button type="primary" @click="saveClaim"
                         v-bind:style="(direction === 'rtl') ? {marginLeft: '10px'} : ''"
                         plain>{{$t('next step')}}
              </el-button>
              <el-button @click="resetForm">{{$t('cancel')}}</el-button>
            </el-form-item>

          </div>
          <div v-if="stepTwo">
            <el-form-item>
              <dropzone id="foo" ref="el" :options="dropZoneOptions" :destroyDropzone="true"/>
              <el-form-item class="controls" style="margin-top: 1rem; text-align: center">
                <el-button type="primary" @click="finish" plain>{{$t('submit')}}</el-button>
              </el-form-item>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {Municipality} from "../../models/complains/Municipality";
  import Cleave from 'vue-cleave-component';
  import {Theme} from "../../models/complains/Theme";
  import {apiDomain, apiUrl} from "../../models/config";

  import {mapGetters} from 'vuex'

  import ClaimsStats from '../../components/complains/ClaimsStats'

  require('cleave.js/dist/addons/cleave-phone.tn');

  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'
  import {Contact} from "../../models/contacts/Contact";
  import {Complain} from "../../models/complains/Complain";

  function splash() {
    let splash = document.getElementById('splash');
    let splashTrigger = document.getElementById('splash-up');
    let splashBtnUp = document.getElementById('splash-btn-up');
    let splashBtnDown = document.getElementById('splash-btn-down');

    if (window.innerWidth > 768) {
      splash.style.top = '1px';
      splashBtnUp.style.display = 'none';
      splashBtnDown.style.display = 'block';
    } else {
      splash.style.top = '75vh';
      splashBtnUp.style.display = 'block';
      splashBtnDown.style.display = 'none';
    }

    splashTrigger.addEventListener("click", (ev => {
      if (splash.style.top !== '1px') {
        splash.style.top = '1px';
        splashBtnUp.style.display = 'none';
        splashBtnDown.style.display = 'block';
      } else {
        splash.style.top = '75vh';
        splashBtnUp.style.display = 'block';
        splashBtnDown.style.display = 'none';
      }

    }));
  }

  export default {
    props: ['claim', 'claims'],
    components: {
      ClaimsStats,
      Dropzone,
      Cleave,
    },
    data() {
      return {
        municipalities: [],
        themes: [],
        complain: new Complain(),
        isVisible: false,
        stepOne: true,
        stepTwo: false,
        fileList: [],
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'TN'
        },
        rules: {
          claimer_name: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
          ],
          claimer_phone_number: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
            {min: 8, max: 16, message: 'This is not a valid phone number.', trigger: 'blur'},
          ],
          description: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
          ],
          municipality_id: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
          ],
          theme_id: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
          ],
          acceptConditions: [
            {required: true, message: this.$t('This field is required'), trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      dropZoneOptions: function () {
        return {
          thumbnailWidth: 100,
          thumbnailHeight: 100,
          dictDefaultMessage: "<i class='el-icon-upload upload-icon'></i>" + this.$t('add files'),
          url: this.claimUpload
        }
      },
      claimUpload: function () {
        return apiUrl + 'complains/' + this.claimID + '/upload'
      },
      totalClaims: function () {
        return this.claims.length
      },
      ...mapGetters({
        direction: 'getDirection',
        locale: 'getLocale'
      })
    },
    methods: {
      finish() {
        this.$emit('finish');
      },
      resetForm() {
        this.$refs.claimForm.resetFields();
      },
      saveClaim() {
        this.$refs['claimForm'].validate((valid) => {
          if (valid) {
            (new Contact({name: this.claim.claimer_name, phone_number: this.claim.claimer_phone_number})).save()
              .then(contact => {
                console.log(contact)
                this.complain = new Complain({
                  contact_id: contact.id,
                  subject: this.claim.subject,
                  description: this.claim.description,
                  longitude: this.claim.longitude,
                  latitude: this.claim.latitude,
                  has_approved_sworn_statement: this.claim.acceptConditions,
                  has_approved_term_of_use: this.claim.acceptConditions,
                  theme_id: this.claim.theme_id,
                  municipality_id: this.claim.municipality_id,
                });
                console.log(this.complain)
                this.complain.save()
                  .then(claim => {
                    this.claim = claim;
                    this.claimID = claim.id;
                    this.stepOne = false;
                    this.stepTwo = true;
                    this.$message.success(this.$t('Your complaint has been saved and will be processed as soon as possible...'))
                  })
                  .catch(error => {
                    this.$message.error(this.$t('An error has happened. Please try again...'))
                  });
              });
            return true
          } else {
            this.$message.warning(this.$t('Please check your data'));
            return false
          }
        })
      },
    },
    mounted() {
      (new Municipality()).fetchAll({lang: this.locale})
        .then(municipalities => {
          this.municipalities = municipalities;
        });

      (new Theme()).fetchAll({lang: this.locale})
        .then(themes => {
          this.themes = themes;
        });

      if (process.browser) {
        splash();
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
    position: absolute;
    height: 100%;
    width: 33vw;
    overflow: scroll;
    transition: top .3s;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    top: 5vh;
    right: 1vw;
    left: unset;
    background: #f2f2f2;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: 840px) {
      width: calc(98vw - 350px);
    }
    @media screen and (max-width: 480px) {
      width: 98vw;
    }
  }

  .claims-stats {
    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  .splash-screen {
    width: 100%;
    background: #f2f2f2;
    position: absolute;
    min-height: 100%;
    box-shadow: 3px 0 3px rgba(0, 0, 0, .3);
    z-index: 20;
    // top: 88%;
  }

  .app[dir='rtl'] {
    .p-forground {
      left: 1vw;
      right: unset;
    }
  }

  .form-container {
    padding: 0 1rem;
  }

  .upload-icon {
    font-size: 67px !important;
    color: #97a8be !important;;
    margin: 40px 0 16px !important;;
    line-height: 50px !important;;
  }
</style>
