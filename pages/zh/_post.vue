<template>
  <div v-html="content" class="post-inner"></div>
</template>

<script lang="ts">
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import Vue from 'vue';

const md = new MarkdownIt();

export default Vue.extend({
  components: {
  },
  async asyncData({params}) {
    // const posts = await import('~/contents/zh/posts.js');
    // console.log('===================', posts)

    params.post = params.post.split('_').join('/');
    const fileContent = await import(`~/contents/zh/${params.post}.md`);
    const res = fm(fileContent.default);
    return {
      attributes: res.attributes,
      content: md.render(res.body)
    };
  }
});

</script>

<style>
</style>
