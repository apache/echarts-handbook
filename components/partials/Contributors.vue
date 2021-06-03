<template>
  <div class="post-contributors">
    <h3>本文贡献者</h3>
    <div
      v-if="contributors && contributors.length"
      class="post-contributors-list"
    >
      <a
        v-for="contributor of contributors"
        :key="contributor"
        :href="`https://github.com/${contributor}`"
        target="_blank"
        class="post-contributor"
      >
        <img
          :alt="contributor"
          :src="`https://avatars.githubusercontent.com/${contributor}?size=60`"
        />
        <span>{{ contributor }}</span>
      </a>
    </div>
    <div class="post-edit">
      <a target="_blank" :href="sourcePath">编辑本文</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import config from '~/configs/config'
import allContributors from '../helper/contributors'

export default defineComponent({
  props: {
    path: String
  },
  setup(props) {
    const contributors = computed(() => {
      console.log(`contents/${props.path || ''}`)
      return allContributors[`contents/${props.path || ''}.md`]
    })
    const sourcePath = computed(() => {
      return `https://github.com/${config.gitRepo}/tree/master/contents/${props.path}.md`
    })
    return {
      contributors,
      sourcePath
    }
  }
})
</script>

<style lang="postcss">
.post-contributors {
  margin-bottom: 50px;
  padding-top: 10px;
  border-top: 1px solid #ddd;

  a {
    @apply text-blue-gray-500;
  }

  .post-contributors-list {
    margin-top: 20px;
  }

  .post-contributor {
    display: inline-block;
    margin-right: 15px;

    @apply rounded-md shadow-md;

    &:hover {
      text-decoration: none;

      @apply shadow-lg;
    }

    img {
      width: 40px;
      height: 40px;
      @apply rounded-l-md;
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
  margin: 20px 0;
}
</style>
