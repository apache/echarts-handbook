<template>
  <div v-html="content" class="post-inner"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {getPostData} from '../helper/post';

export default Vue.extend({
  components: {
  },
  async asyncData({params}) {
    return await getPostData(params.post, 'en');
  }
});

</script>

<style>
</style>
