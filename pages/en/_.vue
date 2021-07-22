<template>
  <div>
    <div class="post-inner">
      <nuxt-content :document="article" />
      <div class="table-of-contents">
        <h4 class="toc-container-header">In this Page</h4>
        <ul>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
          >
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <contributors :path="postPath"></contributors>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '~/components/markdown/global'

import Contributors from '~/components/partials/Contributors.vue'

export default Vue.extend({
  components: {
    Contributors
  },
  mounted() {
    this.$store.commit('setLocale', 'en')
  },
  async asyncData({ $content, params }: any) {
    const postPath = `en/${params.pathMatch}`
    const article = await $content(postPath).fetch()
    return {
      article,
      postPath
    }
  }
})
</script>

<style lang="scss"></style>
