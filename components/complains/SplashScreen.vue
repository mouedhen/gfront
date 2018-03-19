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

            <claims-stats :themes="themes" :totalClaims="totalClaims"/>

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
                  :label="municipality['name_'+ $i18n.locale]"
                  :value="municipality.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="subject">
              <el-select
                style="width: 100%"
                v-model="claim.subject"
                :placeholder="$t('subject')">
                <el-option
                  v-for="theme in themes"
                  :key="theme.id"
                  :label="theme['name_'+ $i18n.locale]"
                  :value="theme.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="description">
              <el-input :placeholder="$t('description')" type="textarea" :rows="3"
                        v-model="claim.description"/>
            </el-form-item>

            <el-form-item class="controls" style="text-align: center">
              <el-button type="primary" @click="saveClaim"
                         v-bind:style="(direction === 'rtl') ? {marginLeft: '10px'} : ''"
                         plain>{{$t('next step')}}</el-button>
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
  import {Municipality} from "~/models/complains/Municipality";
  import {mapGetters} from 'vuex'
  import Cleave from 'vue-cleave-component';
  import {Theme} from "../../models/complains/Theme";
  import {apiDomain} from "../../models/config";

  import ClaimsStats from '../../components/complains/ClaimsStats'

  require('cleave.js/dist/addons/cleave-phone.tn');

  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'

  function splash() {
    let splash = document.getElementById('splash');
    let splashTrigger = document.getElementById('splash-up');
    let splashBtnUp = document.getElementById('splash-btn-up');
    let splashBtnDown = document.getElementById('splash-btn-down');

    if (window.innerWidth > 768) {
      splash.style.top = '5vh';
      splashBtnUp.style.display = 'none';
      splashBtnDown.style.display = 'block';
    } else {
      splash.style.top = '80vh';
      splashBtnUp.style.display = 'block';
      splashBtnDown.style.display = 'none';
    }

    splashTrigger.addEventListener("click", (ev => {
      if (splash.style.top !== '5vh') {
        splash.style.top = '5vh';
        splashBtnUp.style.display = 'none';
        splashBtnDown.style.display = 'block';
      } else {
        splash.style.top = '80vh';
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
            {required: true, message: 'This field is required.', trigger: 'blur'},
          ],
          claimer_phone_number: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {min: 8, max: 16, message: 'This is not a valid phone number.', trigger: 'blur'},
          ],
          description: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      dropZoneOptions: function () {
        return {
          thumbnailWidth: 100,
          thumbnailHeight: 100,
          dictDefaultMessage: "<i class='el-icon-upload upload-icon'></i>UPLOAD ME",
          url: this.claimUpload
        }
      },
      claimUpload: function () {
        return apiDomain + '/public/claims/upload/' + this.claimID
      },
      totalClaims: function () {
        return this.claims.length
      },
      ...mapGetters({
        direction: 'getDirection'
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
            this.claim.save()
              .then(claim => {
                this.claim = claim;
                this.claimID = claim.id;
                this.stepOne = false;
                this.stepTwo = true;
                this.$message.success('Your complain was been saved and will be processed as soon as possible...')
              })
              .catch(error => {
                this.$message.error('An error was happened. Please try again...')
              });
            return true
          } else {
            this.$message.warning('Please check your data');
            return false
          }
        })
      },
    },
    mounted() {
      (new Municipality()).fetchAll()
        .then(municipalities => {
          this.municipalities = municipalities;
        });

      (new Theme()).fetchAll()
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
    height: 95vh;
    width: 33vw;
    overflow: scroll;
    transition: top .3s;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    top: 5vh;
    right: 1vw;
    left: unset;
    background: #f2f2f2;
    @media screen and (max-width: 840px) {
      width: calc(98vw - 350px);
    }
    @media screen and (max-width: 480px) {
      width: 98vw;
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
    padding: 0 1rem 1rem 1rem;
  }

  .upload-icon {
    font-size: 67px !important;
    color: #97a8be !important;;
    margin: 40px 0 16px !important;;
    line-height: 50px !important;;
  }
</style>
