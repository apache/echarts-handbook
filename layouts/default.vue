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
import Navigator from '~/components/partials/Navigator.vue'
import Sidebar from '~/components/partials/Sidebar.vue'

export default {
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
}
</script>

<style>
.post-content {
  margin-bottom: 80px;
}
</style>
