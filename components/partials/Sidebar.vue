<template>
  <div class="bd-sidebar border-bottom-0 col-sm-2 col-12">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <div class="bd-toc-item level0"
        v-for="level0Post in $store.state.posts[this.$store.state.locale]"
        :key="level0Post.dir"
      >
        <a class="bd-toc-link"
          :href="level0Post.children ? 'javascript:;' : level0Post.dir"
          v-if="!level0Post.draft"
        >
          {{ level0Post.title }}
        </a>
        <ul class="nav bd-sidenav level1"
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

import Vue from 'vue';
import SidebarNavItem from './SidebarNavItem.vue';
import scrollIntoView from 'scroll-into-view';

export default Vue.extend({

  components: {
    SidebarNavItem
  },

  mounted() {

    setTimeout(() => {
      const $actived = this.$el.querySelector('.actived');
      if ($actived) {
        scrollIntoView($actived, {
          time: 200,
          align: {
            top: 0,
            topOffset: 300
          },
          isScrollable: function(target, defaultIsScrollable){
            return target.className && target.className.indexOf('bd-sidebar') >= 0;
          }

        });
      }
    }, 0);
  }
});

</script>

<style lang="scss">
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
    margin-bottom: 20px;
  }

    .bd-sidenav {
      margin-top: 5px;
      margin-left: 10px;
      display: none;
    }

    .bd-toc-link {
      font-weight: bold;
      color: #222;

      &[href="javascript:;"] {
        cursor: default;

        &:focus, &:hover {
          text-decoration: none;
        }
      }

      &:focus, &:hover {
        color: #222;
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

      .nav>li>a:focus, .nav>li>a:hover {
        background-color: transparent;
      }

      .nav .b-icon.bi {
        font-size: 90%;
        opacity: 0.6;
        position: relative;
        top: -2px;
      }


        .level1 {
          .nav-link {
            padding: 5px 0;
            color: #444;

            &:hover {
              color: #444;
            }
          }
        }

        .level1, .level2 {
          margin-top: 0;
        }

        .level1 .nav-link {
          color: #444;
        }

        .nav.level2 {
          border-left: 1px solid #eee;
          padding-left: 10px;
          margin-left: 0;
        }

        .level2 .nav-link {
          margin: 2px 0;
          color: #888;
        }

        .nav-link:hover {
          text-decoration: underline;
        }
    }

</style>
