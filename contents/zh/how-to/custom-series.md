# 自定义系列

自定义系列可以自定义系列中的图形元素渲染，从而能扩展出不同的图表。本文将介绍使用如何开发或使用自定义系列，更详细的内容参见[配置项手册](${optionPath}series-custom)。

## 可注册式自定义系列（新）

从 Apache ECharts v6.0.0 版本起，我们支持了可注册的自定义系列，并且在 [echarts-custom-series](https://github.com/apache/echarts-custom-series) 中提供了多个可直接通过 NPM 安装的自定义系列。

你可以直接使用该项目中的自定义系列开发图表，或者使用其他人发布的自定义系列，或者自己开发自定义系列（后文将会详细介绍）并通过类似的方式使用。首先，让我们来了解一下最简单的方式——使用官方发布的自定义系列。

### 使用已发布的自定义系列

下面，我们以范围柱状图为例，介绍如何使用已发布的自定义系列。

范围柱状图的文档在 [echarts-custom-series/custom-series/barRange](https://github.com/apache/echarts-custom-series/tree/main/custom-series/barRange)，其中有详细的介绍、API 和示例。

简单来说，我们在使用已发布的自定义系列的时候，首先需要通过 `npm install @echarts-x/custom-bar-range` 之类的命令下载，然后根据开发环境，选择使用的方式。

例如，你在网页环境中使用，并且没有额外的打包工具，那么最简单的方式是：

```html
<script src="./node_modules/echarts/dist/echarts.js"></script>
<script src="./node_modules/@echarts-x/custom-bar-range/dist/bar-range.auto.js"></script>
<script>
  // 无需调用 echarts.use()，已经自动注册过了
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

`bar-range.auto.js` 中的 `auto` 指的是加载它的时候自动会将自定义系列注册到 `echarts` 全局变量上，无需开发者手动注册，只需要在 `setOption` 的时候通过 `type: 'custom'` 指定使用自定义系列，并通过 `renderItem: 'barRange'` 指定使用的自定义系列名称即可。

你通常需要通过 `itemPayload` 把参数传递给自定义系列。你可以在每个自定义系列的 README 中找到它可配置的参数。

需要注意的是，通常你需要配置 `encode` 来指定数据映射。你可以在 README 和示例中找到每个自定义系列推荐的使用方式。

### 开发自己的自定义系列

你可以参考 [echarts-custom-series](https://github.com/apache/echarts-custom-series) 的源码来了解如何开发自定义系列。推荐 fork 该项目并通过 `npm run generate xxx` 来生成新的自定义系列框架，并且还提供了编译、文档、示例等脚手架，可以帮助你快速开发新的自定义系列。

主要的开发内容是实现一个 `renderItem`，文档参见 [配置项手册](${optionPath}series-custom.renderItem)。

如果你开发了一个通用的自定义系列，建议通过 Pull Request 将其提交，从而让更多开发者也可以使用。

## 非注册式自定义系列

如果你开发的自定义系列是不需要复用的，你也可以直接在 `renderItem` 中实现自定义系列的渲染算法。你可以在[官网自定义系列示例](${mainSitePath}/examples#chart-type-custom)找到很多例子，并在此基础上进行开发。
