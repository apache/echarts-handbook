# 图表容器及大小

在[快速上手](${lang}/get-started)中，我们介绍了初始化 ECharts 的接口 [`echarts.init`](${mainSitePath}/api.html#echarts.init)。[API 文档](${mainSitePath}/api.html#echarts.init)中详细介绍了参数的具体含义，建议理解后再阅读本文。

下面，我们就常见的几种使用场景，介绍如何初始化一个图表以及改变其大小。

## 初始化

### 在 HTML 中定义有宽度和高度的父容器（推荐）

通常来说，需要在 HTML 中先定义一个 `<div>` 节点，并且通过 CSS 使得该节点具有宽度和高度。初始化的时候，传入该节点，图表的大小默认即为该节点的大小，除非声明了 `opts.width` 或 `opts.height` 将其覆盖。

```html
<div id="main" style="width: 600px;height:400px;"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
</script>
```

需要注意的是，使用这种方法在调用 `echarts.init` 时需保证容器已经有宽度和高度了。

### 指定图表的大小

如果图表容器不存在宽度和高度，或者，你希望图表宽度和高度不等于容器大小，也可以在初始化的时候指定大小。

```html
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'), null, {
    width: 600,
    height: 400
  });
</script>
```

## 响应容器大小的变化

### 监听图表容器的大小并改变图表大小

在有些场景下，我们希望当容器大小改变时，图表的大小也相应地改变。

比如，图表容器是一个高度为 300px、宽度为页面 100% 的节点，你希望在浏览器宽度改变的时候，始终保持图表宽度是页面的 100%。

这种情况下，可以监听页面的 `window.onresize` 事件获取浏览器大小改变的事件，然后调用 [`echartsInstance.resize`](${mainSitePath}api.html#echartsInstance.resize) 改变图表的大小。

```html
<style>
  #main,
  html,
  body {
    width: 100%;
  }
  #main {
    height: 400px;
  }
</style>
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
  window.onresize = function() {
    myChart.resize();
  };
</script>
```

在 Vue.js 中，可在 `mounted` 中通过监听 `resize` 事件获取浏览器大小改变的事件
```js
mounted() {
  const myChart = echarts.init(document.getElementById('main'));
  window.addEventListener('resize', () => {
    if(myChart) myChart.resize();
  })
},
```

### 为图表设置特定的大小

除了直接调用 `resize()` 不含参数的形式之外，还可以指定宽度和高度，实现图表大小不等于容器大小的效果。

```js
myChart.resize({
  width: 800,
  height: 400
});
```

> 小贴士：阅读 API 文档的时候要留意接口的定义方式，这一接口有时会被误认为是 myCharts.resize(800, 400) 的形式，但其实不存在这样的调用方式。

### 容器节点被销毁以及被重建时

假设页面中存在多个标签页，每个标签页都包含一些图表。当选中一个标签页的时候，其他标签页的内容在 DOM 中被移除了。这样，当用户再选中这些标签页的时候，就会发现图表“不见”了。

本质上，这是由于图表的容器节点被移除导致的。即使之后该节点被重新添加，图表所在的节点也已经不存在了。

正确的做法是，在图表容器被销毁之后，调用 [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) 销毁实例，在图表容器重新被添加后再次调用 [echarts.init](${mainSitePath}/api.html#echarts.init) 初始化。

> 小贴士：在容器节点被销毁时，总是应调用 [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) 以销毁实例释放资源，避免内存泄漏。
