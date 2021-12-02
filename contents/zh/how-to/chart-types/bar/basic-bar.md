# 基本柱状图

柱状图（或称条形图）是一种通过柱形的长度来表现数据大小的一种常用图表类型。

设置柱状图的方式，是将 `series` 的 `type` 设为 `'bar'`。

[[配置项手册]](${optionPath}series-bar)

## 最简单的柱状图

最简单的柱状图可以这样设置：

```js live
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

在这个例子中，横坐标是类目型的，因此需要在 `xAxis` 中指定对应的值；而纵坐标是数值型的，可以根据 `series` 中的 `data`，自动生成对应的坐标范围。

## 多系列的柱状图

我们可以用一个系列表示一组相关的数据，如果需要实现多系列的柱状图，只需要在 `series` 多添加一项就可以了——

```js live
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

## 柱状图样式设置

### 柱条样式

柱条的样式可以通过 [`series.itemStyle`](${optionPath}series-bar.itemStyle) 设置，包括：

- 柱条的颜色（`color`）；
- 柱条的描边颜色（`borderColor`）、宽度（`borderWidth`）、样式（`borderType`）；
- 柱条圆角的半径（`barBorderRadius`）；
- 柱条透明度（`opacity`）；
- 阴影（`shadowBlur`、`shadowColor`、`shadowOffsetX`、`shadowOffsetY`）。

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [
        10,
        22,
        28,
        {
          value: 43,
          // 设置单个柱子的样式
          itemStyle: {
            color: '#91cc75',
            shadowColor: '#91cc75',
            borderType: [10, 5, 5],
            opacity: 0.5
          }
        },
        49
      ],
      itemStyle: {
        barBorderRadius: 5,
        borderWidth: 1,
        borderType: 'solid',
        borderColor: '#73c0de',
        shadowColor: '#5470c6',
        shadowBlur: 3
      }
    }
  ]
};
```

在这个例子中，我们通过设置柱状图对应 `series` 的`itemStyle`，设置了柱条的样式。完整的配置项及其用法请参见配置项手册 [`series.itemStyle`](${optionPath}series-bar.itemStyle)。

### 柱条宽度和高度

柱条宽度可以通过 [`barWidth`](${optionPath}#series-bar.barWidth) 设置。比如在下面的例子中，将 `barWidth` 设为 `'20%'`，表示每个柱条的宽度就是类目宽度的 20%。由于这个例子中，每个系列有 5 个数据，20% 的类目宽度也就是整个 x 轴宽度的 4%。

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [10, 22, 28, 43, 49],
      barWidth: '20%'
    }
  ]
};
```

另外，还可以设置 [`barMaxWidth`](${optionPath}series-bar.barMaxWidth) 限制柱条的最大宽度。对于一些特别小的数据，我们也可以为柱条指定最小高度 [`barMinHeight`](${optionPath}series-bar.barMinHeight)，当数据对应的柱条高度小于该值时，柱条高度将采用这个最小高度。

### 柱条间距

柱条间距分为两种，一种是不同系列在同一类目下的距离 [`barWidth`](${optionPath}series-bar.barWidth)，另一种是类目与类目的距离 [`barCategoryGap`](${optionPath}series-bar.barCategoryGap)。

```js live
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

在这个例子中，`barGap` 被设为 `'20%'`，这意味着每个类目（比如 `A`）下的两个柱子之间的距离，相对于柱条宽度的百分比。而 `barCategoryGap` 是 `'40%'`，意味着柱条每侧空余的距离，相对于柱条宽度的百分比。

通常而言，设置 `barGap` 及 `barCategoryGap` 后，就不需要设置 `barWidth` 了，这时候的宽度会自动调整。如果有需要的话，可以设置 `barMaxWidth` 作为柱条宽度的上限，当图表宽度很大的时候，柱条宽度也不会太宽。

> 在同一坐标系上，此属性会被多个柱状图系列共享。此属性应设置于此坐标系中最后一个柱状图系列上才会生效，并且是对此坐标系中所有柱状图系列生效。

### 为柱条添加背景色

有时，我们希望能够为柱条添加背景色。从 ECharts 4.7.0 版本开始，这一功能可以简单地用 [`showBackground`](${optionPath}series-bar.showBackground) 开启，并且可以通过 [`backgroundStyle`](${optionPath}series-bar.backgroundStyle) 配置。

```js live
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
