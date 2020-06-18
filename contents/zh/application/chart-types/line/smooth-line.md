# 平滑曲线图

平滑曲线图也是折线图的一种变形，这种更柔和的样式也是一种不错的视觉选择。使用时，只需要将折线图系列的 `smooth` 属性设置为 `true` 即可。

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [{
        data: [10, 22, 28, 23, 19],
        type: 'line',
        smooth: true
    }]
};
```
