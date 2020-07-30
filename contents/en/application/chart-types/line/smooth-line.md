# Smooth Line Chart

The smooth line chart is also a variant of the basic line graph. It is a better choice for you to perform a comfort visual experience. While using the ECharts, you only need to change the `smooth` to `true` to achieve this effect.

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
