import config from './configs/config'

if (process.env.NODE_ENV === 'production') {
  console.log('Deploying to ...', process.env.NUXT_ENV_DEPLOY)
}

export default {
  ssr: true,

  // TODO static target will generate lot's of static js files. Not sure why
  // target: 'static',

  router: {
    mode: 'history',
    base: config.routerBase,
    scrollBehavior(to) {
      if (to.hash) {
        const id = to.hash.substr(1)
        const el =
          document.getElementById(decodeURIComponent(id)) ||
          document.getElementById(id)

        if (el) {
          el.scrollIntoView &&
            el.scrollIntoView({
              behavior: 'smooth'
            })
        }
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Handbook - Apache ECharts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/favicon.png'
      }
    ]
  },
  tailwindcss: {},
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: ['en', 'zh'],
        strategy: 'prefix',
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          onlyOnRoot: true
        },
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              inThisPage: 'In This Page',
              searchHandbook: 'Search Handbook',
              contributorsWithThisDocument:
                'All Contributors with this Document',
              editInThisDocumentTip: 'Edit this Document',
              editInGithub: 'Edit this page on GitHub'
            },
            zh: {
              inThisPage: '本页目录',
              searchHandbook: '搜索手册',
              contributorsWithThisDocument: '本文贡献者',
              editInThisDocumentTip: '编辑本文',
              editInGithub: '在 GitHub 上编辑本页'
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
    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-import': {}
      }
    },

    extractCSS: {
      // allChunks: true
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'

      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      })
      //github.com/nuxt/nuxt.js/issues/4736#issuecomment-453429870
      https: config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader'
      })
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //     options: { fix: true }
      //   })
      // }
    },
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js')
    }
  },
  generate: {
    crawler: true
  }
}
