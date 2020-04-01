<template>
  <div>
    <navigator />

    <div class="container-fluid">
      <div class="row flex-xl-nowrap2">
        <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
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
        <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
          <div class="post-content content">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigator from '~/components/partials/Navigator.vue';

export default Vue.extend({
  components: {
    Navigator
  }
})
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



.post-content {
  margin: 20px 0;
}

h1 {
  margin-bottom: 20px;
  font-size: 36px;
}

h2 {
  margin: 40px 0 20px 0;
  font-size: 26px;
}

h3 {
  font-size: 22px;
}

h4 {
  font-size: 18px;
}

h5 {
  font-size: 16px;
}

h6 {
  font-size: 14px;
}
</style>
