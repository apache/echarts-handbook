# 基础折线图

柱状图（或称条形图）是一种通过柱形的长度来表现数据大小的一种常用图表类型。

## 最简单的折线图

如果我们想建立一个横坐标是类目型（category）、纵坐标是数值型（value）的折线图，我们可以使用这样的方式：

<!-- embed -->
```js
option = {
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150],
        type: 'line'
    }]
};
```

在这个例子中，我们通过 `xAxis` 将横坐标设为类目型，并指定了对应的值；通过 `type` 将 `yAxis` 的类型设定为数值型。在 `series` 中，我们将系列类型设为 `line`，并且通过 `data` 指定了折线图三个点的取值。这样，就能得到一个最简单的折线图了。

> 这里 `xAxis` 和 `yAxis` 的 `type` 属性都可以隐去不写。因为坐标轴的默认类型是数值型，而 `xAxis` 指定了类目型的 `data`，所以 `ECharts` 也能识别出这是类目型的坐标轴。为了让大家更容易理解，我们特意写了 `type`。在实际的应用中，如果是 `'value'` 类型，也可以省略不写。


## 笛卡尔坐标系中的折线图

如果我们希望折线图在横坐标和纵坐标上都是连续的，即在笛卡尔坐标系中，应该如何实现呢？答案也很简单，只要把 `series` 的 `data` 每个数据用一个包含两个元素的数组表示就行了。

<!-- embed -->
```js
option = {
    xAxis: {},
    yAxis: {},
    series: [{
        data: [[20, 120], [50, 200], [40, 50]],
        type: 'line'
    }]
};
```


## 折线图样式设置

### 折线的样式

折线图中折线的样式可以通过 `lineStyle` 设置。可以为其指定颜色、线宽、折线类型、阴影、不透明度等等，具体的可以参考配置项手册 [`series.lineStyle`](${optionPath}series-line.lineStyle) 了解。这里，我们以设置颜色（color）、线宽（width）和折线类型（type）为例说明。

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
        lineStyle: {
            normal: {
                color: 'green',
                width: 4,
                type: 'dashed'
            }
        }
    }]
};
```

这里设置折线宽度时，数据点描边的宽度是不会跟着改变的，而应该在数据点的配置项中另外设置。

### 数据点的样式

数据点的样式可以通过 [`series.itemStyle`](${optionPath}series-line.itemStyle) 指定填充颜色（color）、描边颜色（borderWidth）、描边宽度（borderWidth）、描边颜色（borderColor）、阴影（shadowColor）、不透明度（opacity）等。与折线样式的设置十分相似，这里不再展开说明。


## 在数据点处显示数值

在系列中，这数据点的通过 [`series.label`](${optionPath}series-line.label) 属性指定。如果将 `label` 下的 `show` 指定为`true`，则表示该数值默认时就显示；如果为 `false`，而 [`series.emphasis.label.show`](${optionPath}series-line.emphasis.label.show) 为 `true`，则表示只有在鼠标移动到该数据时，才显示数值。

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
        label: {
            show: true,
            position: 'bottom',
            textStyle: {
                fontSize: 20
            }
        }
    }]
};
```


## 空数据

在一个系列中，可能一个横坐标对应的取值是“空”的，将其设为 0 有时并不能满足我们的期望--空数据不应被其左右的数据连接。

在 ECharts 中，我们使用字符串 `'-'` 表示空数据，这对其他系列的数据也是适用的。

<!-- embed -->
```js
option = {
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [{
        data: [0, 22, '-', 23, 19],
        type: 'line'
    }]
};
```

> 注意区别这个例子中，“空”数据与取值为 0 的数据。
