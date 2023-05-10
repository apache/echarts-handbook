# Dynamic Sorting Bar Chart

## Related Options

Bar race is a chart that shows changes in the ranking of data over time and it is supported by default since ECharts 5.

> Bar race charts usually use horizontal bars. If you want to use vertical bars, just take the X axis and Y axis in this tutorial to the opposite.

1. Set `realtimeSort` of the bar series to be `true` to enable bar race
2. Set `yAxis.inverse` to be `true` to display longer bars at top
3. `yAxis.animationDuration` is suggested to be set to be `300` for bar reordering animation for the first time
4. `yAxis.animationDurationUpdate` is suggested to be set to be `300` for bar reordering animation for later times
5. Set `yAxis.max` to be _n - 1_ where _n_ is the number of bars to be displayed; otherwise, all bars are displayed
6. `xAxis.max` is suggested to be set to be `'dataMax'` so that the maximum of data is used as X maximum.
7. If realtime label changing is required, set `series.label.valueAnimation` to be `true`
8. Set `animationDuration` to be `0` so that the first animation doesn't start from 0; if you wish otherwise, set it to be the same value as `animationDurationUpdate`
9. `animationDurationUpdate` is suggested to be set to be `3000` for animation update duration, which should be the same as the frequency of calling `setOption`
10. Call `setOption` to update data to be of next time with `setInterval` at the frequency of `animationDurationUpdate`

## Demo

A complete demo:

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
    max: 2 // only the largest 3 bars will be displayed
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
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

function run() {
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

setTimeout(function() {
  run();
}, 0);
setInterval(function() {
  run();
}, 3000);
```
