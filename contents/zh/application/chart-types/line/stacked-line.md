# 堆叠折线图

与[堆叠柱状图](./zh/application/chart-types/bar/stacked-bar)类似，堆叠折线图也是用系列的 `stack` 设置哪些系列堆叠在一起。

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ]
};
```

但是不同的是，如果不加说明的话，我们很难判断出这是一个堆叠折线图，还是一个普通的折线图。所以，对于堆叠折线图而言，一般建议使用区域填充色以表明堆叠的情况。

```js [live]
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    }
  ]
};
```
