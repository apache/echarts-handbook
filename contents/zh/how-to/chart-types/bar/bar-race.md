# 动态排序柱状图

## 基本设置

动态排序柱状图是一种展示随时间变化的数据排名变化的图表，从 ECharts 5 开始内置支持。

> 动态排序柱状图通常是横向的柱条，如果想要采用纵向的柱条，只要把本教程中的 X 轴和 Y 轴相反设置即可。

1. 柱状图系列的 `realtimeSort` 设为 `true`，表示开启该系列的动态排序效果
2. `yAxis.inverse` 设为 `true`，表示 Y 轴从下往上是从小到大的排列
3. `yAxis.animationDuration` 建议设为 `300`，表示第一次柱条排序动画的时长
4. `yAxis.animationDurationUpdate` 建议设为 `300`，表示第一次后柱条排序动画的时长
5. 如果想只显示前 _n_ 名，将 `yAxis.max` 设为 _n - 1_，否则显示所有柱条
6. `xAxis.max` 建议设为 `'dataMax'` 表示用数据的最大值作为 X 轴最大值，视觉效果更好
7. 如果想要实时改变标签，需要将 `series.label.valueAnimation` 设为 `true`
8. `animationDuration` 设为 `0`，表示第一份数据不需要从 `0` 开始动画（如果希望从 `0` 开始则设为和 `animationDurationUpdate` 相同的值）
9. `animationDurationUpdate` 建议设为 `3000` 表示每次更新动画时长，这一数值应与调用 `setOption` 改变数据的频率相同
10. 以 `animationDurationUpdate` 的频率调用 `setInterval`，更新数据值，显示下一个时间点对应的柱条排序

## 示例

完整的例子如下：

```js live
var data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // 只显示最大的2个柱条
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

function update() {
  var data = option.series[0].data;
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption(option);
}

setInterval(function() {
  update();
}, 3000);
```
