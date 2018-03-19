const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "GOULEL'HOM - ڨوللهم",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#B71C1C'},

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-default/index.css',
    '@/assets/css/style.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n',
    { src: '@/plugins/VueFlickity.js', ssr: false },
    { src: '@/plugins/VueSwiperPlugin.js', ssr: false },
  ],

  router: {
    middleware: 'i18n'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    vendor: [
      'axios',
      'element-ui',
      'vue-i18n',
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        exclude: /node_modules/
      })

    }
  }
};
