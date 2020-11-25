<template>
  <div v-html="navContent"></div>
</template>

<script lang="ts">
import zhNav from './Navbar/zh';
import enNav from './Navbar/zh';

export default {
  components: {

  },
  computed: {
    navContent() {
      return this.$store.state.locale === 'zh'
        ? zhNav
        : enNav;
    }
  }
};

</script>
