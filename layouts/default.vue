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

      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/github-gist.min.css">
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

  mounted () {
    // This help scroll to the hash
    const hash = location.hash;
    location.hash = '';
    location.hash = hash;
  },

  computed: {
    // posts(): string {
    //   return this.$store.state.posts.zh;
    // }
  },

  methods: {

  }
}
</script>

<style lang="scss">
.page-main {
  overflow-x: hidden;
}

.handbook-content {
  margin-top: 50px;
}

.post-content {
  margin: 30px 20px;
}

#toc {
  position: fixed;
  left: 77%;
  width: 21%;
  top: 80px;
  background-color: transparent;
  border-left: 1px solid #e3e3e3;
  padding: 10px;
  color: #888;
  background-color: #fff;
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

  ol {
    padding-left: 30px;
    margin-bottom: 0;

    ol {
      padding-left: 10px;
      margin-bottom: 10px;

      li {
        list-style: lower-alpha;
      }

      ol {
        li {
          list-style: circle;
        }
      }
    }
  }

  a {
    color: #888;
    transition: 0.5s;

    &:hover {
      color: #555;
    }
  }
}

.post-inner {
  margin: 20px 0 80px 0;
  color: #4d555e;

  h1 {
    margin-bottom: 20px;
    font-size: 36px;
  }

  h2 {
    margin: 70px 0 20px 0;
    padding-bottom: 10px;
    font-size: 26px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }

  h1+h2 {
    margin-top: 30px;
  }

  h3 {
    margin: 30px 0 20px 0;
    font-size: 22px;
    color: #444;
  }

  h4 {
    margin: 25px 0 20px 0;
    font-size: 18px;
    color: #222;
  }

  h5 {
    font-size: 16px;
    color: #222;
  }

  h6 {
    font-size: 14px;
    color: #222;
  }

  .permalink {
    display: none;
  }

  h1, h2, h3, h4, h5, h6 {
    &:hover .permalink {
      display: inline-block;
    }
  }

  blockquote {
    margin: 15px 0;
    padding: 15px;
    border-left: 4px solid #ccc;
    background-color: #f3f3f3;
  }

  blockquote :last-child {
    margin-bottom: 0;
  }

  pre {
    margin: 10px 0;
    border-radius: 5px;
    background-color: #f5f7fa;
    border: none;
    padding: 10px;
    font-size: 13px;

    code.hljs {
      background: none;
    }
  }

  code {
    padding: 3px 5px;
    font-size: 13px;
    background-color: #eaeeef;
    border-radius: 4px;
    color: #000;
  }

  iframe {
    border: none;
    margin: 10px 0;
  }

  p, li {
    line-height: 1.8em;
    font-size: 14px;
  }
}

.post-contributors {
  padding-top: 10px;
  border-top: 1px solid #ddd;

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
