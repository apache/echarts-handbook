// import enPosts from './contents/en/posts'
import zhPosts from './contents/zh/posts'
import config from './configs/config'

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default {
  ssr: false,

  target: 'static',

  router: {
    mode: 'history',
    base: config.routerBase
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  content: {
    dir: 'contents',
    markdown: {
      tocDepth: 2,
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      },
      highlighter(rawCode, lang, attrs) {
        if (attrs.fileName === 'live') {
          return `<md-live lang="${lang}">${escapeHtml(rawCode)}</md-live>`
        } else {
          return `<md-code-block lang="${lang}" lineHighlights="${
            attrs.lineHighlights
          }" fileName="${attrs.fileName}" >${escapeHtml(
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
    // Doc: https://bootstrap-vue.js.org
    // [
    //   'bootstrap-vue/nuxt',
    //   {
    //     icons: true
    //   }
    // ],
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
    },

    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js')
    }
  },
  generate: {
    // routes: [].concat(generateRoutes(zhPosts, '/zh/'))
    // .concat(enPosts.map(post => `/en/${post}`))
  }
}

// console.log(generateRoutes(zhPosts, '/zh/'))

/**
 * Generate routes based info from 'contents/xx/xxPosts.js'
 */
function generateRoutes(postTree, dir, routes) {
  if (routes == null) {
    routes = []
  }

  postTree.forEach(info => {
    if (!info || typeof info !== 'object') {
      return
    }
    if (info.children) {
      generateRoutes(info.children, dir + info.dir + '_', routes)
    } else {
      routes.push(dir + info.dir)
    }
  })
  return routes
}
