const pkg = require('./package')

module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  env: {
    appName: 'Nuxt Blog'
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
