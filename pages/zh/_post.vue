<template>
  <div>
    <div v-html="content" class="post-inner"></div>

    <div class="post-contributors">
      <h3>本文贡献者</h3>
      <div class="post-contributors-list" v-if="contributors.length">
        <a v-for="contributor of contributors" :key="contributor" :href="`https://github.com/${contributor}`" target="_blank" class="post-contributor">
          <img :alt="contributor" :src="`https://avatars.githubusercontent.com/${contributor}?size=60`">
          <span>{{ contributor }}</span>
        </a>
      </div>
      <div class="post-edit">
        <a target="_blank" :href="sourcePath">编辑本文</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {getPostData} from '../helper/post';

export default Vue.extend({
  components: {
  },
  async asyncData({params}) {
    return await getPostData(params.post, 'zh');
  }
});

</script>

<style>
</style>
