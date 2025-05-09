<template>
  <div>
    <navbar />

    <div class="page-main">
      <div
        class="page-content handbook-content single-page container-fluid row flex-xl-nowrap"
      >
        <sidebar />

        <div class="bd-content col-sm-7 pl-sm-2 col-12">
          <div class="post-content content">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '~/components/partials/Sidebar.vue'
import Navbar from '~/components/partials/Navbar.vue'

export default {
  components: {
    Sidebar,
    Navbar,
  },

  head() {
    const locale = (this as any).$i18n.locale
    const isCN = locale === 'zh'
    const appName = isCN ? '使用手册' : 'Handbook'

    // TODO CSP 问题
    // const cdnRoot =
    //   // @ts-ignore
    //   (typeof window !== 'undefined' && window.ECHARTS_WWW_VENDORS_CDN_ROOT) ||
    //   'https://fastly.jsdelivr.net/npm/'
    const cdnRoot = `//echarts.apache.org/${locale}/js/vendors/`
    return {
      titleTemplate: (chunk) =>
        `${chunk ? chunk + ' - ' : ''}${appName} - Apache ECharts`,
      htmlAttrs: {
        lang: isCN ? 'zh-CN' : 'en',
      },
      link: [
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: `https://echarts.apache.org/${locale}/images/favicon.png`,
        },
        // ...(isCN ? [
        //   'https://lib.baomitu.com',
        //   'https://registry.npmmirror.com'
        // ] : [
        //   'https://fastly.jsdelivr.net',
        //   'https://cdn.jsdelivr.net',
        // ])
        // .concat('https://avatars.githubusercontent.com')
        // .map(domain => ({
        //   rel: 'dns-prefetch',
        //   href: domain
        // })),
        {
          rel: 'stylesheet',
          href: `${cdnRoot}bootstrap@3.3.7/css/bootstrap.min.css`,
        },
        {
          rel: 'stylesheet',
          href: `https://echarts.apache.org/${locale}/css/main.css`,
        },
        {
          rel: 'stylesheet',
          href: `${cdnRoot}docsearch.js@2.6.3/dist/cdn/docsearch.min.css`,
        },
      ],
      script: [
        {
          innerHTML: `window.ECHARTS_WWW_VENDORS_CDN_ROOT = '${cdnRoot}';`
        },
        {
          src: `${cdnRoot}jquery@3.7.1/dist/jquery.min.js`,
        },
        {
          src: `${cdnRoot}bootstrap@3.3.7/js/bootstrap.min.js`,
        },
        {
          src: `${cdnRoot}docsearch.js@2.6.3/dist/cdn/docsearch.min.js`,
        },
      ],
      noscript: [
        {
          body: true,
          innerHTML:
            '<div class="no-script"><strong>很抱歉，Apache ECharts 网站需要启用 JavaScript 才能正常运行。</strong></div>',
        },
      ],
      __dangerouslyDisableSanitizers: ['noscript', 'script'],
    }
  },

  mounted() {
    // This help scroll to the hash
    const hash = location.hash
    location.hash = ''
    location.hash = hash
  },
}
</script>

<style lang="postcss">
body {
  font-family: 'Open Sans', 'PingFang SC', Helvetica, Arial, sans-serif;
}

.page-main {
  overflow-x: hidden;
}

.handbook-content {
  padding-left: 0;
  padding-right: 0;
}

.bd-content {
  padding-left: 50px;

  @media (max-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
}

.post-content {
  margin: 0 auto;
  max-width: 960px;
}

.post-inner {
  margin: 20px 0 80px 0;

  @apply text-blue-gray-500;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    scroll-margin-top: 20px;

    &:hover .permalink {
      display: inline-block;
    }
  }

  h1 {
    margin: 40px 0 30px 0;
    font-size: 36px;
    font-weight: 700;
    @apply text-blue-gray-700;
  }

  h2 {
    margin: 60px 0 20px 0;
    padding-bottom: 20px;
    font-size: 28px;
    @apply text-blue-gray-600;
    border-bottom: 1px solid #eee;
  }

  h1 + h2 {
    margin-top: 40px;
  }

  h3 {
    margin: 40px 0 20px 0;
    font-size: 22px;
    @apply text-blue-gray-600;
  }

  h4 {
    margin: 25px 0 20px 0;
    font-size: 18px;
    @apply text-blue-gray-600;
  }

  h5 {
    font-size: 16px;
    @apply text-blue-gray-500;
  }

  h6 {
    font-size: 14px;
    @apply text-blue-gray-500;
  }

  .permalink {
    display: none;
  }

  blockquote {
    margin: 15px 0;
    padding: 20px 15px;

    @apply bg-blue-100 border-blue-400 border-l-4 rounded-lg;

    code {
      @apply bg-blue-200 shadow-none border-0 text-current;
    }
    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }

    pre {
      padding: 0.5em;
    }
  }

  pre {
    margin: 20px 0;
    border-radius: 5px;
    /* background-color: #f5f7fa; */
    border: none;
    padding: 10px;
    font-size: 13px;

    code {
      background: none;
      font-size: 13px;
    }
  }

  code {
    font-size: 14px;
  }

  iframe {
    border: none;
    margin: 10px 0;
  }

  ol,
  ul {
    padding-left: 20px;
  }

  p,
  li {
    line-height: 1.7em;
    font-size: 16px;
  }

  p {
    margin: 15px 0;
  }

  img {
    @apply shadow-lg rounded-lg;
  }

  a {
    color: #337ab7;
  }
}

.post-inner .table-of-contents {
  position: fixed;
  left: 77%;
  width: 21%;
  top: 65px;
  max-height: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  background-color: transparent;
  padding: 10px;
  overflow: hidden;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0 0 10px 0;
  }

  .toc-container-header {
    font-size: 16px;
    font-weight: bold;
  }

  ul {
    padding-left: 0;
    margin-bottom: 0;
    flex-grow: 1;
    overflow: auto;

    li {
      list-style: none;
      font-size: 14px;

      &.toc2 {
        font-size: 15px;
      }

      &.toc3 {
        font-size: 14px;
        padding-left: 15px;
      }

      &.toc3 + .toc2 {
        margin-top: 15px;
      }
    }
  }

  a {
    @apply text-blue-gray-500;
    transition: 0.5s;

    &:hover {
      color: #555;
    }
  }
}
</style>
