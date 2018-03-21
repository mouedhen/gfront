<template>
  <div class="container">

    <div class="cover"
         v-bind:style="{backgroundImage: 'url('+ cover +')'}"
         style="height: 150px"></div>
    <div>
      <el-dialog
        custom-class="petition-modal"
        :visible.sync="dialogVisible"
        center
        width="100%"
        lock-scroll
        :before-close="handleClose">
        <el-form ref="petitioner" :rules="petitioner_rules" :model="petitioner">

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
                name="email"/>
            </div>
          </el-form-item>

          <el-form-item :label="$t('address')">
            <el-input type="textarea" :rows="3" :placeholder="$t('your street address')"
                      v-model="petitioner.address"/>
          </el-form-item>

          <el-form-item class="controls">
            <el-button>{{$t('cancel')}}</el-button>
            <el-button type="default" @click="submitPetitioner">{{$t('submit')}}</el-button>
          </el-form-item>

        </el-form>

      </el-dialog>
    </div>
    <el-card style="min-height: calc(100% - 150px)">
      <el-row style="flex-wrap: wrap" type="flex">
        <el-col :xs="24" :md="24" :lg="16" style="padding: 1rem">
          <div class="details-container">
            <h1 style="margin-bottom: 1rem">{{petition.name}}</h1>
            <p style="text-align: justify; line-height: 1.4rem">{{petition.description}}</p>
            <div style="text-align: right">
              <el-button style="text-transform: uppercase; margin: 1rem 0" type="primary" @click="dialogVisible = true">
                {{$t('sign')}}
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="24" :lg="8">
          <el-card>
            <dl class="petition-dl">
              <dt>{{$t('theme')}}</dt>
              <dd>{{petition.theme['name_' + $i18n.locale]}}</dd>
              <dt>{{$t('must be submitted to')}}</dt>
              <dd>{{target}}</dd>
              <dt>{{$t('requested signatures')}}</dt>
              <dd>{{petition.requested_signatures_number}}</dd>
              <dd>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="signaturesPercentage"/>
              </dd>
              <dd>
                <social-sharing :url="sharedUrl"
                                :title="petition.name"
                                :description="petition.description"
                                :quote="petition.description"
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
              </dd>
            </dl>
            <div v-for="attachment in attachments" :key="attachment.id" style="margin-top: 1rem">
              <img :src="setImg(attachment.url)" style="width: 100%; margin-bottom: 1rem">
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import {Petition} from "@/models/petitions/Petition";
  import {Petitioner} from "@/models/petitions/Petitioner";
  import {Signature} from "@/models/petitions/Signature";
  import {mapGetters} from 'vuex'

  import Cleave from 'vue-cleave-component';
  import {appDomain, storageDomain} from "../../../models/config";

  require('cleave.js/dist/addons/cleave-phone.tn');

  export default {
    components: {
      Cleave,
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
        },
      ]
    },
    asyncData({params}) {
      return (new Petition()).fetch(params.uuid)
        .then((petition) => {
          return {petition}
        })
    },
    data() {
      return {
        petitioner: new Petitioner(),
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
        },
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'TN'
        },
        dialogVisible: false
      }
    },
    computed: {
      target: function () {
        if (this.petition.target['name_' + this.$i18n.locale] !== null) {
          return this.petition.target['name_' + this.$i18n.locale];
        } else if (this.petition.target['name_en'] !== null) {
          return this.petition.target.name_en;
        } else if (this.petition.target['name_fr'] !== null) {
          return this.petition.target.name_fr;
        } else {
          return this.petition.target.name_ar;
        }
      },
      sharedUrl: function () {
        return appDomain + this.$route.path;
      },
      cover: function () {
        if (this.petition.cover)
          return storageDomain + this.petition.cover.url;
        return ''
      },
      attachments: function () {
        console.log(this.petition.attachments)
        return this.petition.attachments
      },
      signaturesPercentage: function () {
        if (this.petition.requested_signatures_number <= 0) return 0;
        return this.petition.signatures / this.petition.requested_signatures_number * 100
      },
      ...mapGetters({
        direction: 'getDirection'
      }),
    },
    methods: {
      handleClose(done) {
        this.petitioner = new Petitioner();
        done();
      },
      setImg(uri) {
        return storageDomain + uri
      },
      submitPetitioner() {
        this.$refs['petitioner'].validate((valid) => {
            if (valid) {
              this.petitioner.save()
                .then(petitioner => {
                  let petitioner_id = petitioner.id;
                  let petition_id = this.petition.id;
                  let signature = new Signature({petitioner_id, petition_id});
                  signature.save().then(() => {
                    this.petitioner = new Petitioner();
                    let uuid = this.$route.params.uuid;
                    this.petition.fetch(uuid);
                    this.$message.success('Thank you for your contribution.');
                    this.dialogVisible = false
                  })
                    .catch(() => {
                      this.$message.warning('Please check your data');
                      return false
                    })
                });
              return true
            } else {
              this.$message.warning('Please check your data');
              return false
            }
          }
        )
      },
    },
  }
</script>

