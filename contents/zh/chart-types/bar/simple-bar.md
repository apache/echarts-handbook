# 最简单的柱状图

柱状图（或称条形图）是一种通过柱形的高度（横向的情况下则是宽度）来表现数据大小的一种常用图表类型。

设置柱状图的方式，是将 `series` 的 `name` 设为 `'bar'`。最简单的柱状图可以这样设置：

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
```

在这个例子中，横坐标是类目型的，因此需要在 `xAxis` 中指定对应的值；而纵坐标是数值型的，可以根据 `series` 中的 `data`，自动生成对应的坐标范围。


## 多系列的柱状图

我们可以用一个系列表示一组相关的数据，如果需要实现多系列的柱状图，只需要在 `series` 多添加一项就可以了——

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }, {
        type: 'bar',
        data: [26, 24, 18, 22, 23, 20, 27]
    }]
};
```
