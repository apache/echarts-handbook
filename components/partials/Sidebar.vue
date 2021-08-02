<template>
  <div class="bd-sidebar border-bottom-0 col-sm-3 col-sm-9 col-md-2 col-md-10">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <ul class="nav bd-sidenav nav-root level0">
        <SidebarNavItem
          v-for="level0Post in $store.state.posts[this.$i18n.locale]"
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
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  height: calc(100vh - 50px);
  padding: 0;
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.bd-sidenav {
  display: none;
}

.page-content {
  padding-bottom: 0;

  .bd-docs-nav {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .nav {
    display: block;
  }

  ul.nav {
    padding-left: 0;
  }

  .nav > li > a:focus,
  .nav > li > a:hover {
    background-color: #f6f8fc;
  }

  .nav .b-icon.bi {
    font-size: 90%;
    opacity: 0.6;
    position: relative;
    top: -2px;
  }

  .glyphicon {
    padding: 5px;
    color: #cfd9e2;
    cursor: pointer;
    transform: scale(0.8);
    top: 2px;
    left: -4px;
    margin: -5px 0;
  }

  .level0 > li > .nav-link {
    margin-top: 5px;
    padding: 6px 0 6px 20px;
    font-weight: bold;
    @apply text-blue-gray-800;
  }
  .level1 {
    margin-top: 4px;
    font-size: 14px;

    .nav-link {
      padding: 6px 0 6px 35px;
    }
  }

  .level2 .nav-link {
    padding: 5px 0 5px 50px;
  }

  .level3 {
    margin-top: 1px;

    .nav-link {
      padding: 5px 0 5px 60px;
    }
  }
}
</style>
