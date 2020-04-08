<template>
  <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <div class="bd-toc-item level0" v-for="level0Post in $store.state.posts.zh">
        <a class="bd-toc-link">{{ level0Post.title }}</a>
        <ul class="nav bd-sidenav level1" v-if="level0Post.children">
          <li class="nav-item" v-for="level1Post in level0Post.children">
            <a :href="level1Post.children ? 'javascript:;' : rootPath + level0Post.dir + '_' + level1Post.dir" 
              class="nav-link">{{ level1Post.title }}</a>
            <ul class="nav bd-sidenav level2" v-if="level1Post.children">
              <li class="nav-item" v-for="level2Post in level1Post.children">
                <a :href="rootPath + level0Post.dir + '_' + level1Post.dir + '_' + level2Post.dir" class="nav-link">{{ level2Post.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    rootPath(): string {
      return this.$store.state.config.rootPath + '/' + this.$store.state.locale + '/';
    }
  }
});

</script>

<style>
.bd-sidebar {
  padding: 20px;
}

  .bd-toc-item {
    margin-bottom: 20px;
  }

    .bd-sidenav {
      margin-top: 5px;
      display: none;
    }

      .bd-sidenav.level2 {
        margin: 0 0 0 15px;
      }

    .bd-toc-link {
      font-weight: bold;
      color: #444;
    }

    .nav {
      display: block;
    }

      .nav-link {
        padding: 5px;
        color: #666;
      }

        .level1 .nav-link {
          padding: 5px 0;
        }

        .level2 .nav-link {
          color: #444;
        }

        .nav-link:hover {
          text-decoration: underline;
        }
</style>
