# Stacked Line Chart

Similar to the [Stacked Bar Chart](./zh/application_chart-types_bar_stacked-bar), Stacked Line Chart use the `'stack'` in `series` to decide which series should be stacked together.

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [{
        data: [10, 22, 28, 43, 49],
        type: 'line',
        stack: 'x'
    }, {
        data: [5, 4, 3, 5, 10],
        type: 'line',
        stack: 'x'
    }]
};
```

However, without clarification, it is hard for us to judge whether it is a stacked line chart or normal line chart. Therefore, filling color for the area under the line is recommended to indicate for a stacked bar chart.

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [{
        data: [10, 22, 28, 43, 49],
        type: 'line',
        stack: 'x',
        areaStyle: {}
    }, {
        data: [5, 4, 3, 5, 10],
        type: 'line',
        stack: 'x',
        areaStyle: {}
    }]
};
```
