# Chart Container and Size

In [Get Started](${lang}/get-started), we introduced the API to initialize the ECharts [`echarts.init`](${mainSitePath}/api.html#echarts.init). [API Document](${mainSitePath}/api.html#echarts.init) has introduced the specific meaning of each parameters. Please read and understand the document before reading the following content.

Refer to several common usage scenarios, here is the example to initialize a chart and change the size.

## Initialization

### Define a Parent Container in HTML

In general, you need to define a `<div>` node and use the CSS to change the width and height. While initializing, import the chart into the node. Without declaring `opts.width` or `opts.height`, the size of the chart will default to the size of the node.

```html
<div id="main" style="width: 600px;height:400px;"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
</script>
```

To be noticed, before calling `echarts.init`, you need to make sure the container already has width and height.

### Specify the chart size

If the height and width of the container do not exist, or you wish the chart size not equal to the container, you can initialize the size at the beginning.

```html
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'), null, {
    width: 600,
    height: 400
  });
</script>
```

## Reactive of the Container Size

### Listen to the Container Size to Change the Chart Size

In some cases, we want to accordingly change the chart size while the size of containers changed.

For instance, the container has a height of 400px and a width of 100% site width. If you are willing to change the site width while stable the chart width as 100% of it, try the following method.

You can listen to `resize` of the site to catch the event that the browser is resized. Then use [`echartsInstance.resize`](${mainSitePath}api.html#echartsInstance.resize) to resize the chart.

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
  window.addEventListener('resize', function() {
    myChart.resize();
  });
</script>
```

> Tips：Sometimes we may adjust the container size by JS/CSS, but this doesn't change the page size so that the `resize` event won't be triggered. You can try the [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API to cover this scenario.

### State a Specific Chart Size

Except for calling `resize()` without parameters, you can state the height and width to implement the chart size different from the size of the container.

```js
myChart.resize({
  width: 800,
  height: 400
});
```

> Tips: Pay attention to how the API defined while reading the documentation. `resize()` API was sometimes mistaken for the form like `myCharts.resize(800, 400)` which do not exist.

### Dispose and Rebuild of the Container Node

We assume that there exist several bookmark pages and each page contained some charts. In this case, the content in other pages will be removed in DOM when select one page. The user will not find the chart after reselecting these pages.

Essentially, this is because the container node of the charts was removed. Even if the node is added again later, the node where the graph is located no longer exists.

The correct way is, call [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) to dispose the instance after the container was disposed, and call [echarts.init](${mainSitePath}/api.html#echarts.init) to initialize after the container was added again.

> Tips: Call [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) to release resources while disposing the node to avoid memory leaks.
