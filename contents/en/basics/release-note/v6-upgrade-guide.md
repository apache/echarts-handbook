# Apache ECharts 6 Upgrade Guide

This guide is for users who wish to upgrade from echarts 5.x (hereinafter referred to as `v5`) to echarts 6.x (hereinafter referred to as `v6`). You can learn about the new features brought by `v6` in [ECharts 6 New Features](${lang}/basics/release-note/v6-feature). In most cases, developers do not need to do anything extra for this upgrade, as echarts has always tried to keep the API stable and backward compatible. However, `v6` does introduce some breaking changes that require special attention. In addition, in some cases, `v6` provides better APIs to replace previous ones, and these replaced APIs are no longer recommended (of course, we have tried to maintain compatibility for these changes). We will explain these changes in detail in this document.

## How to Upgrade

You can download the latest source code and builds from the [official download page](${mainSitePath}download.html). If you use npm, upgrade with:

```sh
npm install echarts@6
```

## Breaking Changes

### Default Theme

First, the default theme has changed. `v6` has made many optimizations in color schemes and theme design for better visual effects. If you want to keep the old version's colors, you can use the [echarts/theme/v5.js](https://github.com/apache/echarts/blob/master/theme/v5.js) theme file and initialize the chart as follows:

```js
import 'echarts/theme/v5';
const chart = echarts.init(document.getElementById('container'), 'v5');
```

Note that the new styles in `v6` not only change the theme colors, but also optimize and adjust the default positions and sizes of some components (for example, the default position of the legend is now at the bottom of the canvas). Using `echarts/theme/v5.js` can restore the previous default positions and sizes of components.

If you don't mind other changes but only want to restore the default color palette to that of v5, you can create a theme that only defines the v5 default colors:

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

In addition, the `echarts/src/theme/light.ts` file from v5 has been moved to `echarts/theme/rainbow.js`.

### Label Position

In Cartesian coordinate systems (`grid` component), if axis names (`axisName`) or labels (`axisLabel`) previously overflowed the canvas or overlapped, the position of the axes may shift slightly after upgrading, because overflow prevention and axis name/label overlap prevention are now enabled by default. In most cases, these changes are barely noticeable. But if there are unreasonable changes, you can disable the overflow prevention by setting [grid.outerBoundsMode: 'none'](${mainSitePath}option.html#grid.outerBoundsMode), or disable the overlap prevention by setting [xAxis/yAxis.nameMoveOverlap: false](${mainSitePath}option.html#xAxis.nameMoveOverlap).

### Rich Text

In v6, the following styles of [rich text labels (label.rich / textStyle.rich)](${mainSitePath}option.html#series-scatter.label.rich): `fontStyle`, `fontWeight`, `fontSize`, `fontFamily`, `textShadowColor`, `textShadowBlur`, `textShadowOffsetX`, and `textShadowOffsetY` will inherit from the same-named styles in [plain labels (label / textStyle)](${mainSitePath}option.html#series-scatter.label). To restore the old behavior, you can set `richInheritPlainLabel: false` at the root level of the ECharts option or in the label/textStyle option.

For example:
```js
option = {
    richInheritPlainLabel: false, // Usually set here.
    xxx1: {
        // Or set here to only control this label.
        label: {
            richInheritPlainLabel: false,
            rich: {/* ... */},
        }
    },
    xxx2: {
        textStyle: {
            richInheritPlainLabel: false,
            rich: {/* ... */},
        }
    }
}
```
