<template>
  <div
    ref="container"
    :class="`md-live layout-${layout}`"
    v-observe-visibility="visibilityChanged"
    v-if="innerCode"
  >
    <div class="md-live-editor">
      <div class="md-live-editor-container">
        <prism-editor
          v-model="innerCode"
          :highlight="highlighter"
          :readonly="readOnly"
        >
        </prism-editor>
      </div>
      <div class="md-live-tag">live</div>
      <code-block-copy-clipboard
        :source="innerCode"
      ></code-block-copy-clipboard>
    </div>
    <div ref="previewContainer" class="md-live-preview"></div>
  </div>
</template>

<script lang="ts">
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prism-themes/themes/prism-material-oceanic.css'
import { loadScriptsAsync } from '../helper/loadScripts'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import {
  defineComponent,
  watch,
  ref,
  unref,
  onMounted,
  onUnmounted
} from '@vue/composition-api'
import * as base64 from 'js-base64'
import { createSandbox } from '../helper/sandbox'
import CodeBlockCopyClipboard from './CodeBlockCopyClipboard.vue'

declare const echarts: any

function ensureECharts() {
  if (typeof echarts === 'undefined') {
    return loadScriptsAsync([
      // 'https://fastly.jsdelivr.net/npm/echarts/dist/echarts.js'
      process.env.NUXT_ENV_DEPLOY === 'asf'
        ? 'https://fastly.jsdelivr.net/npm/echarts/dist/echarts.min.js'
        : 'https://fastly.jsdelivr.net/npm/echarts-nightly/dist/echarts.min.js'
    ]).then(() => {})
  }
  return Promise.resolve()
}

export default defineComponent({
  components: {
    PrismEditor,
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

    layout: {
      type: String,
      default: 'tb',
      validator(value: string) {
        return ['lr', 'tb', 'rl', 'bt'].includes(value)
      }
    },

    height: {
      type: Number
    },

    readOnly: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    const innerCode = ref(base64.decode(props.code))
    const previewContainer = ref<HTMLElement | null>(null)
    const container = ref<HTMLElement | null>(null)

    let sandbox: ReturnType<typeof createSandbox>

    function update() {
      if (props.height) {
        container.value!.style.height = props.height + 'px'
      }
      ensureECharts().then(() => {
        if (!sandbox) {
          addListener(unref(previewContainer)!, resize)
          sandbox = createSandbox()
        }
        // TODO refresh.
        try {
          unref(previewContainer) &&
            sandbox.run(unref(previewContainer)!, unref(innerCode))
        } catch (e) {
          console.error(e)
        }
      })
    }

    function resize() {
      if (sandbox) {
        sandbox.resize()
      }
    }

    const debouncedUpdate = debounce(update, 500, {
      trailing: true
    })

    watch(innerCode, () => {
      debouncedUpdate()
    })

    // onMounted(() => {
    //   debouncedUpdate()
    // })

    onUnmounted(() => {
      removeListener(unref(previewContainer)!, resize)
    })

    return {
      innerCode,
      previewContainer,
      container,
      highlighter(code) {
        return highlight(code, languages[props.lang] || languages.js)
      },
      visibilityChanged(isVisible) {
        if (isVisible) {
          if (!sandbox) {
            debouncedUpdate()
          } else {
            sandbox.resume()
          }
        } else {
          if (sandbox) {
            sandbox.pause()
          }
        }
      }
    }
  }
})
</script>

<style lang="postcss">
.md-live {
  @apply overflow-hidden;
  @apply shadow-lg rounded-lg mt-10 mb-20;
  @apply flex flex-col-reverse;

  @media (max-width: 768px) {
    min-height: 500px;
  }

  @media (min-width: 768px) {
    &.layout-lr {
      @apply flex-row;
    }
    &.layout-rl {
      @apply flex-row-reverse;
    }
    &.layout-tb {
      @apply flex-col;
    }
    &.layout-bt {
      @apply flex-col-reverse;
    }
    &.layout-lr,
    &.layout-rl {
      @apply items-stretch;

      .md-live-editor-container {
        height: 100%;
      }
      .md-live-editor {
        @apply flex-1;
      }
      .md-live-preview {
        @apply flex-1;
        height: auto;
      }
    }
  }
}

/* required class */
.md-live-editor {
  position: relative;

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3) !important;
  }

  .md-live-editor-container {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #263238;

    max-height: 500px;
    overflow-y: auto;

    font-size: 13px;
    padding: 10px;

    @media (max-width: 768px) {
      max-height: 300px;
    }
  }

  pre {
    color: #c3cee3;
  }

  .md-live-tag {
    position: absolute;
    right: 0;
    top: 0;
    text-transform: uppercase;
    @apply mr-7 mt-3;
    color: #f7fafc;
    z-index: 10;
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

.md-live-preview {
  height: 300px;
  overflow: hidden;
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
