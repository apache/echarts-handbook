# Doughnut Chart

Doughnut charts are also used to show the proportion of values compared with the total. Different from the pie chart, the blank in the middle of the chart can be used to provide some extra info. It makes a doughnut chart commonly used chart type.

## Basic Doughnut Chart

In ECharts, the radius of the pie chart could also be an array with 2 elements. Every element in the array could be string or value. The first element represents the inner radius while the second one is the outer radius.

The pie chart, from this perspective, is a subset of the doughnut chart that has inner radius equals to 0.

```js live
option = {
  title: {
    text: 'A Case of Doughnut Chart',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'A'
        },
        {
          value: 234,
          name: 'B'
        },
        {
          value: 1548,
          name: 'C'
        }
      ],
      radius: ['40%', '70%']
    }
  ]
};
```

If we set one radius to string of a percentage value, while the other to a value, the inner radius will be smaller than the outer radius in some resolution. ECharts will choose the smaller element for the inner radius automatically. However, it will still cause not an unexpected outcome.

## Show Text In Middle Of Doughnut From Highlighted Sector

The previous case gives you a way to show fixed text in the middle of doughnut chart. The next case will show you how to display the corresponding text of the sector highlighted by the mouse. The general idea is to fix `label` in the middle of the chart while hiding `label` in default.

```js live
option = {
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' }
      ]
    }
  ]
};
```

In this case, `avoidLabelOverlap` is used to control whether ECharts adjust the position of label to avoid overlaps. Default value of `avoidLabelOverlap` is `true`. We want the label to be fixed in the middle so that we need to define it as `false`.

Therefore, the middle of doughnut chart will show the `name` of the highlighted sector.
