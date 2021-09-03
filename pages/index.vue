<template>
  <div class="hidden">
    <!-- These two links are for generate.crawler -->
    <nuxt-link to="zh/get-started">中文</nuxt-link>
    <nuxt-link to="en/get-started">English</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    const locale = (this as any).$i18n.locale
    this.$router.push(locale + '/get-started')
  }
})
</script>

<style></style>
