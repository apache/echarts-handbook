<template>
  <iframe :width="width" :height="height" :src="fullSrc"></iframe>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import config from '~/configs/config'
export default Vue.extend({
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
  computed: {
    fullSrc() {
      return config.exampleViewPath + this.src
    }
  }
})
</script>

<style lang="scss"></style>
