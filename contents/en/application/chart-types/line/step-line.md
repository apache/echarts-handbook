# Step Line Chart

The normal line chart connects two points by straight line directly, while the step line chart, also known as square wave chart, uses only horizontal and vertical lines to connect the nearby items together. Compared with the normal line chart, the step line chart significantly shows the sudden changes of analyzed data.

In ECharts, `step` is used to characterize the connection type of the step line chart.  It has three available values: `'start'`, `'end'`, and `'middle'`. For item A and B, these values corresponded that the corner occurred at A, B, and mid-point between A and B.


<!-- embed -->
```js
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Step Start',
        type: 'line',
        step: 'start',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Step Middle',
        type: 'line',
        step: 'middle',
        data: [220, 282, 201, 234, 290, 430, 410]
    },
    {
        name: 'Step End',
        type: 'line',
        step: 'end',
        data: [450, 432, 401, 454, 590, 530, 510]
    }]
};
```

> Please focus on the difference of line between three separate types.
