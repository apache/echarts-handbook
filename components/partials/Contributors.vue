<template>
  <div class="post-contributors">
    <h3>本文贡献者</h3>
    <div v-if="contributors.length" class="post-contributors-list">
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
