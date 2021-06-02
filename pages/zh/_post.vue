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
    <!-- <div class="post-contributors">
      <h3>本文贡献者</h3>
      <div v-if="contributors.length" class="post-contributors-list">
        <a
          v-for="contributor of contributors"
          :key="contributor"
          :href="`https://github.com/${contributor}`"
          target="_blank"
          class="post-contributor"
        >
          <img
            :alt="contributor"
            :src="
              `https://avatars.githubusercontent.com/${contributor}?size=60`
            "
          />
          <span>{{ contributor }}</span>
        </a>
      </div>
      <div class="post-edit">
        <a target="_blank" :href="sourcePath">编辑本文</a>
      </div>
    </div>
    -->
  </div>
</template>

<script lang="ts">
import { getPostData } from '../helper/post'
import '~/components/markdown/global'

export default {
  components: {},
  async asyncData({ $content, params }) {
    const article = await $content(
      `zh/${params.post.replace(/_/g, '/')}`
    ).fetch()
    return { article }
    // return await getPostData(params.post, 'zh')
  }
}
</script>

<style lang="scss"></style>
