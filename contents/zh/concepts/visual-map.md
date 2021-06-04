# 数据的视觉映射

数据可视化是数据到视觉元素的映射过程（这个过程也可称为视觉编码，视觉元素也可称为视觉通道）。

ECharts 的每种图表本身就内置了这种映射过程，比如折线图把数据映射到“线”，柱状图把数据映射到“长度”。一些更复杂的图表，如关系图、事件河流图、树图也都会做出各自内置的映射。

此外，ECharts 还提供了 [visualMap 组件](${optionPath}visualMap) 来提供通用的视觉映射。`visualMap` 组件中可以使用的视觉元素有：

- 图形类别（symbol）、图形大小（symbolSize）
- 颜色（color）、透明度（opacity）、颜色透明度（colorAlpha）、
- 颜色明暗度（colorLightness）、颜色饱和度（colorSaturation）、色调（colorHue）

下面对 `visualMap` 组件的使用方式进行简要的介绍。

## 数据和维度

ECharts 中的数据，一般存放于 [`series.data`](${optionPath}series.data) 中。根据图表类型不同，数据的具体形式也可能有些许差异。比如可能是“线性表“、“树“、“图“等。但他们都有个共性：都是“数据项（dataItem）“的集合。每个数据项含有“数据值（value）“和其他信息（如果需要的话）。每个数据值，可以是单一的数值（一维）或者一个数组（多维）。

例如，[series.data](${optionPath}series.data) 最常见的形式，是“线性表“，即一个普通数组：

```js
series: {
  data: [
    {
      // 这里每一个项就是数据项（dataItem）
      value: 2323, // 这是数据项的数据值（value）
      itemStyle: {}
    },
    1212, // 也可以直接是 dataItem 的 value，这更常见。
    2323, // 每个 value 都是“一维“的。
    4343,
    3434
  ];
}
```

```js
series: {
  data: [
    {
      // 这里每一个项就是数据项（dataItem）
      value: [3434, 129, '圣马力诺'], // 这是数据项的数据值（value）
      itemStyle: {}
    },
    [1212, 5454, '梵蒂冈'], // 也可以直接是 dataItem 的 value，这更常见。
    [2323, 3223, '瑙鲁'], // 每个 value 都是“三维“的，每列是一个维度。
    [4343, 23, '图瓦卢'] // 假如是“气泡图“，常见第一维度映射到x轴，
    // 第二维度映射到y轴，
    // 第三维度映射到气泡半径（symbolSize）
  ];
}
```

在图表中，往往默认把 value 的前一两个维度进行映射，比如取第一个维度映射到 x 轴，取第二个维度映射到 y 轴。如果想要把更多的维度展现出来，可以借助 `visualMap`。最常见的情况，[散点图（scatter）](${optionPath}series-scatter) 使用半径展现了第三个维度。

## visualMap 组件

visualMap 组件定义了把数据的*哪个维度*映射到*什么视觉元素上*。

现在提供如下两种类型的 visualMap 组件，通过 [visualMap.type](${optionPath}visualMap.type) 来区分。

其定义结构例如：

```js
option = {
  visualMap: [
    // 可以同时定义多个 visualMap 组件。
    {
      // 第一个 visualMap 组件
      type: 'continuous' // 定义为连续型 visualMap
      // ...
    },
    {
      // 第二个 visualMap 组件
      type: 'piecewise' // 定义为分段型 visualMap
      // ...
    }
  ]
  // ...
};
```

## 连续型与分段型视觉映射组件

ECharts 的视觉映射组件分为连续型（[visualMapContinuous](${optionPath}visualMap-continuous)）与分段型（[visualMapPiecewise](${optionPath}visualMap-piecewise)）。

连续型的意思是，进行视觉映射的数据维度是连续的数值；而分段型则是数据被分成了多段或者是离散型的数据。

### 连续型视觉映射

连续型视觉映射通过指定最大值、最小值，就可以确定视觉映射的范围。

```js
option = {
  visualMap: [
    {
      type: 'piecewise',
      min: 0,
      max: 5000,
      dimension: 3, // series.data 的第四个维度（即 value[3]）被映射
      seriesIndex: 4, // 对第四个系列进行映射。
      inRange: {
        // 选中范围中的视觉配置
        color: ['blue', '#121122', 'red'], // 定义了图形颜色映射的颜色列表，
        // 数据最小值映射到'blue'上，
        // 最大值映射到'red'上，
        // 其余自动线性计算。
        symbolSize: [30, 100] // 定义了图形尺寸的映射范围，
        // 数据最小值映射到30上，
        // 最大值映射到100上，
        // 其余自动线性计算。
      },
      outOfRange: {
        // 选中范围外的视觉配置
        symbolSize: [30, 100]
      }
    }
    //    ...
  ]
};
```

其中，[visualMap.inRange](${optionPath}visualMap.inRange) 表示在数据映射范围内的数据采用的样式；而 [visualMap.outOfRange](${optionPath}visualMap.outOfRange) 则指定了超出映射范围外的数据的样式。

[visualMap.dimension](~visualMap.dimension) 则指定了将数据的哪个维度做视觉映射。

### 分段型视觉映射

分段型视觉映射组件有三种模式：

- 连续型数据平均分段：依据 [visualMap-piecewise.splitNumber](${optionPath}visualMap-piecewise.splitNumber) 来自动平均分割成若干块。
- 连续型数据自定义分段：依据 [visualMap-piecewise.pieces](${optionPath}visualMap-piecewise.pieces) 来定义每块范围。
- 离散数据（类别性数据）：类别定义在 [visualMap-piecewise.categories](${optionPath}visualMap-piecewise.categories) 中。

使用分段型视觉映射时，需要将 `type` 设为 `'piecewise'`，并且将上面的三个配置项选其一配置即可，其他配置项类似连续型视觉映射。
