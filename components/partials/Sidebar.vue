<template>
  <div :class="`bd-sidebar col-sm-3 col-md-2  ${sidebarOpen ? '' : 'closed'}`">
    <!-- <div class="sidebar-search">
      <input
        id="handbook-search-input"
        type="search"
        :placeholder="$t('searchHandbook')"
      />
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div> -->
    <div class="bd-docs-nav">
      <ul class="nav bd-sidenav nav-root level0">
        <SidebarNavItem
          v-for="level0Post in $store.state.posts[$i18n.locale]"
          :key="level0Post.dir"
          :item="level0Post"
          :parentPath="''"
          :level="1"
        >
        </SidebarNavItem>
      </ul>
    </div>
    <div class="open-sidebar" @click="sidebarOpen = !sidebarOpen">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-if="!sidebarOpen"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-else
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SidebarNavItem from './SidebarNavItem.vue'

// const docsearchAppId = '14SYRIFETO'

export default Vue.extend({
  components: {
    SidebarNavItem
  },

  // head: {
  //   link: [
  //     {
  //       rel: 'preconnect',
  //       href: `https://${docsearchAppId.toLowerCase()}-dsn.algolia.net`,
  //       crossOrigin: ''
  //     }
  //   ]
  // },

  data() {
    return {
      sidebarOpen: false
    }
  },
  watch: {
    $route() {
      this.sidebarOpen = false
    }
  },

  mounted() {
    const $actived = this.$el.querySelector('.nav-link.nuxt-link-active') as HTMLElement
    $actived?.scrollIntoView?.({
      block: 'nearest',
      inline: 'start'
    })
    // @ts-ignore
    // docsearch({
    //   appId: docsearchAppId,
    //   apiKey: atob('MDY2ZGZiZDg3MTVlN2E0NGNjNjA4N2UyOTE0Njk1ZDE'),
    //   indexName: 'apache_echarts',
    //   inputSelector: '#handbook-search-input',
    //   algoliaOptions: {
    //     // @ts-ignore
    //     facetFilters: [`lang:${this.$i18n.locale}`]
    //   },
    //   // Set debug to true if you want to inspect the dropdown
    //   // debug: true
    // })
  }
})
</script>

<style lang="postcss">
.algolia-autocomplete .ds-dropdown-menu {
  @apply shadow-xl border-none;
}
.algolia-autocomplete .ds-dropdown-menu [class^='ds-dataset-'] {
  @apply border-none;
}
.algolia-autocomplete .ds-dropdown-menu:before {
  @apply border-none;
  @apply shadow-xl;
}
.bd-sidebar {
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  padding: 0;
  overflow: visible;
  border-right: 1px solid #eee;
  border-bottom: none;
  max-width: 350px;
  height: calc(100vh - 50px);

  .open-sidebar {
    display: none;
  }

  .bd-docs-nav {
    overflow-x: hidden;
    overflow-y: auto;
    /* height: calc(100% - 83px); */
    height: calc(100% - 10px);
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .sidebar-search {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;

    .algolia-autocomplete {
      @apply w-full;
    }

    input {
      @apply shadow rounded-xl border-0 p-4 w-full outline-none;
      padding-right: 3rem;
    }

    .search-icon {
      position: absolute;
      right: 3rem;
      top: 28px;
    }
  }

  @media (max-width: 768px) {
    &.closed {
      left: -280px;
      @apply shadow-none;
    }

    position: fixed;
    left: 0;
    width: 280px;
    top: 50px;
    bottom: 0;
    background-color: #fff;
    @apply shadow-2xl;
    border-right: none;
    overflow: visible;

    @apply transition-all;

    .bd-docs-nav {
      width: 280px;
    }

    .open-sidebar {
      display: block;
      position: absolute;
      left: 280px;
      bottom: 60px;
      width: 40px;
      height: 40px;
      padding: 5px;
      color: #000;
      z-index: 1200;
      background: #eee;
      @apply shadow-lg rounded-r-2xl;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.bd-sidenav {
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
