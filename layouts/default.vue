<template>
  <div>
    <navbar />

    <div class="page-main">
      <div
        class="page-content handbook-content single-page container-fluid row flex-xl-nowrap"
      >
        <sidebar />

        <div class="bd-content col-sm-7 pl-sm-2 col-12">
          <div class="post-content content">
            <nuxt />
          </div>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/github-gist.min.css"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '~/components/partials/Sidebar.vue'
import Navbar from '~/components/partials/Navbar.vue'

export default {
  components: {
    Sidebar,
    Navbar
  },

  mounted() {
    // This help scroll to the hash
    const hash = location.hash
    location.hash = ''
    location.hash = hash
  },

  computed: {
    // posts(): string {
    //   return this.$store.state.posts.zh
    // }
  },

  methods: {}
}
</script>

<style lang="postcss">
body {
  font-family: 'Open Sans', 'PingFang SC', Helvetica, Arial, sans-serif;
}

.page-main {
  overflow-x: hidden;
}

.handbook-content {
  padding-left: 0;
  padding-right: 0;
}

.bd-content {
  padding-left: 50px;
}

.post-content {
  margin: 0 auto;
  max-width: 960px;
}

.post-inner {
  margin: 20px 0 80px 0;

  @apply text-blue-gray-500;

  h1 {
    margin: 40px 0 30px 0;
    font-size: 36px;
    @apply text-blue-gray-800;
    font-weight: 500;
  }

  h2 {
    margin: 50px 0 20px 0;
    padding-bottom: 15px;
    font-size: 26px;
    @apply text-blue-gray-900;
    border-bottom: 1px solid #eee;
  }

  h1 + h2 {
    margin-top: 30px;
  }

  h3 {
    margin: 30px 0 20px 0;
    font-size: 22px;
    @apply text-blue-gray-700;
  }

  h4 {
    margin: 25px 0 20px 0;
    font-size: 18px;
    @apply text-blue-gray-600;
  }

  h5 {
    font-size: 16px;
    @apply text-blue-gray-500;
  }

  h6 {
    font-size: 14px;
    @apply text-blue-gray-500;
  }

  .permalink {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:hover .permalink {
      display: inline-block;
    }
  }

  blockquote {
    margin: 15px 0;
    padding: 20px 15px;

    @apply bg-blue-100 border-blue-400 border-l-4 rounded-lg;

    code {
      @apply bg-blue-200 shadow-none border-0 text-current;
    }
    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  pre {
    margin: 20px 0;
    border-radius: 5px;
    /* background-color: #f5f7fa; */
    border: none;
    padding: 10px;
    font-size: 13px;

    code {
      background: none;
      font-size: 13px;
    }
  }

  code {
    font-size: 14px;
  }

  iframe {
    border: none;
    margin: 10px 0;
  }

  ol,
  ul {
    padding-left: 20px;
  }

  p,
  li {
    line-height: 1.8em;
    font-size: 16px;
  }

  p {
    margin: 20px 0;
  }

  img {
    @apply shadow-lg rounded-lg;
  }

  a {
    color: #337ab7;
  }
}

.post-inner .table-of-contents {
  position: fixed;
  left: 77%;
  width: 21%;
  top: 65px;
  background-color: transparent;
  padding: 10px;
  height: auto;

  @media (max-width: 768px) {
    & {
      position: relative;
      width: 100%;
      left: 0;
      top: 0;
      padding: 10px 20px;
      margin: 0 0 20px 0;
    }
  }

  .toc-container-header {
    font-size: 14px;
    font-weight: bold;
  }

  ul {
    padding-left: 0px;
    margin-bottom: 0;

    li {
      list-style: none;
      font-size: 14px;
    }

    li.toc3 {
      padding-left: 10px;
      font-size: 12px;
    }
  }

  a {
    @apply text-blue-gray-500;
    transition: 0.5s;

    &:hover {
      color: #555;
    }
  }
}
</style>
