<template>
  <div>
    <div v-html="content" class="post-inner"></div>

    <div class="post-contributors">
      <h3>本文贡献者</h3>
      <div v-if="contributors.length" class="post-contributors-list">
        <a v-for="contributor of contributors" :key="contributor" :href="`https://github.com/${contributor}`" target="_blank" class="post-contributor">
          <img :alt="contributor" :src="`https://avatars.githubusercontent.com/${contributor}?size=60`">
          <span>{{ contributor }}</span>
        </a>
      </div>
      <div class="post-edit">
        <a target="_blank" :href="sourcePath">编辑本文</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getPostData } from '../helper/post'

export default {
  components: {
  },
  async asyncData ({ params }) {
    return await getPostData(params.post, 'zh')
  }
}

</script>

<style lang="scss">
.post-inner {

  margin: 20px 0 80px 0;

  h1 {
    margin-bottom: 20px;
    font-size: 36px;
    color: #222;
  }

  h2 {
    margin: 70px 0 20px 0;
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

  blockquote {
    margin: 15px 0;
    padding: 15px;
    border-left: 4px solid #ccc;
    background-color: #f3f3f3;
  }

  blockquote :last-child {
    margin-bottom: 0;
  }

  pre code {
    padding: 10px 15px !important;
    border-radius: 5px;
  }

  iframe {
    border: 1px solid #ddd;
    margin: 10px 0;
  }

  p {
    line-height: 1.8em;
  }
}

.post-contributors {
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
