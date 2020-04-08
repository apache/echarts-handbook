<template>
  <div v-html="content" class="post-inner"></div>
</template>

<script lang="ts">
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import Vue from 'vue';
import config from '../../configs/config';

const md = new MarkdownIt({
  html: true
});

export default Vue.extend({
  components: {
  },
  async asyncData({params}) {
    params.post = params.post.split('_').join('/');
    const fileContent = await import(`~/contents/zh/${params.post}.md`);
    const res = fm(fileContent.default.split('${rootPath}').join(config.rootPath));
    return {
      attributes: res.attributes,
      content: md.render(res.body)
    };
  }
});

</script>

<style>
</style>
