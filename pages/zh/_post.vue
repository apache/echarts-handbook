<template>
  <div v-html="content" class="post-inner"></div>
</template>

<script lang="ts">
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import Vue from 'vue';

const md = new MarkdownIt();
console.log(typeof md.render);

export default Vue.extend({
  components: {
  },
  async asyncData({params}) {
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
