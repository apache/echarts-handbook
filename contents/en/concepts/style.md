# Overview of Style Customization

This article provides an overview of the different approaches about Apache ECharts<sup>TM</sup> style customization. For example, how to config the color, size, shadow of the graphic elements and labels.

> The term "style" may not follow the convention of data visualization, but we use it in this article because it is popular and easy to understand.

These approaches below will be introduced. The functionalities of them might be overlapped, but they are suitable for different scenarios.

- Theme
- Color Palette
- Customize style explicitly (itemStyle, lineStyle, areaStyle, label, ...)
- Visual encoding (visualMap component)

## Theme

Setting a theme is the simplest way to change the color style. For example, in [Examples page](${mainSitePath}examples), we can switch to dark mode and see the result of a different theme.

In our project, we can switch to dark theme like:

```js
var chart = echarts.init(dom, 'dark');
```

Other themes are not included by default, and need to load them ourselves if we want to use them. Themes can be visited and downloaded in the [theme builder](${mainSitePath}theme-builder.html). Theme can also be created or edited in it. The downloaded theme can be used as follows:

If a theme is downloaded as a JSON file, we should register it by ourselves, for example:

```js
var xhr = new XMLHttpRequest();
// Assume the theme name is "vintage".
$.getJSON('xxx/xxx/vintage.json', function(themeJSON) {
  echarts.registerTheme('vintage', JSON.parse(themeJSON));
  var chart = echarts.init(dom, 'vintage');
});
```

If a theme is downloaded as a JS file, it will auto register itself:

```js
// Import the `vintage.js` file in HTML, then:
var chart = echarts.init(dom, 'vintage');
// ...
```

## Color Palette

Color palette can be given in option. They provide a group of colors, which will be auto picked by series and data. We can give a global palette, or exclusive pallette for certain series.

```js
option = {
  // Global palette:
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ],

  series: [
    {
      type: 'bar',
      // A palette only work for the series:
      color: [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ]
      // ...
    },
    {
      type: 'pie',
      // A palette only work for the series:
      color: [
        '#37A2DA',
        '#32C5E9',
        '#67E0E3',
        '#9FE6B8',
        '#FFDB5C',
        '#ff9f7f',
        '#fb7293',
        '#E062AE',
        '#E690D1',
        '#e7bcf3',
        '#9d96f5',
        '#8378EA',
        '#96BFFF'
      ]
      // ...
    }
  ]
};
```

## Customize Style Explicitly (itemStyle, lineStyle, areaStyle, label, ...)

It is a common way to set style explicitly. Throughout ECharts [option](${optionPath}), style related options can be set in various place, including [itemStyle](${optionPath}series.itemStyle), [lineStyle](${optionPath}series-line.lineStyle), [areaStyle](${optionPath}series-line.areaStyle), [label](${optionPath}series.label), etc.

Generally speaking, all of the built-in components and series follow the naming convention like `itemStyle`, `lineStyle`, `areaStyle`, `label` etc, although they may occur in different place according to different series or components.

In the following code we add shadow, gradient to bubble chart.

