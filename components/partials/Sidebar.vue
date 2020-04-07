<template>
  <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
    active: {{ active }}. {{ posts }}
    <div class="bd-docs-nav">
      <div class="bd-toc-item">
        <a href="#" class="bd-toc-link">开始</a>
        <ul class="nav bd-sidenav">
          <li class="nav-item">
            <a href="#" class="nav-link">第一个 ECharts 图表</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">定制主题样式</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">基本概念</a>
          </li>
        </ul>
      </div>
      <div class="bd-toc-item">
        <a href="#" class="bd-toc-link nuxt-link-exact-active">图表类型</a>
        <ul class="nav bd-sidenav">
          <li class="nav-item">
            <a href="#" class="nav-link">折线图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">柱状图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">饼图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">散点图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">涟漪散点图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">雷达图</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">树图</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  props: ['active', 'posts'],
  async asyncData() {
  }
};

</script>

<style>
.bd-sidebar {
  padding: 20px;
}

.bd-toc-item {
  margin-bottom: 20px;
}

.bd-sidenav {
  margin-top: 10px;
  display: none;
}

.nav {
  display: block;
}

.bd-toc-link {
  font-weight: bold;
  color: #444;
}

.nav-link {
  color: #555;
}

  .nav-link:hover {
    text-decoration: underline;
  }
</style>
