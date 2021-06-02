<template>
  <div class="bd-sidebar border-bottom-0 col-sm-3 col-sm-9 col-md-2 col-md-10">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <div
        class="bd-toc-item level0"
        v-for="level0Post in $store.state.posts[this.$store.state.locale]"
        :key="level0Post.dir"
      >
        <a
          class="bd-toc-link"
          :href="level0Post.children ? 'javascript:;' : level0Post.dir"
          v-if="!level0Post.draft"
        >
          {{ level0Post.title }}
        </a>
        <ul
          class="nav bd-sidenav level1"
          v-if="!level0Post.draft && level0Post.children"
        >
          <SidebarNavItem
            v-for="level1Post in level0Post.children"
            :key="level1Post.dir"
            :item="level1Post"
            :parentPath="level0Post.dir"
            :level="1"
          >
          </SidebarNavItem>
        </ul>
      </div>
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
  padding: 20px;
  position: sticky;
  z-index: 1000;
  top: 0;
  height: calc(100vh - 50px);
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.bd-toc-item {
  margin-bottom: 10px;
}

.bd-sidenav {
  margin-top: 4px;
  margin-left: 10px;
  display: none;
}

.bd-toc-link {
  font-weight: bold;
  color: #333;

  &[href='javascript:;'] {
    cursor: default;

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }

  &:focus,
  &:hover {
    color: #151515;
  }
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

  .nav-link .glyphicon-menu-up {
    display: none;
  }

  .active .nav-link .glyphicon-menu-up {
    display: inline-block;
  }

  .active .nav-link .glyphicon-menu-down {
    display: none;
  }

  .level1 {
    margin-top: 4px;
    font-size: 14px;

    .nav-link {
      padding: 5px 0;
    }
  }

  .level2 {
    margin-top: 1px;

    .level3 {
      margin-top: 0;
    }

    .nav-link {
      padding: 0;
    }
  }

  .nav.level3 {
    font-size: 12px;
    padding-left: 10px;
    margin-left: 0;
    display: none;

    li {
      display: list-item;
      list-style: disc;
    }
  }

  .level1 .nav-link {
    /* color: #444; */
  }

  .nav.level2 {
    border-left: 1px solid #eee;
    padding-left: 10px;
    margin-left: 0;
  }

  .level2 .nav-link {
    margin: 2px 0;
  }
}
</style>
