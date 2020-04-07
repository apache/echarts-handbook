import enPosts from './contents/en/posts';
import zhPosts from './contents/zh/posts';

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
    routes: []
      .concat(generateRoutes(zhPosts, '/zh/'))
      // .concat(enPosts.map(post => `/en/${post}`))
  }
}

console.log(generateRoutes(zhPosts, '/zh/'));

/**
 * Generate routes based info from 'contents/xx/xxPosts.js'
 */
function generateRoutes(postTree, dir, routes) {
  if (routes == null) {
    routes = [];
  }

  postTree.forEach(info => {
    if (!info) {
      return;
    }
    else if (typeof info === 'string') {
      routes.push(dir + info);
    }
    else if (typeof info === 'object' && info.children) {
      generateRoutes(info.children, dir + info.dir + '_', routes);
    }
  });
  return routes;
}
