<template>
  <div class="container" style="padding: 1rem">
    <el-card>
      <h1 class="title" style="text-transform: capitalize">{{$t('contact us')}}</h1>
      <div style="text-align: center">
        <p>{{$t('We are eager to discuss with you, and answer any questions you may have. Enter your details and we ll get back to you shortly')}}.</p>
      </div>
      <el-row>
        <el-col :xs="24" :md="12" :span="24">
          <div>
            <img style="max-width: 80%" src="/images/logo.png" alt="logo goulel'hom"/>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <dl class="dl-flex">
            <dt>{{$t('email')}}</dt>
            <dd><a href="mailto:goulelhom@raj-tunisie.org">goulelhom@raj-tunisie.org</a></dd>
            <dt>{{$t('phone number')}}</dt>
            <dd dir="ltr" v-bind:style="(direction === 'rtl') ? {textAlign: 'right', margin: '0 40px 0 0'} : ''">(+216) 71 247 538</dd>
            <dt>{{$t('fax number')}}</dt>
            <dd dir="ltr" v-bind:style="(direction === 'rtl') ? {textAlign: 'right', margin: '0 40px 0 0'} : ''">(+216) 71 253 547</dd>
            <dt>{{$t('address')}}</dt>
            <dd>{{$t('2nd floor, 15 Street January 18, 1952 - Tunis 1001')}}</dd>
          </dl>
          <div style="text-align: center">
            <ul class="social-icons icon-circle icon-zoom list-unstyled list-inline">
              <li><a href="https://www.facebook.com/GoulelHom/" target="_blank"><i
                class="fa fa-facebook"></i></a></li>
              <li><a href="https://twitter.com/goulelhom" target="_blank"><i
                class="fa fa-twitter"></i></a></li>
              <li><a href="https://www.youtube.com/channel/UCNVW0ABp0EMHDKeiBKkq4pQ/featured"
                     target="_blank"><i class="fa fa-youtube"></i></a></li>
              <li><a href="https://www.instagram.com/GoulelHom/" target="_blank"><i
                class="fa fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com/company/goulel-hom/" target="_blank"><i
                class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-form :model="contact" ref="contactForm" :rules="rules">

        <el-form-item prop="name">
          <el-input :placeholder="$t('your name')" v-model="contact.name" name="name"/>
        </el-form-item>

        <el-form-item prop="phone_number">
          <div class="el-input" dir="ltr">
            <cleave v-model="contact.phone_number" :options="cleaveOptions"
                    :placeholder="$t('your phone number')"
                    v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
                    class="el-input__inner" name="phone_number"/>
          </div>
        </el-form-item>

        <el-form-item prop="email">
          <div class="el-input" dir="ltr">
            <input
              type="email"
              :placeholder="$t('your email address')"
              v-model="contact.email"
              v-bind:style="(direction === 'rtl') ? {textAlign: 'right'} : ''"
              class="el-input__inner"
              name="email" />
          </div>
        </el-form-item>

        <el-form-item prop="subject">
          <el-input :placeholder="$t('subject')" v-model="contact.subject" name="subject"/>
        </el-form-item>

        <el-form-item prop="message">
          <el-input :placeholder="$t('your message')" v-model="contact.message" name="message" type="textarea"
                    :rows="6"/>
        </el-form-item>

        <el-form-item class="controls">
          <el-button type="primary" @click="send">{{$t('submit')}}</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import {Contact} from '@/models/general/Contact'
  import Cleave from 'vue-cleave-component';

  require('cleave.js/dist/addons/cleave-phone.tn');

  export default {
    components: {Cleave},
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
        contact: new Contact(),
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'TN'
        },
        rules: {
          name: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {
              min: 4,
              max: 150,
              message: 'The length must been between 4 and 150 characters.',
              trigger: 'blur'
            },
          ],
          phone_number: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {min: 8, max: 20, message: 'This must be a valid phone number', trigger: 'blur'},
          ],
          email: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {type: 'email', message: 'This must be a valid email address.', trigger: 'blur'},
          ],
          subject: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {
              min: 4,
              max: 150,
              message: 'The length must been between 4 and 150 characters.',
              trigger: 'blur'
            },
          ],
          message: [
            {required: true, message: 'This field is required.', trigger: 'blur'},
            {min: 4, message: 'The message length must been up to 10 characters.', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      ...mapGetters({
        direction: 'getDirection'
      })
    },
    methods: {
      send() {
        this.$refs['contactForm'].validate((valid) => {
          if (valid) {
            this.contact.save()
              .then(r => {
                this.contact = new Contact();
                this.$message.success('your request has been successfully registered');
              })
          } else {
            this.$message.warning('please check your parameters');
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    text-align: center;
  }
  .el-card {
    padding: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #222222;
  }

  dt {
    text-transform: capitalize;
    font-weight: bold;
    margin-bottom: .5rem;
  }

  dd {
    margin-bottom: 1rem;
  }

  .el-col {
    margin-bottom: 1rem;
  }
</style>
