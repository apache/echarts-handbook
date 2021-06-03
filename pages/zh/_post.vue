<template>
  <div>
    <div class="post-inner">
      <nuxt-content :document="article" />
      <div class="table-of-contents">
        <h4 class="toc-container-header">本页目录</h4>
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
  </div>
</template>

<script lang="ts">
import '~/components/markdown/global'

export default {
  components: {},
  async asyncData({ $content, params }) {
    const article = await $content(
      `zh/${params.post.replace(/_/g, '/')}`
    ).fetch()
    return { article }
  }
}
</script>

<style lang="scss"></style>
