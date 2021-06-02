<template>
  <iframe :width="width" :height="height" :src="fullSrc"></iframe>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import config from '~/configs/config'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350'
    },
    src: String
  },

  setup(props) {
    const fullSrc = computed(() => {
      return config.exampleViewPath + props.src
    })
    return {
      fullSrc
    }
  }
})
</script>

<style lang="scss"></style>
