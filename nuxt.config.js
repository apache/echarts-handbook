import config from './configs/config'

if (process.env.NODE_ENV === 'production') {
  console.log('Deploying to ...', process.env.NUXT_ENV_DEPLOY)
}
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default {
  ssr: true,

  target: 'static',

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
  hooks: {
    'content:file:beforeParse': file => {
      // TODO better way to detect?
      const lang = file.path.match('contents/zh') ? 'zh' : 'en'
      if (file.extension === '.md') {
        // Replace variables
        ;[
          'optionPath',
          'mainSitePath',
          'exampleViewPath',
          'exampleEditorPath'
        ].forEach(p => {
          const val = config[p].replace('${lang}', lang)
          file.data = file.data.replace(
            new RegExp('\\$\\{' + p + '\\}', 'g'),
            val
          )
        })
      }
      file.data = file.data.replace(/\$\{lang\}/g, lang)
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
  content: {
    dir: 'contents',
    markdown: {
      tocDepth: 3,
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      },
      highlighter(rawCode, lang, attrs) {
        if (attrs.fileName === 'null') {
          attrs.fileName = ''
        }
        if (attrs.lineHighlights === 'null') {
          attrs.lineHighlights = ''
        }
        const liveMatch = /^live(-(lr|tb|bt|rl))?$/.exec(attrs.fileName || '')
        if (liveMatch) {
          return `<md-live lang="${lang}" layout="${liveMatch[2] ||
            'tb'}">${escapeHtml(rawCode)}</md-live>`
        } else {
          return `<md-code-block lang="${lang}" line-highlights="${attrs.lineHighlights ||
            ''}" file-name="${attrs.fileName || ''}" >${escapeHtml(
            rawCode
          )}</md-code-block>`
        }
      },
      remarkPlugins: []
    },
    liveEdit: false
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
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
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
              inThisPage: 'In This Page'
            },
            zh: {
              inThisPage: '本页目录'
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
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      })
      //github.com/nuxt/nuxt.js/issues/4736#issuecomment-453429870
      https: config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader'
      })
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: { fix: true }
        })
      }
    },

    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js')
    }
  },
  generate: {
    crawler: true
  }
}
