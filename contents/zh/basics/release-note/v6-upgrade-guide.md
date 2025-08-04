# Apache ECharts 6 升级指南

本指南面向那些希望将 echarts 5.x（以下简称 `v5`）升级到 echarts 6.x（以下简称 `v5`）的用户。大家可以在 [ECharts 6 新特性](${lang}/basics/release-note/v6-feature) 中了解这次`v6`带来了哪些值得升级的新特性。在绝大多数情况下，开发者用不着为这个升级做什么额外的事，因为 echarts 一直尽可能地保持 API 的稳定和向后兼容。但是，`v6` 仍然带来了一些非兼容改动，需要特别关注。此外，在一些情况下，`v6` 提供了更好的 API 用来取代之前的 API，这些被取代的 API 将不再被推荐使用（当然，我们尽量兼容了这些改动）。我们会在这篇文档里尽量详尽得解释这些改动。

## 升级方式

在[官网下载页](${mainSitePath}download.html)可以下载最新版的源码和编译产物。如果使用 npm 安装，升级方式为：

```sh
npm install echarts@6
```

## 非兼容性改变

### 默认主题（theme）

首先是默认主题的改动，`v6` 在配色等主题设计上做了很多的优化来达到更好的视觉效果。如果大家依旧想保留旧版本的颜色，可以使用 [echarts/theme/v5.js](https://github.com/apache/echarts/blob/master/theme/v5.js) 主题文件，并通过以下方式初始化图表：

```js
import 'echarts/theme/v5';
const chart = echarts.init(document.getElementById('container'), 'v5');
```

需要注意的事，`v6` 的新样式不仅改变了主题色，也优化调整了部分组件的默认位置和尺寸（例如，默认图例 legend 的位置现在改为在画布底部）。使用 `echarts/theme/v5.js` 后可以恢复到之前的组件默认位置和尺寸。

如果不在意其他的变动，但是想只把默认图表配色恢复到 v5 的默认配色，可以创建一个只定义了 v5 默认配色的主题：

```js
const colorPaletteV5 = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
];
echarts.registerTheme('myTheme', { color: colorPaletteV5 });
const chart = echarts.init(document.getElementById('container'), 'myTheme');
```

另外，v5 版本中的 `echarts/src/theme/light.ts` 已迁移至 `echarts/theme/rainbow.js`。

### 标签位置

在直角坐标系中 (`grid` 组件)，如果之前坐标轴名称 (`axisName`) 或标签 (`axisLabel`) 溢出画布或发生重叠，升级之后的坐标轴的位置可能会相对之前而言略微偏移，因为默认启用了防止溢出和防止坐标轴名称与标签重叠的机制。在大多数情况下，这些变化肉眼难以察觉。但如果出现不合理的变化，可以通过设置 [grid.outerBoundsMode: 'none'](${mainSitePath}option.html#grid.outerBoundsMode) 选项关闭防溢出机制，或设置 [xAxis/yAxis.axisLabel.nameMoveOverlap: false](${mainSitePath}option.html#xAxis.nameMoveOverlap) 选项关闭防重叠机制。参见 [#21059](https://github.com/apache/echarts/pull/21059)。

### 中心位置

在 [geo](${mainSitePath}option.html#geo.center)、[series.map](${mainSitePath}option.html#series-map.center)、[series.graph](${mainSitePath}option.html#series-graph.center) 和 [series.tree](${mainSitePath}option.html#series-tree.center) 中，`center` 如果使用百分比时 (如 `'33%'`)，百分比的基准发生了变化。之前的百分比基准是不合理的。如需恢复旧行为，可在 ECharts option 的根级别设置 `legacyViewCoordSysCenterBase: true`。参见 [#19807#issuecomment-2974437299](https://github.com/apache/echarts/pull/19807#issuecomment-2974437299)。

例如：
```js
option = {
    legacyViewCoordSysCenterBase: true,
    geo: {...}
    series: {...}
}
```

### 富文本

v6 中 [富文本标签 (label.rich)](${mainSitePath}option.html#series-scatter.label.rich) 的这些样式 `fontStyle`、`fontWeight`、`fontSize`、`fontFamily`、`textShadowColor`、`textShadowBlur`、`textShadowOffsetX`、`textShadowOffsetY` 会改为继承 [普通标签 (label)](${mainSitePath}option.html#series-scatter.label) 中的同名样式。如需恢复旧行为，可以在 ECharts option 的根级别或 label option 中设置 `richInheritPlainLabel: false`。参见 [#20977](https://github.com/apache/echarts/issues/20977)。

例如：
```js
option = {
    richInheritPlainLabel: true, // 一般设此即可。
    series: {
        // ...
        label: {
            // 如果在 option 根级别设置不生效，则在此处设置：
            // richInheritPlainLabel: true
            rich: {
                // ...
            }
        }
    }
}
```
