# 基础饼图

饼图主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。

## 最简单的饼图

饼图的配置和折线图、柱状图略有不同，不再需要配置坐标轴，而是把数据名称和值都写在系列中。以下是一个最简单的饼图的例子。

<!-- embed -->
```js
option = {
    series: [{
        type: 'pie',
        data: [{
            value: 335,
            name: '直接访问'
        }, {
            value: 234,
            name: '联盟广告'
        }, {
            value: 1548,
            name: '搜索引擎'
        }]
    }]
};
```

需要注意的是，这里是 `value` 不需要是百分比数据，ECharts 会根据所有数据的 `value` ，按比例分配它们在饼图中对应的弧度。


## 饼图样式设置

### 饼图的半径

饼图的半径可以通过 [`series.radius`](${optionPath}series-pie.radius) 设置，可以是诸如 `'60%'` 这样相对的百分比字符串，或是 `200` 这样的绝对像素数值。当它是百分比字符串时，它是相对于容器宽高中较小的一条边的。也就是说，如果宽度大于高度，则百分比是相对于高度的，反之则反；当它是数值型时，它表示绝对的像素大小。

<!-- embed -->
```js
option = {
    series: [{
        type: 'pie',
        data: [{
            value: 335,
            name: '直接访问'
        }, {
            value: 234,
            name: '联盟广告'
        }, {
            value: 1548,
            name: '搜索引擎'
        }],
        radius: '50%'
    }]
};
```

## 如果数据和为0，不显示饼图

在默认情况下，如果数据值和为 0，会显示平均分割的扇形。比如，如果有 4 个数据项，并且每个数据项都是 0，则每个扇形都是 90°。如果我们希望在这种情况下不显示任何扇形，可以将 [`series.stillShowZeroSum`](${optionPath}series-pie.stillShowZeroSum) 设为 `false`。

<!-- embed -->
```js
option = {
    series: [{
        type: 'pie',
        stillShowZeroSum: false,
        data: [{
            value: 0,
            name: '直接访问'
        }, {
            value: 0,
            name: '联盟广告'
        }, {
            value: 0,
            name: '搜索引擎'
        }]
    }]
};
```

如果希望扇形对应的标签也不显示，可以将 [`series.label.show`](${optionPath}series-pie.label.show) 设为 `false`。

<!-- embed -->
```js
option = {
    series: [{
        type: 'pie',
        stillShowZeroSum: false,
        label: {
            show: false
        }
        data: [{
            value: 0,
            name: '直接访问'
        }, {
            value: 0,
            name: '联盟广告'
        }, {
            value: 0,
            name: '搜索引擎'
        }]
    }]
};
```
