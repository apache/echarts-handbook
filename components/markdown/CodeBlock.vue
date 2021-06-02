<template>
  <div class="md-code-block">
    <div class="nuxt-content-highlight">
      <pre
        :class="`language-${highlightResult.lang} line-numbers`"
        v-html="highlightResult.code"
      ></pre>
    </div>
    <span v-if="fileName"></span>
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

const DIFF_HIGHLIGHT_SYNTAX = /^(diff)-([\w-]+)/i

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
export default defineComponent({
  components: {},
  props: {
    lang: {
      type: String,
      default: 'js'
    },
    lineHighlights: String,
    fileName: String
  },

  setup(props, context) {
    const rawCode = ref('')

    const highlightResult = computed(() => {
      let lang = props.lang || ''
      let grammer

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
        ? Prism.highlight(rawCode.value, grammer, highlightLanguage)
        : rawCode.value

      if (!lang || !grammer) {
        lang = 'text'
        code = escapeHtml(code)
      }

      return {
        lang,
        code
      }
    })

    // Update first time.
    onMounted(() => {
      const defaultSlot = context.slots.default && context.slots.default()
      rawCode.value = ((defaultSlot && defaultSlot[0].text) || '').trim()
    })

    return {
      highlightResult
    }
  }
})
</script>

<style lang="postcss">
.nuxt-content-highlight {
  position: relative;
  line-height: 1em;
  font-size: 13px;

  .filename {
    position: absolute;
    right: 0;
    top: 0;
    color: #f7fafc;
    z-index: 10;
    font-family: DM Mono, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: -0.025em;
    line-height: 1;
    margin-right: 1rem;
    margin-top: 0.75rem;
  }
}
</style>
