<template>
  <iframe :width="width" :height="height" :src="fullSrc"></iframe>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
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
          ctx.root.$store.state.locale
        ) + props.src
      )
    })
    return {
      fullSrc
    }
  }
})
</script>

<style lang="scss"></style>
