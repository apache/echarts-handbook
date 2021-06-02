<template>
  <div>
    <navbar />

    <div class="page-main">
      <div class="page-content single-page container-fluid row flex-xl-nowrap">
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
.page-main {
  overflow-x: hidden;
}

.handbook-content {
  margin-top: 50px;
}

.post-content {
  margin: 0 auto;
  max-width: 960px;
}

.post-inner {
  margin: 20px 0 80px 0;

  @apply text-blue-gray-500;

  h1 {
    margin: 50px 0;
    font-size: 36px;
    @apply text-blue-gray-800;
    font-weight: 500;
  }

  h2 {
    margin: 70px 0 20px 0;
    padding-bottom: 10px;
    font-size: 26px;
    @apply text-blue-gray-900;
    border-bottom: 1px solid #ddd;
  }

  h1 + h2 {
    margin-top: 30px;
  }

  h3 {
    margin: 30px 0 20px 0;
    font-size: 20px;
    @apply text-blue-gray-900;
  }

  h4 {
    margin: 25px 0 20px 0;
    font-size: 18px;
    color: #666;
  }

  h5 {
    font-size: 16px;
    color: #666;
  }

  h6 {
    font-size: 14px;
    color: #222;
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

    @apply bg-blue-100 border-blue-400 rounded-lg;

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

  .nuxt-content-highlight {
    position: relative;
    line-height: 1em;
    .filename {
      position: absolute;
      right: 0;
      top: 0;
      color: #f7fafc;
      z-index: 10;
      font-family: DM Mono, Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
      font-size: 0.875rem;
      line-height: 1.25rem;
      letter-spacing: -0.025em;
      line-height: 1;
      margin-right: 1rem;
      margin-top: 0.75rem;
    }
  }

  /* code {
    padding: 3px 5px;
    font-size: 13px;
    background-color: #eaeeef;
    border-radius: 4px;
    color: #000;
  } */

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
    @apply text-light-blue-500;
  }
}

.post-inner .table-of-contents {
  position: fixed;
  left: 77%;
  width: 21%;
  top: 50px;
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

.post-contributors {
  margin-bottom: 50px;
  padding-top: 10px;
  border-top: 1px solid #ddd;

  a {
    color: #777;
  }

  .post-contributor {
    display: inline-block;
    margin-right: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: #777;

    &:hover {
      text-decoration: none;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      display: inline-block;
    }
    span {
      display: inline-block;
      margin: 0 8px 0 5px;
      position: relative;
      top: 2px;
    }
  }
}

.post-edit {
  margin: 10px 0;
}
</style>
