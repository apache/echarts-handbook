<template>
  <div v-html="content" class="post-inner"></div>
</template>

<script lang="ts">
import {getPostData} from '../helper/post';

export default {
  components: {
  },
  async asyncData({params}) {
    return await getPostData(params.post, 'en');
  }
};

</script>

<style>
</style>
