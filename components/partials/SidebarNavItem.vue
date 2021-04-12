<template>
<li
  :class="['nav-item', isActived ? 'actived' : '']"
  v-if="!item.draft"
>
  <a class="nav-link"
    v-if="!item.children"
    :href="link"
  >
    {{ item.title }}
  </a>

  <a
    class="nav-link"
    v-else
    @click="toggleCollapsed"
  >
    {{ item.title }}
    <span :class="['glyphicon', collapsed ? 'glyphicon-menu-down' : 'glyphicon-menu-up']"></span>
  </a>

  <ul :class="['nav', 'bd-sidenav', 'level' + level]"
    v-if="!item.draft && item.children && !collapsed"
  >
    <SidebarNavItem
      v-for="child in item.children"
      :parentPath="path"
      :item="child"
      :level="level + 1"
      :key="child.dir"
    ></SidebarNavItem>
  </ul>
</li>
</template>


<script lang="ts">

import Vue from 'vue';

interface NavItem {
  dir: string
}

export default Vue.extend({

  name: 'SidebarNavItem',

  props: {
    item: {
      type: Object as () => NavItem
    },
    parentPath: {
      type: String as () => string
    },
    level: {
      type: Number as () => number
    }
  },

  computed: {
    link(): string {
      return this.$store.state.config.rootPath + '/' + this.$store.state.locale
        + '/' + this.path;
    },

    isActived(): boolean {
      return this.$route.params.post === this.path;
    }
  },

  data() {
    const path = this.parentPath + '_' + this.item.dir;
    const isSelfOrChildActived = (this.$route.params.post + '').startsWith(path);
    return {
      get path(): string {
        return path;
      },
      collapsed: (this.level >= 2 && !isSelfOrChildActived) as boolean
    };
  },

  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
});
</script>

<style lang="scss">
.page-content {
  .nav-item {
    cursor: pointer;

    &.actived {
      .nav-link {
        color: #5470c6
      }
    }

    .glyphicon {
      padding: 5px;
      color: #ccc;
      cursor: pointer;
      transform: scale(0.8);
      top: 2px;
      left: -5px;
    }
  }
}
</style>
