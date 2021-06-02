<template>
  <div class="md-live" v-if="innerCode">
    <div class="md-live-editor">
      <prism-editor v-model="innerCode" :highlight="highlighter">
      </prism-editor>
      <div class="md-live-tag">live</div>
    </div>
    <div class="md-live-preview"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prism-themes/themes/prism-material-oceanic.css'
import { loadScriptsAsync } from '../helper/loadScripts'

function ensureECharts() {
  if (typeof echarts === 'undefined') {
    return loadScriptsAsync([
      'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.js'
    ]).then(() => {})
  }
  return Promise.resolve()
}

export default Vue.extend({
  components: {
    PrismEditor
  },
  props: {
    lang: {
      type: String,
      default: 'js'
    }
  },
  data() {
    return {
      innerCode: ''
    }
  },
  computed: {},
  mounted() {
    this.innerCode = (
      (this.$slots.default && this.$slots.default[0].text) ||
      ''
    ).trim()
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages[this.lang] || languages.js)
    }
  },
  watch: {
    innerCode() {
      ensureECharts().then(() => {
        // TODO type, resize, throttle
        if (!this._chartInstance) {
          this._chartInstance = echarts.init(
            this.$el.querySelector('.md-live-preview')
          )
        }
        const func = new Function(this.innerCode + '\n return option;')
        try {
          const option = func()
          this._chartInstance.setOption(option)
        } catch (e) {}
      })
    }
  }
})
</script>

<style lang="postcss">
.md-live {
  @apply shadow-lg rounded-lg mt-10 mb-20;
}
/* required class */
.md-live-editor {
  @apply rounded-t-lg;
  position: relative;
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #263238;

  font-size: 13px;
  padding: 10px;

  pre {
    color: #c3cee3;
  }

  .md-live-tag {
    position: absolute;
    right: 0;
    top: 0;
    text-transform: uppercase;
    margin-right: 1rem;
    margin-top: 0.75rem;
    color: #f7fafc;
    z-index: 10;
  }
}

.md-live-preview {
  height: 300px;
  @apply rounded-b-lg;
}

.prism-editor-wrapper .prism-editor__editor,
.prism-editor-wrapper .prism-editor__textarea {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  line-height: 1.5;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
