<template>
  <div>
    <div class="post-inner">
      <div v-if="toc.length" class="table-of-contents">
        <h4 class="toc-container-header">{{ $t('inThisPage') }}</h4>
        <ul>
          <li
            v-for="link of toc"
            :key="link.id"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
          >
            <NuxtLink :to="`#${link.id}`">{{ link.title }}</NuxtLink>
          </li>
        </ul>
      </div>
      <!--
        'nuxt-content' class for DocSearch
        https://github.com/algolia/docsearch-configs/blob/master/configs/apache_echarts.json
      -->
      <div class="nuxt-content">
        <post-content :content="html"></post-content>
      </div>
    </div>
    <contributors :path="postPath"></contributors>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '~/components/markdown/global'
import markdown from 'markdown-it'
import anchor from 'markdown-it-anchor'
import Contributors from '~/components/partials/Contributors.vue'
import PostContent from '~/components/partials/PostContent'
import * as base64 from 'js-base64'
import config from '~/configs/config'
import LazyLoad from 'vanilla-lazyload'

function parseLiveCodeBlocks(md: string) {
  return md.replace(
    /^```(\w+?)\s+live\s*({.*?})?\s*?\n([\s\S]+?)^```/gm,
    (full, lang = 'js', options = '{}', code: string = '') => {
      lang = lang.trim()
      options = options.trim() || '{}'
      const encoded = base64.encode(code.trim(), true)
      return `<md-live lang="${lang}" code="'${encoded}'" v-bind="${options}" />`
    }
  )
}

function parseCodeBlocks(md: string) {
  return md.replace(
    /^```(\w+?)\s*({.*?})?\s*?\n([\s\S]+?)^```/gm,
    (full, lang = 'js', lineHighlights = '', code: string = '') => {
      lang = lang.trim()
      const encoded = base64.encode(code.trim(), true)
      return `<md-code-block lang="${lang}" code="'${encoded}'" line-highlights="'${lineHighlights}'" />`
    }
  )
}

function replaceVars(md: string, lang: string) {
  // Replace variables
  ;[
    'optionPath',
    'mainSitePath',
    'exampleViewPath',
    'exampleEditorPath'
  ].forEach(p => {
    const val = config[p].replace('${lang}', lang)
    md = md.replace(new RegExp('\\$\\{' + p + '\\}', 'g'), val)
  })
  md = md.replace(/\$\{lang\}/g, lang)
  return md
}

function slugify(s: string) {
  return encodeURIComponent(
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
  )
}

export default {
  components: {
    Contributors,
    PostContent
  },
  data() {
    return {
      toc: [] as {
        title: string
        id: string
        depth: number
      }[]
    }
  },
  mounted() {
    this.toc = []
    const headers =
      this.$el.querySelector('.post-inner')?.querySelectorAll(' h2,h3') || []
    for (let i = 0; i < headers.length; i++) {
      const title = (headers[i] as HTMLHeadingElement).innerText
      this.toc.push({
        title,
        depth: +headers[i].nodeName.replace(/\D/g, ''),
        id: slugify(title)
      })
    }
    setTimeout(() => {
      // FIXME not sure why this needs to be in the setTimeout
      // init lazy load
      // @ts-ignore
      this._lazyload = new LazyLoad({
        // container: this.$el.querySelector('.post-inner') as HTMLElement,
        elements_selector: 'img[data-src], iframe[data-src]',
        threshold: 300
      })
    })
  },
  destroyed() {
    // @ts-ignore
    this._lazyload && this._lazyload.destroy()
  },
  head() {
    return {
      meta: [
        {
          hid: 'docsearch:language',
          name: 'docsearch:language',
          // @ts-ignore
          content: this.$i18n.locale
        }
      ]
    }
  },
  async asyncData({ params, i18n }: any) {
    const postPath = `${i18n.locale}/${params.pathMatch}`
    const fileContent = await import(`~/contents/${postPath}.md`)
    const content = replaceVars(
      parseCodeBlocks(parseLiveCodeBlocks(fileContent.default)),
      i18n.locale
    )

    const md = markdown({
      html: true,
      linkify: true
    })
      .use(anchor, {
        // slugify,
        permalink: false,
        permalinkAfter: true,
        permalinkSymbol: '#',
        permalinkClass: 'permalink'
      })
      .use(function(md) {
        const defaultImageRenderer = md.renderer.rules.image
        md.renderer.rules.image = function(tokens, idx, options, env, self) {
          const token = tokens[idx]
          const srcValue = token.attrGet('src')
          token.attrPush(['data-src', srcValue])
          token.attrSet('src', '')
          return defaultImageRenderer(tokens, idx, options, env, self)
        }
      }) // lazyload

    return { html: md.render(content), postPath }
  }
}
</script>

<style lang="scss"></style>
