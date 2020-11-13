<template>
  <div v-html="navContent"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import zhNav from './Navbar/zh';
import enNav from './Navbar/zh';

export default Vue.extend({
  components: {

  },
  computed: {
    navContent() {
      return this.$store.state.locale === 'zh'
        ? zhNav
        : enNav;
    }
  }
});

</script>
