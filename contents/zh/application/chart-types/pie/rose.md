# 南丁格尔图（玫瑰图）

南丁格尔图又称玫瑰图，通常用弧度相同但半径不同的扇形表示各个类目。

ECharts 可以通过将饼图的 [`series.roseType`](${optionPath}series-pie.roseType) 值设为 `'area'` 实现南丁格尔图，其他配置项和饼图是相同的。

<!-- embed -->
```js
option = {
    series: [{
        type: 'pie',
        data: [{
            value: 100,
            name: 'A'
        }, {
            value: 200,
            name: 'B'
        }, {
            value: 300,
            name: 'C'
        }, {
            value: 400,
            name: 'D'
        }, {
            value: 500,
            name: 'E'
        }],
        roseType: 'area'
    }]
};
```
