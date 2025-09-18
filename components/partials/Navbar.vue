<template>
  <div v-bind:is="navComponent"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import zhNav from './Navbar/zh.vue'
import enNav from './Navbar/en.vue'
import esNav from './Navbar/es.vue';

export default Vue.extend({
  components: {},
  mounted() {
    const locale = (this as any).$i18n.locale
      // TODO
    ;(window as any).changeLang = () => {
      window.location.href = window.location.href.replace(
        `/${locale}/`,
        locale === 'zh' ? '/en/' : locale === 'en' ? '/es/' : '/zh/'
      )
    }
  },
  computed: {
    navComponent() {
      const locale = (this as any).$i18n.locale
      if (locale === 'zh') {
        return zhNav
      } else if (locale === 'es') {
        return esNav
      }
      return enNav 
    }
  }
})
</script>

<style lang="postcss">
svg.icon-external-link {
  display: initial;
  vertical-align: initial;
}
</style>
