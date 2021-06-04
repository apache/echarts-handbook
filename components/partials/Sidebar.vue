<template>
  <div class="bd-sidebar border-bottom-0 col-sm-3 col-sm-9 col-md-2 col-md-10">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <ul class="nav bd-sidenav nav-root level0">
        <SidebarNavItem
          v-for="level0Post in $store.state.posts[this.$store.state.locale]"
          :key="level0Post.dir"
          :item="level0Post"
          :parentPath="''"
          :level="1"
        >
        </SidebarNavItem>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import scrollIntoView from 'scroll-into-view'
import SidebarNavItem from './SidebarNavItem.vue'

export default Vue.extend({
  components: {
    SidebarNavItem
  },

  mounted() {
    const $actived = this.$el.querySelector('.actived') as HTMLElement
    if ($actived) {
      scrollIntoView($actived, {
        time: 0,
        align: {
          top: 0,
          topOffset: 300
        },
        isScrollable(target) {
          return (
            !!target.className && target.className.indexOf('bd-sidebar') >= 0
          )
        }
      })
    }
  }
})
</script>

<style lang="postcss">
.bd-sidebar {
  padding: 10px;
  position: sticky;
  z-index: 1000;
  top: 0;
  height: calc(100vh - 50px);
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.bd-sidenav {
  margin-top: 4px;
  margin-left: 10px;
  display: none;
}

.page-content {
  padding-bottom: 0;

  .nav {
    display: block;
  }

  ul.nav {
    padding-left: 0;
  }

  .nav > li > a:focus,
  .nav > li > a:hover {
    background-color: transparent;
  }

  .nav .b-icon.bi {
    font-size: 90%;
    opacity: 0.6;
    position: relative;
    top: -2px;
  }

  .glyphicon {
    padding: 5px;
    color: #ccc;
    cursor: pointer;
    transform: scale(0.8);
    top: 2px;
    left: -4px;
    margin: -5px 0;
  }

  .level0 > li > .nav-link {
    padding: 10px 0;
    @apply text-blue-gray-800;
  }
  .level1 {
    margin-top: 4px;
    font-size: 14px;

    .nav-link {
      padding: 5px 0;
    }
  }

  .level3 {
    margin-top: 1px;

    .nav-link {
      padding: 0;
    }
  }
  .nav.level3 {
    padding-left: 5px;
    margin-left: 5px;
    @apply border-blue-gray-300 border-l;
  }

  .level3 .nav-link {
    margin: 2px 0;
  }
}
</style>
