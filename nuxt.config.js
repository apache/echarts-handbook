import config from './configs/config'

if (process.env.NODE_ENV === 'production') {
  console.log('Deploying to ...', process.env.NUXT_ENV_DEPLOY)
}

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
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
      } else {
        document.getElementsByClassName('page-main')[0].scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  },
  /*
   ** Headers of the page
   */
  head() {
    const locale = this.$i18n.locale;
    const isCN = locale === 'zh';
    const appName = isCN ? '使用手册' : 'Handbook'
    return {
      titleTemplate: chunk => `${chunk ? chunk + ' - ' : ''}${appName} - Apache ECharts`,
      link: [
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: `https://echarts.apache.org/${locale}/images/favicon.png`
        },
        {
          rel: 'stylesheet',
          href: isCN
            ? 'https://lib.baomitu.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css'
            : 'https://fastly.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: `https://echarts.apache.org/${locale}/css/main.css`
        },
        {
          rel: 'stylesheet',
          href: isCN
            ? 'https://lib.baomitu.com/docsearch.js/2.6.3/docsearch.min.css'
            : 'https://fastly.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.css'
        }
      ],
      script: [
        {
          src: isCN
            ? 'https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js'
            : 'https://fastly.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
        },
        {
          src: isCN
            ? 'https://lib.baomitu.com/twitter-bootstrap/3.4.1/js/bootstrap.min.js'
            : 'https://fastly.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js'
        },
        {
          src: isCN
            ? 'https://lib.baomitu.com/docsearch.js/2.6.3/docsearch.min.js'
            : 'https://fastly.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js'
        }
      ]
    }
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
              contributorsWithThisDocument: 'Contributors',
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
