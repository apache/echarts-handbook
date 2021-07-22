# Render with SVG or Canvas

Most of the browser-side chart libraries are using SVG or Canvas as their underlying render because they are interchangeable. However, they show notable differences in some specific scenarios and cases. As a result, it is hard to find a standard choice between them.

Canvas has been used as the renderer (VML for IE8-) of ECharts from the beginning. Since [ECharts v4.0](https://github.com/apache/echarts/releases) was released, ECharts provided the SVG render as an additional option. You can specify the [renderer parameter](http://echarts.baidu.com/api.html#echarts.init) as `'canvas'` or `'svg'` while initializing a chart.

> SVG and Canvas have a significant difference in use. The simultaneous transparent support in ECharts between SVG and Canvas is because of the abstraction and implementation of the underlying library [ZRender](https://github.com/ecomfe/zrender). It formed an interchangeable SVG renderer and Canvas renderer.

## How to Choose a Renderer?

Generally, Canvas is more suitable for charts with a large number of elements (heat map, large-scale line or scatter plot in geo or parallel coordinates, etc.), and with visual [effect](${mainSitePath}/examples/editor.html?c=lines-bmap-effect). However, SVG has an important advantage: It has less memory usage (which is important for mobile devices), no blur when using the browser zoom.

The choice of renderer can be based on a combination of hardware and software environment, data volume and functional requirements.

- In scenarios where the hardware and software environment is good and the amount of data is not too large, both renderers will work and there is not much need to agonise over them.
- In scenarios where the environment is poor and performance issues arise that require optimisation, experimentation can be used to determine which renderer to use. For example, there are these experiences.
  - In situations where many instances of ECharts have to be created and the browser is prone to crashing (probably because the number of Canvas is causing the memory footprint to exceed the phone's capacity), the SVG renderer can be used to make improvements. Roughly speaking, the SVG renderer may work better if the chart is running on a low-end Android, or if we are using specific charts such as the [LiquidFill chart](https://ecomfe.github.io/echarts-liquidfill/example/).
  - For larger amounts of data (>1k is an experience value), canvas renderer is always recommended.

We strongly welcome [feedback](https://github.com/apache/echarts/issues/new) from developers on their experiences and scenarios to help us make better optimizations.

Note: Currently, some special rendering still relies on Canvas: e.g. [trail effect](${optionPath}series-lines.effect), [heatmap with blending effect](${mainSitePath}/examples/editor.html?c=heatmap-bmap), etc.

## How to Use the Renderer

If `echarts` is fully imported in the following way, the code already contains an SVG renderer and a Canvas renderer

```js
import * as echarts from 'echarts';
```

If you are using treeshakable import as described in [Introducing Apache ECharts in your project](${lang}/basics/import), you will need to import the required renderers manually

```js
import * as echarts from 'echarts/core';
// You can use only the renderers you need
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);
```

Then, we can [pass in the parameter](${mainSitePath}/api.html/api.html#echarts.init) when initializing the chart instance in code to select the renderer.

```js
// Use the Canvas renderer (default)
var chart = echarts.init(containerDom, null, { renderer: 'canvas' });
// Equivalent to.
var chart = echarts.init(containerDom);

// using the SVG renderer
var chart = echarts.init(containerDom, null, { renderer: 'svg' });
```
