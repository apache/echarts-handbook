<template>
  <div>
    this is index
  </div>
</template>

<script lang="ts">
// const fm = require("front-matter");
// var md = require("markdown-it")({
//   html: true,
//   typographer: true
// });
import fm from 'front-matter';
import md from 'markdown-it';

export default {
  async asyncData(data) {
    console.log(data);
    // const fileContent = await import(`~/contents/${data.params.post}.md`);
    // let res = fm(fileContent.default);
    // return {
    //   // attributes will be an object containing the markdown metadata
    //   attributes: res.attributes,
    //   // content will contain the body of the markdown file,
    //   // rendered in HTML via the `markdownit` class
    //   content: md.render(res.body)
    // };
  }
}

// import Vue from 'vue';

// export default Vue.extend({
//   components: {
//   },
//   async asyncData(value) {
//     console.log(value.params);
//     // ${app.i18n.locale}
//     // const fileContent = await import(`~/contents/zh/${value.params.slug}.md`)
//     // const attr = fileContent.attributes
//     // return {
//     //   colors: attr.colors,
//     //   date: attr.date,
//     //   description: attr.description,
//     //   id: attr.id,
//     //   name: value.params.slug,
//     //   related: attr.related,
//     //   renderFunc: fileContent.vue.render,
//     //   staticRenderFuncs: fileContent.vue.staticRenderFns,
//     //   title: attr.title,
//     //   urlTranslation: attr.urlTranslation
//     // }
//   }
// })
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
