<template>
  <div class="md-code-block">
    <div class="nuxt-content-highlight">
      <!--
        NOTE!!!: don't indent code tag inside the pre tag
        https://github.com/PrismJS/prism/issues/554
       -->
      <pre
        :class="`language-${highlightResult.lang} line-numbers`"
      ><code v-html="highlightResult.code"></code></pre>
    </div>
    <span v-if="fileName" class="filename">{{ fileName }}</span>
    <code-block-copy-clipboard :source="rawCode"></code-block-copy-clipboard>
  </div>
</template>

<script lang="ts">
import Prism from 'prismjs'

// enable syntax highlighting on diff language
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight'

import 'prism-themes/themes/prism-material-oceanic.css'

import { defineComponent, ref, onMounted, computed } from '@vue/composition-api'
import * as base64 from 'js-base64'

import CodeBlockCopyClipboard from './CodeBlockCopyClipboard.vue'

const DIFF_HIGHLIGHT_SYNTAX = /^(diff)-([\w-]+)/i

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlight(lang: string, rawCode: string) {
  lang = lang || ''
  let grammer: string = ''

  const diffLanguage = lang.match(DIFF_HIGHLIGHT_SYNTAX)
  if (diffLanguage) {
    lang = diffLanguage[2]
    grammer = Prism.languages.diff
  }

  lang = lang === 'vue' ? 'html' : lang

  if (!grammer) {
    grammer = Prism.languages[lang]
  }

  const highlightLanguage = diffLanguage ? `diff-${lang}` : lang

  let code = grammer
    ? Prism.highlight(rawCode, grammer, highlightLanguage)
    : rawCode

  if (!lang || !grammer) {
    lang = 'text'
    code = escapeHtml(code)
  }

  return {
    lang,
    code
  }
}
export default defineComponent({
  components: {
    CodeBlockCopyClipboard
  },
  props: {
    lang: {
      type: String,
      default: 'js'
    },
    code: {
      type: String
    },
    lineHighlights: String,
    fileName: String
  },

  setup(props, context) {
    const rawCode = ref(base64.decode(props.code!))

    const highlightResult = computed(() => {
      return highlight(props.lang, rawCode.value)
    })

    return {
      rawCode,
      highlightResult
    }
  }
})
</script>

<style lang="postcss">
.md-code-block {
  position: relative;
}
.nuxt-content-highlight {
  line-height: 1em;
  font-size: 13px;

  pre[class*='language-'],
  code[class*='language-'] {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;

    color: #c3cee3;
    background: #263238;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    text-align: left;

    border: none;
  }

  .filename {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    font-family: DM Mono, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: -0.025em;
    line-height: 1;

    @apply text-blue-gray-400 mr-4 mt-3;
  }

  .clipboard {
    display: none;
  }

  &:hover {
    .clipboard {
      display: block;
    }
  }
}
</style>
