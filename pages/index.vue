<template>
  <div>
    <!-- These two links are for generate.crawler -->
    <nuxt-link to="zh/get-started">中文</nuxt-link>
    <nuxt-link to="en/get-started">English</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    this.$router.push('get-started')
  },
  async asyncData() {}
})
</script>

<style></style>
