<template>
  <div class="clipboard" ref="copyButton">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      v-if="clipboardChecked"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      v-else
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </svg>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref
} from '@vue/composition-api'
import Clipboard from 'clipboard'

export default defineComponent({
  components: {},
  props: {
    source: {
      type: String
    }
  },

  setup(props) {
    const copyButton = ref<HTMLElement | null>(null)
    const clipboardChecked = ref(false)

    onMounted(() => {
      const copyCode = new Clipboard(copyButton.value!, {
        text(trigger) {
          return props.source!
        }
      })

      copyCode.on('success', event => {
        event.clearSelection()
        clipboardChecked.value = true
        window.setTimeout(() => {
          clipboardChecked.value = false
        }, 2000)
      })
    })

    return {
      clipboardChecked,

      copyButton
    }
  }
})
</script>

<style lang="postcss" scoped>
.clipboard {
  position: absolute;
  right: 0;
  bottom: 0;

  @apply text-blue-gray-400;

  @apply mr-4 mb-3;
  @apply rounded-lg border-blue-gray-400 border;
  @apply p-2;
  @apply cursor-pointer;

  &:hover {
    @apply bg-blue-gray-400 bg-opacity-25;
  }

  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
  }
}

&:hover {
  .clipboard {
    @apply block;
  }
}
</style>
