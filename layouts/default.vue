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
.post-content {
  margin: 20px 0;
}

h1 {
  margin-bottom: 20px;
  font-size: 36px;
}

h2 {
  margin: 40px 0 20px 0;
  font-size: 26px;
}

h3 {
  font-size: 22px;
}

h4 {
  font-size: 18px;
}

h5 {
  font-size: 16px;
}

h6 {
  font-size: 14px;
}
</style>
