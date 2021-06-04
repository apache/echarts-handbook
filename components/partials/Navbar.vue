<template>
  <div v-bind:is="navComponent"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import zhNav from './Navbar/zh.vue'
import enNav from './Navbar/en.vue'

export default Vue.extend({
  components: {},
  computed: {
    navComponent() {
      return this.$store.state.locale === 'zh' ? zhNav : enNav
    }
  }
})
</script>
