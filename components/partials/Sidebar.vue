<template>
  <div class="bd-sidebar border-bottom-0 col-sm-2 col-12">
    <!-- active: {{ active }}. {{ posts }} -->
    <div class="bd-docs-nav">
      <div class="bd-toc-item level0"
        v-for="level0Post in $store.state.posts[this.$store.state.locale]"
        :key="level0Post.dir"
      >
        <a class="bd-toc-link"
          :href="level0Post.children ? 'javascript:;' : rootPath + level0Post.dir"
          v-if="!level0Post.draft"
        >
          {{ level0Post.title }}
        </a>
        <ul class="nav bd-sidenav level1"
          v-if="!level0Post.draft && level0Post.children"
        >
          <li class="nav-item"
            v-for="level1Post in level0Post.children"
            :key="level1Post.dir"
          >
            <a :href="level1Post.children ? 'javascript:;' : rootPath + level0Post.dir + '_' + level1Post.dir"
              v-if="!level1Post.draft"
              class="nav-link">{{ level1Post.title }}</a>
            <ul class="nav bd-sidenav level2"
              v-if="!level1Post.draft && level1Post.children"
            >
              <li class="nav-item"
                v-for="level2Post in level1Post.children"
                :key="level2Post.dir"
              >
                <div v-if="!level2Post.draft">
                  <a class="nav-link"
                    v-if="!level2Post.children"
                    :href="rootPath + level0Post.dir + '_' + level1Post.dir + '_' + level2Post.dir"
                  >
                    {{ level2Post.title }}
                  </a>
                  <a class="nav-link"
                    v-if="level2Post.children"
                    @click="toggleChildren($event)"
                  >
                    {{ level2Post.title }}
                    <span class="glyphicon glyphicon-menu-down"></span>
                    <span class="glyphicon glyphicon-menu-up"></span>
                  </a>
                  <ul class="nav bd-sidenav level3"
                    v-if="!level2Post.draft && level2Post.children"
                  >
                    <li class="nav-item"
                      v-for="level3Post in level2Post.children"
                      :key="level3Post.dir"
                    >
                      <a class="nav-link"
                        :href="rootPath + level0Post.dir + '_' + level1Post.dir + '_' + level2Post.dir + '_' + level3Post.dir"
                        v-if="!level3Post.draft"
                      >
                        {{ level3Post.title }}
                      </a>
                    </li>
                  </ul>
                </div>
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
  },
  methods: {
    toggleChildren(event: MouseEvent) {
      let el = event.target as any;
      while (el.nodeName !== 'LI' && el.parentNode) {
        el = el.parentNode;
      }
      if (el === document) {
        return;
      }
      if (!el.className) {
        el.className = ' active';
      }
      else if (el.className.indexOf(' active') > -1) {
        el.className = el.className.replace(' active', '');
      }
      else {
        el.className += ' active';
      }
    }
  }
});

</script>

<style lang="scss">
.bd-sidebar {
  padding: 20px;
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
    }

    .page-content {
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

      .glyphicon {
        padding: 5px;
        color: #ccc;
        cursor: pointer;
        transform: scale(0.8);
        top: 2px;
        left: -5px;
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

        .level1 .nav-link {
          padding: 5px 0;
        }

        .level2, .level3 {
          margin-top: 0;
        }

        .level2 .nav-link {
          color: #666;
        }

        .level3 {
          border-left: 1px solid #eee;
          padding-left: 10px;
          margin-left: 0;
          display: none;
        }

        .level2 .active .level3 {
          display: block;
        }

        .level3 .nav-link {
          margin: 2px 0;
          color: #888;
        }

        .nav-link:hover {
          text-decoration: underline;
        }
    }

</style>
