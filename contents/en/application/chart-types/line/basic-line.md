# Basic Line Chart

柱状图（或称条形图）是一种通过柱形的长度来表现数据大小的一种常用图表类型。

## Simple Example

We can use the following code to build a line chart which has x-axis as `category`, y-axis as `value`: 

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

In this case, we set the type of axis to `category` and `value` under `xAxis` and `yAxis`. We also clarified the content on the x-axis through `data`. In `series`, we set the type to `line`, and specify the values of three points through `data`. In this way, we got a simple line chart.

>The `type` here can be omitted because the defaults of the axis are `value` while `xAxis` has specified the category's `data`. In this case, `ECharts` can recognize that this is a category axis. 


## Line Chart in Cartesian Coordinate System

How to implement if we want the line chart to be continuous? The answer is simple, as long as every value in `data` of the `series` is represented by an array containing two elements.

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


## Customized Line Chart

### Line Style

Line style can be changed by `lineStyle` setting. You can specify color, line width, polyline type and opacity etc.. For details, please see the handbook [`series.lineStyle`](${optionPath}series-line.lineStyle) to figure out.

Here is an example of setting color, line width, and type.


<!-- embed -->
```js q q
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

When we set the line width here, the line width of items will not change. The line style of items needs to be set separately.


### Item Style
Item style can be change by [`series.itemStyle`](${optionPath}series-line.itemStyle). It included `color`, `borderColor`, `borderStyle`, `borderWidth`, `borderType`, `shadowColor`, `opacity` and so on. It works the same as the `lineType`, so we will not do further discuss.


## Display Value on Items.

In the series, the label of the item was specified by [`series.label`](${optionPath}series-line.label). If we change the `show` under `label` to `true`, the value will be displayed by default. Otherwise, if [`series.emphasis.label.show`](${optionPath}series-line.emphasis.label.show) is `true`, the label will show only if the mouse moved across the item.


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


## Empty Data

In a `series`, there are empty data. It has some difference with `0`. While there are empty elements, the lines chart will ignore that point without pass through it----empty elements will not be connected by the points next by.

In ECharts, we use `'-'` to represent null data, It is applicable for data in other series.


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
```>                                                                                                                                                                                                                                 
> Please note the difference between the empty data and 0.
