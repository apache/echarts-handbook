<template>
  <iframe
    :width="width"
    :height="height"
    :src="finalSrc"
    v-observe-visibility="visibilityChanged"
  ></iframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import config from '~/configs/config'

export default defineComponent({
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '350'
    },
    src: String
  },

  setup(props, ctx) {
    const fullSrc = computed(() => {
      return (
        config.exampleViewPath.replace(
          '${lang}',
          (ctx.root as any).$i18n.locale
        ) + props.src
      )
    })
    const finalSrc = ref('')
    return {
      finalSrc,
      visibilityChanged(isVisible) {
        if (isVisible) {
          finalSrc.value = fullSrc.value
        }
      }
    }
  }
})
</script>

<style lang="scss"></style>
