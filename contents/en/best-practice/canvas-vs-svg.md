# Render with SVG or Canvas

Most of the browser-side chart libraries are using SVG or Canvas as their underlying render because they are interchangeable. However, they show notable differences in some specific scenarios and cases. As a result, it is hard to find a standard choice between them.

Canvas has been used as the renderer (VML for IE8-) of ECharts from the beginning. Since [ECharts v4.0](https://github.com/apache/echarts/releases) was released, ECharts provided the SVG render as an additional option. You can specify the [renderer parameter](http://echarts.baidu.com/api.html#echarts.init) as `'canvas'` or `'svg'` while initializing a chart.

> SVG and Canvas have a significant difference in use. The simultaneous transparent support in ECharts between SVG and Canvas is because of the abstraction and implementation of the underlying library [ZRender](https://github.com/ecomfe/zrender). It formed an interchangeable SVG renderer and Canvas renderer.

## How to Choose a Renderer?

Generally, Canvas is more suitable for charts with a large number of elements (heat map, large-scale line or scatter plot in geo or parallel coordinates, etc.), and with visual [effect](examples/editor.html?c=lines-bmap-effect). However, SVG has an important advantage: It has less memory usage (which is important for mobile devices), higher rendering performance, no blur when using the browser zoom. For instance, we used Canvas and SVG renderer in some hardware environment to draw the chart with medium data volume and recorded the frame rate during the initial animation performing:

<iframe width="600" height="400" src="${exampleViewPath}doc-example/canvas-vs-svg&reset=1&edit=1"></iframe>

In those scenarios, SVG renderer has better overall performance than Canvas in mobile devices. This is not a comprehensive evaluation for sure, in other scenarios of huge data volume, the performance of Canvas is still better than SVG. We keep both renderers to provide a wider space for developers to optimize their program.

When choosing renderer, try to consider hardware and software environment, data amount, and functional requirement:
+ If the environment is not harsh, and the data volume is not big (eg. Business report in PC), you can choose both of them without tangling.
+ In some harsh environment, try to consider these points:

	+ To create a huge amount of instance in a crash-prone browser (It perhaps because the number of Canvas exceeded the capacity of the phone.), Try to use SVG renderer to improve. Generally, if the chart is running on a low-end Android phone, or you are using some specific chart like [liquidfill](https://ecomfe.github.io/echarts-liquidfill/example/), the SVG render will perform better.
	+ Use Canvas while visualizing a large amount of data.

We strongly welcome developers to give us a [feedback](https://github.com/apache/echarts/issues/new). It will be very helpful for us to optimize ECharts. Thank you!

Note: except some specific charts rely on Canvas (eg. [series lines effect](option.html#series-lines.effect), [heatmap bmap](examples/editor.html?c=heatmap-bmap), etc.), most of the remaining render are supported by SVG. SVG can not support rich text, texture, and shadow right now.

## Suggestion for Using Renderer

ECharts uses Canvas by default. You must include the SVG renderer module if you intend to try SVG.

- ECharts

- In [pre-built](https://www.jsdelivr.com/package/npm/echarts) of ECharts，[common](https://cdn.jsdelivr.net/npm/echarts/dist/echarts.common.min.js) version and [complete](https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js) version included SVG renderer that can be used directly. The [simple](https://cdn.jsdelivr.net/npm/echarts/dist/echarts.simple.min.js) version did not include SVG renderer.
- If [build ECharts online](builder.html), tick the "SVG Renderer" checkbox.
- If [build ECharts offline](tutorial.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9E%84%E5%BB%BA%20ECharts), import the SVG renderer module:


```js
import 'zrender/lib/svg/svg';
```

Then you can define the [parameter](api.html#echarts.init) of renderer type while initializing it:

```js
// Use Canvas renderer（default）
var chart = echarts.init(containerDom, null, {renderer: 'canvas'});
// equivalent to:
var chart = echarts.init(containerDom);

// Use SVG renderer
var chart = echarts.init(containerDom, null, {renderer: 'svg'});
```
