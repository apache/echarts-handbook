# Dataset

`dataset` is a component dedicated to manage data. Although you can set the data in `series.data` for every series, we recommend you use the `dataset` to manage the data since ECharts 4 so that the data can be reused by multiple components and convenient for the separation of "data and configs". After all, data is the most common part to be changed while other configurations will mostly not change at runtime.

## Define **data** under **series**

If data is defined under `series`, for example:

```js live
option = {
  xAxis: {
    type: 'category',
    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1]
    }
  ]
};
```

Defining `data` under `series` is suitable for customization for some special data structures such as "tree", "graph" and large data.
However, it is not conducive to the data sharing for multiple series as well as mapping arrangement of chart types and series based on the original data. The other disadvantage is that programmers always need to divide the data in separate series (and categories) first.

## Define **data** in **dataset**

Here are the advantages if you define `data` in `dataset`:

- Follow the ideas of data visualization: (I) Provide the data, (II)Mapping from data to visual to become a chart.
- Divide data from other configurations. The data often change but others not. It is
  Easy to manage separately.
- Data can be reused by several series or component, you don't need to create copies of a large amount of data for every series.
- Support more common data format, such as a 2D array, array of classes, etc., to avoid users from converting for data format to a certain extent.

Here is a simple `dataset` example:

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // Provide a set of data.
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  // Declare an x-axis (category axis).
  // The category map the first column in the dataset by default.
  xAxis: { type: 'category' },
  // Declare a y-axis (value axis).
  yAxis: {},
  // Declare several 'bar' series,
  // every series will auto-map to each column by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

Or try to use the "array of classes" format:

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // Define the dimension of array. In cartesian coordinate system,
    // if the type of x-axis is category, map the first dimension to
    // x-axis by default, the second dimension to y-axis.
    // You can also specify 'series.encode' to complete the map
    // without specify dimensions. Please see below.

    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

## Map from Data to Chart

The ideas of data visualization: (I) Provide the data, (II)Mapping from data to visual to become a chart.

In short, you can set these configs of mapping:

- Specify 'column' or 'row' of `dataset` to map the `series`. You can use [series.seriesLayoutBy](${optionPath}series.seriesLayoutBy) to configure it. The default is to map according to the column.
- Rule of specifying dimension mapping: how to mapping from dimensions of 'dataset' to `axis`, `tooltip`, `label` and `visualMap`. To configure the mapping, please use [series.encode](${optionPath}series.encode) and [visualMap](${optionPath}visualMap). The previous case did not give the mapping configuration so that ECharts will follow the default: if x-axis is category, mapping to the first row in `dataset.source`; three-column chart mapping with each row in `dataset.source` one by one.

The details of the configuration are shown below:

## Map Row or Column of **dataset** to **series**

Having the dataset, you can configure flexibly how the data map to the axis and series.

You can use `seriesLayoutBy` to change the understanding of row and column of the chart. `seriesLayoutBy` can be:

- `'column'`: Default value. The series are placed above the column of `dataset`.
- `'row'`: The series are placed above the row of `dataset`.

Check this case:

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
    ]
  },
  xAxis: [
    { type: 'category', gridIndex: 0 },
    { type: 'category', gridIndex: 1 }
  ],
  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  grid: [{ bottom: '55%' }, { top: '55%' }],
  series: [
    // These series will show in the first coordinate, each series map a row in dataset.
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    // These series will show in the second coordinate, each series map a column in dataset.
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 }
  ]
};
```

The effect of configuration is shown in [this case](${exampleEditorPath}dataset-series-layout-by).

## Dimension

Most of the data described in commonly used charts is a "two-dimensional table" structure, in the previous case, we use a 2D array to contain a two-dimensional table. Now, when we map a series to a column, that column was called a "dimension" and each row was called "item", vice versa.

The dimension can have their name to display in the chart. Dimension name can be defined in the first column (row). In the [next case](#map-from-data-to-charts-(series.encode)), `'score'`, `'amount'`, `'product'` are the name of dimensions. The actual data locate from the second row. ECharts will automatically check if the first column (row) contained dimension name in `dataset.source`. You can also use `dataset.sourceHeader: true` to declare that the first column (row) represents the dimension name.

Try to use single `dataset.dimensions` or some `series.dimensions` to define the dimensions, therefore you can specify the name and type together.

```js
var option1 = {
  dataset: {
    dimensions: [
      { name: 'score' },
      // can be abbreviated as 'string', to indicate dimension name
      'amount',
      // Specify dimensions in 'type'.
      { name: 'product', type: 'ordinal' }
    ],
    source: []
  }
  // ...
};

