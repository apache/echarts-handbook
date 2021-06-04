# 区域面积折线图

区域面积折线图将折线到坐标轴的空间设置背景色，用区域面积表达数据。相比普通的折线图，区域面积折线图的视觉效果更加饱满丰富，在系列不多的场景下尤其适用。

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      areaStyle: {}
    },
    {
      data: [25, 14, 23, 35, 10],
      type: 'line',
      areaStyle: {
        color: '#ff0',
        opacity: 0.5
      }
    }
  ]
};
```

通过 [`areaStyle`](${optionPath}series-line.areaStyle) 设置折线图的填充区域样式，将其设为为 `{}` 表示使用默认样式，即使用系列的颜色以半透明的方式填充区域。如果想指定特定的样式，可以通过设置 `areaStyle` 下的配置项覆盖，如第二个系列将填充区域的颜色设为不透明度为 0.5 的黄色。
