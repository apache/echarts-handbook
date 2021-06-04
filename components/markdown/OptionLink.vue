<template>
  <a :href="fullLink" target="_blank">{{ link }}</a>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import config from '~/configs/config'

export default defineComponent({
  props: {
    link: String
  },

  setup(props) {
    const fullLink = computed(() => {
      return config.optionPath + props.link
    })
    return {
      fullLink
    }
  }
})
</script>

<style lang="scss"></style>
