<template>
  <div>
    <navigator />

    <div class="container-fluid">
      <div class="row flex-xl-nowrap2">
        <sidebar />

        <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
          <div class="post-content content">
            <nuxt />
          </div>
        </div>
      </div>
    </div>

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/github.min.css">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigator from '~/components/partials/Navigator.vue';
import Sidebar from '~/components/partials/Sidebar.vue';

export default Vue.extend({
  components: {
    Navigator,
    Sidebar
  },

  computed: {
    // posts(): string {
    //   return this.$store.state.posts.zh;
    // }
  },

  methods: {

  }
});
</script>

<style>
.post-inner {
  margin: 20px 0 80px 0;
}

.post-content {
  margin-bottom: 80px;
}

.post-contributors {
  border-top: 1px solid #ddd;
}

.post-contributor {
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 5px;
  color: #777;
}

.post-contributor:hover {
  text-decoration: none;
}

.post-contributor img {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: inline-block;
}

.post-contributor span {
  display: inline-block;
  margin: 0 8px 0 5px;
  position: relative;
  top: 2px;
}

.post-edit {
  margin: 10px 0;
}

h1 {
  margin-bottom: 20px;
  font-size: 36px;
  color: #222;
}

h2 {
  margin: 70px 0 20px 0;
  font-size: 26px;
  color: #666;
}

h1+h2 {
  margin-top: 30px;
}

h3 {
  margin: 30px 0 20px 0;
  font-size: 22px;
  color: #444;
}

h4 {
  margin: 25px 0 20px 0;
  font-size: 18px;
  color: #222;
}

h5 {
  font-size: 16px;
  color: #222;
}

h6 {
  font-size: 14px;
  color: #222;
}

blockquote {
  margin: 15px 0;
  padding: 15px;
  border-left: 4px solid #ccc;
  background-color: #f3f3f3;
}

blockquote :last-child {
  margin-bottom: 0;
}

pre code {
  padding: 10px 15px !important;
  border-radius: 5px;
  border: 1px solid #eee;
}

iframe {
  border: 1px solid #ddd;
  margin: 10px 0;
}

p {
  line-height: 1.8em;
}
</style>
