<template>
  <li class="nav-item" v-if="!item.draft">
    <nuxt-link class="nav-link" v-if="!item.children" :to="link">
      <span class="title">{{ item.title }}</span>
    </nuxt-link>

    <a class="nav-link" v-else-if="level > 1" @click="toggleCollapsed">
      <span class="title">{{ item.title }}</span>
      <span
        :class="[
          'glyphicon',
          collapsed ? 'glyphicon-menu-down' : 'glyphicon-menu-up'
        ]"
      ></span>
    </a>

    <div class="nav-link" v-else>
      <span class="title">{{ item.title }}</span>
    </div>

    <ul
      :class="['nav', 'bd-sidenav', 'level' + level]"
      v-show="!item.draft && item.children && !collapsed"
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
import Vue from 'vue'

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
      const locale = (this as any).$i18n.locale
      return '/' + locale + '/' + this.path
    }
  },

  data() {
    const path = this.parentPath
      ? this.parentPath + '/' + this.item.dir
      : this.item.dir
    const isSelfOrChildActived = (this.$route.params.post + '').startsWith(path)
    return {
      get path(): string {
        return path
      },
      collapsed: (this.level >= 2 && !isSelfOrChildActived) as boolean
    }
  },

  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
})
</script>

<style lang="postcss">
.page-content {
  .nav-item {
    margin: 0;

    .nav-link {
      @apply text-blue-gray-500;
    }

    a.nav-link {
      cursor: pointer;
    }

    .nav-link.nuxt-link-active {
      font-weight: bold;
      color: #337ab7;
    }
  }
}
</style>
