# Data Transition

Apache ECharts<sup>TM</sup> will apply transition on the position, scale, shape when adding, updating and removing data. It makes the chart smoother and shows relationships between data better. Often the developer does not need to worry about how to use the animations, but simply uses `setOption` to update the data, and ECharts will find the difference between the last data and automatically apply the most appropriate transition animation.

For example, the following example shows the transition on a timed update of the pie chart data.

```js live {layout: 'lr'}
function makeRandomData() {
  return [
    {
      value: Math.random(),
      name: 'A'
    },
    {
      value: Math.random(),
      name: 'B'
    },
    {
      value: Math.random(),
      name: 'C'
    }
  ];
}
option = {
  series: [
    {
      type: 'pie',
      radius: [0, '50%'],
      data: makeRandomData()
    }
  ]
};

setInterval(() => {
  myChart.setOption({
    series: {
      data: makeRandomData()
    }
  });
}, 2000);
```

## Configuration of Transitions

Because adding and updating data will often require different animations, for example we would expect the data update animation to be shorter, ECharts distinguishes between the two animation configurations.

- For adding data, we apply an enter animation, using `animationDuration`, `animationEasing`, and `animationDelay` to configure the duration, easing and delay of the animation respectively.
- For updating data, we will apply an update animation with `animationDurationUpdate`, `animationEasingUpdate`, and `animationDelayUpdate` configuring the duration, easing and delay of the animation respectively.

As you can see, the update animation configuration is the enter animation configuration with the `Update` suffix.

> Each time using setOption in ECharts, the data will be diffed to the last updated data and three states are performed for the data based on the diff result: add, update and remove. This diff is based on the `name` of the data, for example, if the last update had three `names` of `'A'`, `'B'`, `'C'`, and the new update has become `'B'`, `'C'`, `'D'`, then the data `'B'`, `'C'` will be updated, the data `'A'` will be removed, and the data `' D'` will be added. If it is the first time `setOption`, because there is no old data, all data will be added. Depending on the three states ECharts will apply entry animation, update animation and leave animation respectively.

All these configurations can be set at the top level of `option` for all series and components, or separately for each series.

If we want to turn off animations, we can simply set `option.animation` to `false`.

### Animation Duration

`animationDuration` and `animationDurationUpdate` are used to set the duration of the animation in `ms`. Setting a longer animation duration allows the user to see the effect of the transition animation more clearly, but we also need to be careful that too much time can make the user lose patience while waiting animation to be finished.

A setting of `0` will turn the animation off, and this can be achieved by setting the corresponding configuration to `0` individually when we only want to turn off the enter animation or update animation.

### Animation Easing

The `animationEasing` and `animationEasingUpdate` configuration items are used to set the animation's easing function, which is a function that inputs the animation time and outputs the animation progress.

```ts
(t: number) => number;
```

The common animation easing functions such as `'cubicIn'` and `'cubicOut'` are built into ECharts and can be used directly

Built-in easing functions.

<md-example src="line-easing" width="100%" height="400" />

### Animation Delay

The `animationDelay` and `animationDelayUpdate` are used to set the time at which the animation delay starts, usually we will use a callback function to set different delays for different data to achieve the effect of staggered animations:

```ts live { layout: 'lr' }
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('A' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
option = {
  legend: {
    data: ['bar', 'bar2']
  },
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      data: data1,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10;
      }
    },
    {
      name: 'bar2',
      type: 'bar',
      data: data2,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10 + 100;
      }
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function(idx) {
    return idx * 5;
  }
};
```

## Performance Optimization of Animations

When the amount of data is particularly large, running animation can have performance issue, so we can set `animation: false` to turn off animation.

For charts where the amount of data changes dynamically, we recommend using the `animationThreshold` configuration, which allows ECharts to automatically turn off animation when the number of graphs in the canvas exceeds this threshold to improve drawing performance. This is often an empirical value, and ECharts is usually capable of rendering thousands of graphs in real time (our default value is also given as 2000), but if your charts are complex, or your user environment is harsh and there is a lot of other complex code running on the page at the same time, it may be appropriate to adjust this value downwards to ensure the smoothness of the whole application.

## Listening to the End of Animation

Sometimes we want to get the result of the current rendering, if no animation is used, ECharts will perform the rendering directly after `setOption` and we can use `getDataURL` method to get the rendering result synchronisely.

```ts
const chart = echarts.init(dom);
chart.setOption({
  animation: false
  //...
});
// can be executed directly and synchronously
const dataUrl = chart.getDataURL();
```

But if the chart is animated, executing `getDataURL` right away will give us the picture at the beginning of the animation, not the final result. So we need to know when the animation has finished and then execute `getDataURL` to get the result.

If you are sure of the duration of the animation, a simpler and more brutal way is to delay the execution with `setTimeout` depending on the duration of the animation:

```ts
chart.setOption({
  animationDuration: 1000
  //...
});
setTimeout(() => {
  const dataUrl = chart.getDataURL();
}, 1000);
```

Alternatively, we can use the `rendered` event provided by ECharts to determine that the ECharts have finished animating and stopped rendering

```ts
chart.setOption({
  animationDuration: 1000
  //...
});

function onRendered() {
  const dataUrl = chart.getDataURL();
  // ...
  // This event will also be triggered if there is a subsequent interaction and the interaction is redrawn, so it needs to be removed when you're done using it
  chart.off('rendered', onRendered);
}
chart.on('rendered', onRendered);
```
