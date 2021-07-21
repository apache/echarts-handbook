# Basic Bar Chart

Bar Chart, is a chart that presents the comparisons among discrete data. The length of the bars is proportionally related to the categorical data.

To set the bar chart, you need to set the `type` of `series` as `'bar'`.

[[Option]](${optionPath}series-bar)

## Simple Example

Let's begin with a basic bar chart:

```js [live]
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

In this case, the x-axis is under the category type. Therefore, you should define some corresponding values for `'xAxis'`. Meanwhile, the data type of the y-axis is numerical. The range of the y-axis will be generated automatically by the `data` in `'series'`.

## Multi-series Bar Chart

You may use a series to represent a group of related data. To show multiple series in the same chart, you need to add one more array under the `series`.

```js [live]
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    },
    {
      type: 'bar',
      data: [26, 24, 18, 22, 23, 20, 27]
    }
  ]
};
```

## Customized Bar Chart

### Styles

It is a good idea to install the style of Bar Chart by using ['series.itemStyle'](${optionPath}series-bar.itemStyle). Description of the SCI:

- Color of column(`'color'`);
- Outline color(`'borderColor'`), width(`'borderWidth'`), type(`'borderType'`) of column;
- Border radius of column(`'barBorderRadius'`);
- Transparency(`'opacity'`);
- Shadow type(`'shadowBlur'`, `'shadowColor'`, `'shadowOffsetX'`, `'shadowOffsetY'`)

Here is a example:

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x'
    }
  ]
};
```

In this case, we defined the style of the bar chart by `'itemStyle'` of corresponding `series`. For complete configuration items and their usage, please check the configuration item manual: [`series.itemStyle`](${optionPath}series-bar.itemStyle)。

### Width and Height of Column

You can use [`barWidth`](${optionPath}#series-bar.barWidth) to change the width of the bar. For instance, the `'barWidth'` in the following case was set to `'20%'`. It indicates that width of each bar is 20% of the category width. As there are 5 data in every series, 20% `'barWidth'` means 4% for the entire x-axis.

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x'
    }
  ]
};
```

In addition, [`barMaxWidth`](${optionPath}series-bar.barMaxWidth) has limited the maximum width of the bar. For some small value, you can declare a minimum height for the bar: [`barMinHeight`](${optionPath}series-bar.barMinHeight). When the corresponding height of data is smaller than the limit, ECharts will take 'barMinHeight' as the replaced height.

### Column Spacing

There are two kinds of column spacing. One is the spacing between different series under the same category: [`barWidth`](${optionPath}series-bar.barWidth). The other is the spacing between categories: [`barCategoryGap`](${optionPath}series-bar.barCategoryGap).

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 18],
      barGap: '20%',
      barCategoryGap: '40%'
    },
    {
      type: 'bar',
      data: [12, 14, 9, 9, 11]
    }
  ]
};
```

In this case, the `barGap` is `'20%'`. That means the distance between bars under the same category is 20% of the bar width. For instance, if we set the `barCategoryGap` to `'40%'`, the gap on each side of the bar will take 40% place in categories (compared with the width of the column).

Usually, `barWidth` is not necessary to be clarified if `'barGap'` and `barCategoryGap` was set. If you need to make sure the bar is not too wide while the graph is large, try to use `barMaxWidth` to limit the maximum width of bars.

> In the same cartesian coordinate system, the property will be shared by several column series. To make sure it takes effect on the graph, please set the property on the last bar chart series of the system.

### Add Background Color for Bars

You might want to change the background color of bars sometimes. After ECharts v4.7.0, this function can be enabled by ['showBackground'](${optionPath}series-bar.showBackground) and configured by ['backgroundStyle'](${optionPath}series-bar.backgroundStyle).

```js [live]
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      }
    }
  ]
};
```
