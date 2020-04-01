import enPosts from './contents/en/enPosts';
import zhPosts from './contents/zh/zhPosts';

export default {
  mode: 'universal',

  router: {
    base: '/echarts-booklet/dist'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    [
      'nuxt-i18n',
      {
        locales: ['en', 'zh'],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              greeting: 'Hello world!'
            },
            zh: {
              greeting: '你好！'
            }
          }
        }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      });
    },

    filenames: {
      chunk: 'js/[contenthash].js'
    }
  },
  generate: {
    routes: [
      '/zh/line'
    ]
    // routes: [

    // ]
    // .concat(zhPosts.map(post => `/zh/${post}`))
    // .concat(enPosts.map(post => `/en/${post}`))
  }
}
