<template>
  <div v-html="navContent"></div>
</template>

<script lang="ts">
import zhNav from './Navbar/zh';
import enNav from './Navbar/zh';
import Vue from 'vue';

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
