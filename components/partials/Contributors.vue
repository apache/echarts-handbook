<template>
  <div class="post-contributors">
    <h3>
      <span class="inline-block align-middle">{{
        $t('contributorsWithThisDocument')
      }}</span>
      <a
        target="_blank"
        :href="sourcePath"
        :title="$t('editInThisDocumentTip')"
        class="inline-block align-middle text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 inline-block align-middle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span class="inline-block align-middle">{{ $t('editInGithub') }}</span>
      </a>
    </h3>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import allContributors from '../helper/contributors'
import { getSourcePath } from '../helper/post'

export default defineComponent({
  props: {
    path: String
  },
  setup(props) {
    const contributors = computed(() => {
      return allContributors[`contents/${props.path || ''}.md`]
    })
    const sourcePath = computed(() => {
      return getSourcePath(props.path!)
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
  @apply text-blue-gray-600;

  a {
    @apply text-blue-gray-500;
  }

  .post-contributors-list {
    margin-top: 10px;
  }

  .post-contributor {
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;

    @apply border-blue-gray-200 border;
    @apply rounded-lg;

    &:hover {
      text-decoration: none;
      @apply border-blue-gray-300;
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