var option2 = {
  dataset: {
    source: []
  },
  series: {
    type: 'line',
    // series.dimensions will cover the config in dataset.dimension
    dimensions: [
      null, // use null if you do not want dimension name.
      'amount',
      { name: 'product', type: 'ordinal' }
    ]
  }
  // ...
};
```

In most cases, you don't need to define the dimension type because the ECharts will automatically judge it. If the judgment is inaccurate, you can define it manually.

Dimension type can be the following values:

- `'number'`: Default, normal data.
- `'ordinal'`: String types data like categories, text can be used on the axis only with the dimension type 'ordinal'. ECharts will try to judge this type automatically but might be inaccurate, so you can specify manually.
- `'time'`: To represent time data, ECharts can automatically analyze data as timestamp if the dimension type is defined as `'time'`. For instance, ECharts will auto-analyze if the data of this dimension is '2017-05-10'. If the dimension is used as time axis ([axis.type](${optionPath}xAxis.type) = `'time'`), the dimension type will also be `'time'`. See [data](${optionPath}series.data) for more time type support.
- `'float'`: Use `TypedArray` to optimize the performance in `'float'` dimension.
- `'int'`: Use `TypedArray` to optimize the performance in `'int'` dimension.

## Map from Data to Charts (series.encode)

After understand the concept of dimension, you can use [series.encode](${optionPath}series.encode) to make a mapping:

```js live
var option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, 'Matcha Latte'],
      [57.1, 78254, 'Milk Tea'],
      [74.4, 41032, 'Cheese Cocoa'],
      [50.1, 12755, 'Cheese Brownie'],
      [89.7, 20145, 'Matcha Cocoa'],
      [68.1, 79146, 'Tea'],
      [19.6, 91852, 'Orange Juice'],
      [10.6, 101852, 'Lemon Juice'],
      [32.7, 20112, 'Walnut Brownie']
    ]
  },
  xAxis: {},
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      encode: {
        // Map "amount" column to x-axis.
        x: 'amount',
        // Map "product" row to y-axis.
        y: 'product'
      }
    }
  ]
};
```

The basic structure of `series.encode` declaration:

- To the left of the colon: Specific name of axis or label.
- To the right of the colon: Dimension name (string) or number(int, count from 0), to specify one or several dimensions (using array).

Generally, the following info is not necessary to be defined. Fill in as needed.

Attribute suggested by `series.encode`

```js
// Supported in every coordinate and series:
encode: {
  // Display the value of dimension named "product" and "score" in tooltip.
  tooltip: ['product', 'score']
  // Connect dimension name of "Dimension 1" and "Dimension 3" as the series name. (Avoid to repeat longer names in series.name)
  seriesName: [1, 3],
  // Means to use the value in "Dimension 2" as the id. It makes the new and old data correspond by id
	// when using setOption to update data, so that it can show animation properly.
  itemId: 2,
  // The itemName will show in the legend of Pie Charts.
  itemName: 3
}

// Grid/cartesian coordinate unique configs:
encode: {
  // Map "Dimension 1", "Dimension 5" and "dimension named 'score'" to x-axis:
  x: [1, 5, 'score'],
  // Map "Dimension 0" to y-axis:
  y: 0
}

// singleAxis unique configs:
encode: {
  single: 3
}

// Polar coordinate unique configs:
encode: {
  radius: 3,
  angle: 2
}

// Geo-coordinate unique configs:
encode: {
  lng: 3,
  lat: 2
}

