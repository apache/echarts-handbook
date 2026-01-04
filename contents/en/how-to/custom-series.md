# Custom Series

Custom series allow for the customization of graphic element rendering within a series, enabling the extension of various chart types. This article will introduce how to develop or use custom series. For more detailed information, please refer to the [Option API](${optionPath}series-custom).

## Registerable Custom Series (New)

Starting from Apache ECharts v6.0.0, we support registerable custom series and provide several custom series that can be installed directly via NPM in [echarts-custom-series](https://github.com/apache/echarts-custom-series).

| | |
|-|-|
| `@echarts-x/custom-violin`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/violin) [npm](https://www.npmjs.com/package/@echarts-x/custom-violin) <br> ![violin](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/violin/screenshots/violin.svg) | `@echarts-x/custom-contour`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/contour) [npm](https://www.npmjs.com/package/@echarts-x/custom-contour) <br> ![contour](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/contour/screenshots/contour.svg) |
| `@echarts-x/custom-stage`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/stage) [npm](https://www.npmjs.com/package/@echarts-x/custom-stage) <br> ![stage](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/stage/screenshots/stage.svg) | `@echarts-x/custom-segmented-doughnut`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/segmentedDoughnut) [npm](https://www.npmjs.com/package/@echarts-x/custom-segmented-doughnut) <br> ![segmentedDoughnut](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/segmentedDoughnut/screenshots/segmentedDoughnut.svg) |
| `@echarts-x/custom-bar-range`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/barRange) [npm](https://www.npmjs.com/package/@echarts-x/custom-bar-range) <br> ![barRange](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/barRange/screenshots/barRange.svg) | `@echarts-x/custom-line-range`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/lineRange) [npm](https://www.npmjs.com/package/@echarts-x/custom-line-range) <br> ![lineRange](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/lineRange/screenshots/lineRange.svg) |
| `@echarts-x/custom-liquid-fill`<br> [doc](https://github.com/apache/echarts-custom-series/tree/main/custom-series/liquidFill) [npm](https://www.npmjs.com/package/@echarts-x/custom-liquid-fill) <br> ![liquidFill](https://raw.githubusercontent.com/apache/echarts-custom-series/refs/heads/main/custom-series/liquidFill/screenshots/liquidFill.svg) | |

You can directly use the custom series in this project to develop charts, use custom series published by others, or develop your own custom series (which will be introduced in detail later) and use them in a similar way. First, let's look at the simplest way—using officially published custom series.

### Using Published Custom Series

Below, we take the range bar chart as an example to introduce how to use published custom series.

The documentation for the range bar chart is at [echarts-custom-series/custom-series/barRange](https://github.com/apache/echarts-custom-series/tree/main/custom-series/barRange), which includes detailed introductions, APIs, and examples.

In short, when using a published custom series, you first need to download it using a command like `npm install @echarts-x/custom-bar-range`, and then choose the usage method based on your development environment.

For example, if you are using it in a web environment without additional bundling tools, the simplest way is:

```html
<script src="./node_modules/echarts/dist/echarts.js"></script>
<script src="./node_modules/@echarts-x/custom-bar-range/dist/bar-range.auto.js"></script>
<script>
  // No need to call echarts.use(), automatically registered
  const chart = echarts.init(...);
  const option = {
    series: [{
      type: 'custom',
      renderItem: 'barRange',
      data: [
        [0, 26.7, 32.5],
        [1, 25.3, 32.4],
        [2, 24.6, 32.7],
        [3, 26.8, 35.8],
        [4, 26.2, 33.1],
        [5, 24.9, 31.4],
        [6, 25.3, 32.9]
      ],
      itemPayload: {
        barWidth: 10,
        borderRadius: 5,
      },
      encode: {
        x: 0,
        y: [1, 2],
        tooltip: [1, 2],
      }
    }]
  };
  chart.setOption(option);
</script>
```

The `auto` in `bar-range.auto.js` means that when it is loaded, it will automatically register the custom series to the `echarts` global variable. Developers do not need to register it manually; they only need to specify `type: 'custom'` in `setOption` and specify the name of the custom series used via `renderItem: 'barRange'`.

You usually need to pass parameters to the custom series through `itemPayload`. You can find its configurable parameters in the README of each custom series.

Note that you usually need to configure `encode` to specify data mapping. You can find the recommended usage for each custom series in its README and examples.

### Developing Your Own Custom Series

You can refer to the source code of [echarts-custom-series](https://github.com/apache/echarts-custom-series) to learn how to develop custom series. It is recommended to fork the project and use `npm run generate xxx` to generate a new custom series framework. It also provides scaffolding for compilation, documentation, examples, etc., which can help you quickly develop new custom series.

The main development task is to implement a `renderItem`. For documentation, see the [Configuration Manual](${optionPath}series-custom.renderItem).

If you develop a general-purpose custom series, it is recommended to submit it via a Pull Request so that more developers can use it.

## Non-Registerable Custom Series

If the custom series you develop is not intended for reuse, you can also implement the rendering algorithm for the custom series directly in `renderItem`. You can find many examples in the [Official Custom Series Examples](${mainSitePath}/examples#chart-type-custom) and develop based on them.
