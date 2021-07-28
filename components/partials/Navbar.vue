<template>
  <div v-bind:is="navComponent"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import zhNav from './Navbar/zh.vue'
import enNav from './Navbar/en.vue'

export default Vue.extend({
  components: {},
  mounted() {
    const locale = (this as any).$i18n.locale
      // TODO
    ;(window as any).changeLang = () => {
      window.location.href = window.location.href.replace(
        `/${locale}/`,
        locale === 'zh' ? '/en/' : '/zh/'
      )
    }
  },
  computed: {
    navComponent() {
      return (this as any).$i18n.locale === 'zh' ? zhNav : enNav
    }
  }
})
</script>