// For some charts without coordinate like pie chart, funnel chart:
encode: {
  value: 3
}
```

This is a richer [example](${exampleEditorPath}dataset-encode1) of `series.encode`.

## Default series.encode

It is worth mentioning that ECharts will use some default mapping rules for some general charts (line, bar, scatter, candlestick, etc.) if `series.encode` is not specified. The default rule is:

- In coordinate system (e.g. Cartesian, Polar):
  - If there is category axis ([axis.type](${optionPath}xAxis.type) = `'category'`), map the first column(row) to the axis and each subsequent column(row) to each series.
  - If both axes is not the category, then map every two columns in one series to two axes.
- Without axis (e.g. Pie Chart):
  - Use the first column(row) as the name, second column(row) as value. ECharts will not set the name if there is only one column(row).

While the default rule cannot fulfill the requirements, you can configure `encode` by yourself, which is not complicate. Here is an [example](${exampleEditorPath}dataset-default).

## Some Normal Settings of series.encode

Q: How to set the 3rd column as x-axis, 5th column as y-axis?

A:

```js
option = {
  series: {
    // dimensionIndex count from 0, so the 3rd line is dimensions[2].
    encode: { x: 2, y: 4 }
    // ...
  }
};
```

Q: How to set the 3rd row as x-axis, 5th row as y-axis?

A:

```js
option = {
  series: {
    encode: { x: 2, y: 4 },
    seriesLayoutBy: 'row'
    // ...
  }
};
```

Q: How to set the 2nd column as a label?

A:
We now support to trace value from specific dimension for [label.formatter](${optionPath}series.label.formatter):

```js
series: {
  label: {
    // `'{@score}'` means the value in the dimension named "score".
    // `'{@[4]}'` means the value in dimension 4.
    formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd';
  }
}
```

Q: How to show the 2nd and 3rd column in the tooltip?

A:

```js
option = {
  series: {
    encode: {
      tooltip: [1, 2]
      // ...
    }
    // ...
  }
};
```

Q: How to define the dimension name if is not included in the dataset?

A:

```js
var option = {
  dataset: {
    dimensions: ['score', 'amount'],
    source: [
      [89.3, 3371],
      [92.1, 8123],
      [94.4, 1954],
      [85.4, 829]
    ]
  }
};
```

Q: How to map the 3rd column to the size of the scatter chart?

A:

```js live
var option = {
  dataset: {
    source: [
      [12, 323, 11.2],
      [23, 167, 8.3],
      [81, 284, 12],
      [91, 413, 4.1],
      [13, 287, 13.5]
    ]
  },
  visualMap: {
    show: false,
    dimension: 2, // means the 3rd column
    min: 2, // lower bound
    max: 15, // higher bound
    inRange: {
      // Size of the bubble.
      symbolSize: [5, 60]
    }
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter'
  }
};
```

Q: I specified a mapping in encode, why it is not worked?

A: Check your spelling, such as misspell the dimension name `'Life Expectancy'` to `'Life Expectency'` in encode.

## Visual Channel Mapping

We can map visual channel by using [visualMap](${optionPath}visualMap). Check details in the [visualMap](${optionPath}visualMap) document. Here is an [example](${exampleEditorPath}dataset-encode0).

## Formats of Charts

In most of the normal chart, the data is suitable to be described in the form of a two-dimensional table. That well-known software like 'MS Excel' and 'Numbers' all uses a two-dimensional table. Their data can be exported to JSON format and input to `dataset.source` and avoid some steps of data processing.

> You can switch .csv file to JSON using tools like [dsv](https://github.com/d3/d3-dsv) or [PapaParse](https://github.com/mholt/PapaParse).

As the example shown behind, in the data transmission of JavaScript, the two-dimensional data can be stored directly by two-dimensional array.

Expect from the two-dimensional array, the dataset also supports using key-value which is also a common way. However, we don't support [seriesLayoutBy](${optionPath}series.seriesLayoutBy) in this format right now.

```js
dataset: [
  {
    // column by column key-value array is a normal format
    source: [
      { product: 'Matcha Latte', count: 823, score: 95.8 },
      { product: 'Milk Tea', count: 235, score: 81.4 },
      { product: 'Cheese Cocoa', count: 1042, score: 91.2 },
      { product: 'Walnut Brownie', count: 988, score: 76.9 }
    ]
  },
  {
    // row by row key-value
    source: {
      product: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
      count: [823, 235, 1042, 988],
      score: [95.8, 81.4, 91.2, 76.9]
    }
  }
];
```

## How to Reference Several Datasets

ECharts support to define several datasets at the same moment. Series can assign the one to reference by [series.datasetIndex](${optionPath}series.datasetIndex). For example:

```js
var option = {
  dataset: [
    {
      // 1st Dataset
      source: []
    },
    {
      // 2nd Dataset
      source: []
    },
    {
      // 3rd Dataset
      source: []
    }
  ],
  series: [
    {
      // Use 2nd dataset
      datasetIndex: 1
    },
    {
      // Use 1st dataset
      datasetIndex: 0
    }
  ]
};
```

## series.data in ECharts 3

ECharts 4 still supports the data declaration way in ECharts 3. If the series has already declared the [series.data](${optionPath}series.data), then use [series.data](${optionPath}series.data) but not `dataset`.

```js
option = {
  xAxis: {
    type: 'category',
    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1]
    }
  ]
};
```

In fact, [series.data](${optionPath}series.data) is an important setting method which will always exist. Some special non-table format chart like [treemap](${optionPath}series-treemap), [graph](${optionPath}series-graph) and [lines](${optionPath}series-lines) still cannot be edit in dataset, you still need to use [series.data](${optionPath}series.data). In another way, for render huge amount of data (over a million), you need to use [appendData](${mainSitePath}api.html#echartsInstance.appendData) which is not supported by `dataset`.

## Others

The following charts now support dataset:
`line`, `bar`, `pie`, `scatter`, `effectScatter`, `parallel`, `candlestick`, `map`, `funnel`, `custom`.
ECharts will support more charts in the future.

In the end, here is an [example](${exampleEditorPath}dataset-link) of several charts shared one `dataset` with linkage interaction.
