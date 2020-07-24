# Area Line Chart

The area line chart fills the space between the line and axis with the background color, to express the data by the size of the area. Compared with the normal line chart, the area line chart has more intuitive visual effects. It is especially suitable for the scenario with a few series.

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
        areaStyle: {}
    }, {
        data: [25, 14, 23, 35, 10],
        type: 'line',
        areaStyle: {
            color: '#ff0',
            opacity: 0.5
        }
    }]
};
```

If you want to change the area style of the line chart, try to use [`areaStyle`](${optionPath}series-line.areaStyle). Set `areaStyle` to `{}` to use the default type: use the color of series to fill the area in translucent. If you want to change the type, try to override the configuration items in `areaStyle`. For example, the color of the second series was changed to yellow with 50% opacity.