```js live
var data = [
  [
    [28604, 77, 17096869, 'Australia', 1990],
    [31163, 77.4, 27662440, 'Canada', 1990],
    [1516, 68, 1154605773, 'China', 1990],
    [13670, 74.7, 10582082, 'Cuba', 1990],
    [28599, 75, 4986705, 'Finland', 1990],
    [29476, 77.1, 56943299, 'France', 1990],
    [31476, 75.4, 78958237, 'Germany', 1990],
    [28666, 78.1, 254830, 'Iceland', 1990],
    [1777, 57.7, 870601776, 'India', 1990],
    [29550, 79.1, 122249285, 'Japan', 1990],
    [2076, 67.9, 20194354, 'North Korea', 1990],
    [12087, 72, 42972254, 'South Korea', 1990],
    [24021, 75.4, 3397534, 'New Zealand', 1990],
    [43296, 76.8, 4240375, 'Norway', 1990],
    [10088, 70.8, 38195258, 'Poland', 1990],
    [19349, 69.6, 147568552, 'Russia', 1990],
    [10670, 67.3, 53994605, 'Turkey', 1990],
    [26424, 75.7, 57110117, 'United Kingdom', 1990],
    [37062, 75.4, 252847810, 'United States', 1990]
  ],
  [
    [44056, 81.8, 23968973, 'Australia', 2015],
    [43294, 81.7, 35939927, 'Canada', 2015],
    [13334, 76.9, 1376048943, 'China', 2015],
    [21291, 78.5, 11389562, 'Cuba', 2015],
    [38923, 80.8, 5503457, 'Finland', 2015],
    [37599, 81.9, 64395345, 'France', 2015],
    [44053, 81.1, 80688545, 'Germany', 2015],
    [42182, 82.8, 329425, 'Iceland', 2015],
    [5903, 66.8, 1311050527, 'India', 2015],
    [36162, 83.5, 126573481, 'Japan', 2015],
    [1390, 71.4, 25155317, 'North Korea', 2015],
    [34644, 80.7, 50293439, 'South Korea', 2015],
    [34186, 80.6, 4528526, 'New Zealand', 2015],
    [64304, 81.6, 5210967, 'Norway', 2015],
    [24787, 77.3, 38611794, 'Poland', 2015],
    [23038, 73.13, 143456918, 'Russia', 2015],
    [19360, 76.5, 78665830, 'Turkey', 2015],
    [38225, 81.4, 64715810, 'United Kingdom', 2015],
    [53354, 79.1, 321773631, 'United States', 2015]
  ]
];

option = {
  backgroundColor: {
    type: 'radial',
    x: 0.3,
    y: 0.3,
    r: 0.8,
    colorStops: [
      {
        offset: 0,
        color: '#f7f8fa'
      },
      {
        offset: 1,
        color: '#cdd0d5'
      }
    ]
  },
  grid: {
    left: 10,
    containLabel: true,
    bottom: 10,
    top: 10,
    right: 30
  },
  xAxis: {
    splitLine: {
      show: false
    }
  },
  yAxis: {
    splitLine: {
      show: false
    },
    scale: true
  },
  series: [
    {
      name: '1990',
      data: data[0],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5,
        color: {
          type: 'radial',
          x: 0.4,
          y: 0.3,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(251, 118, 123)'
            },
            {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }
          ]
        }
      }
    },
    {
      name: '2015',
      data: data[1],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(25, 100, 150, 0.5)',
        shadowOffsetY: 5,
        color: {
          type: 'radial',
          x: 0.4,
          y: 0.3,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(129, 227, 238)'
            },
            {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }
          ]
        }
      }
    }
  ]
};
```

## Style of Emphasis State

When mouse hovering a graphic elements, usually the emphasis style will be displayed. By default, the emphasis style is auto generated by the normal style. However they can be specified by [emphasis](${optionPath}series-bar.emphasis) property. The options in [emphasis](${optionPath}series-bar.emphasis) is the same as the ones for normal state, for example:

```js
option = {
  series: {
    type: 'scatter',

    // Styles for normal state.
    itemStyle: {
      // Color of the point.
      color: 'red'
    },
    label: {
      show: true,
      // Text of labels.
      formatter: 'This is a normal label.'
    },

    // Styles for emphasis state.
    emphasis: {
      itemStyle: {
        // Color in emphasis state.
        color: 'blue'
      },
      label: {
        show: true,
        // Text in emphasis.
        formatter: 'This is a emphasis label.'
      }
    }
  }
};
```

Notice: Before ECharts4, the emphasis style should be written like this:

```js
option = {
  series: {
    type: 'scatter',

    itemStyle: {
      // Styles for normal state.
      normal: {
        color: 'red'
      },
      // Styles for emphasis state.
      emphasis: {
        color: 'blue'
      }
    },

    label: {
      // Styles for normal state.
      normal: {
        show: true,
        formatter: 'This is a normal label.'
      },
      // Styles for emphasis state.
      emphasis: {
        show: true,
        formatter: 'This is a emphasis label.'
      }
    }
  }
};
```

The option format is still **compatible**, but not recommended. In fact, in most cases, users only set normal style, and use the default emphasis style. So since ECharts4, we support to write style without the "normal" term, which makes the option more simple and neat.

## Visual Encoding by visualMap Component

[visualMap component](${optionPath}visualMap) supports config the rule that mapping value to visual channel (color, size, ...). More details can be check in [Visual Map of Data](${lang}/concepts/visual-map/).
