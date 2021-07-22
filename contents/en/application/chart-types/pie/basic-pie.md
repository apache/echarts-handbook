# Basic Pie Chart

Pie charts are mainly used to show the proportion of several categories compared with the total. The radians represent the proportion of each category.

## Simple Example

The config of the pie chart is not completely the same as the line chart and bar chart. There is no need to configure the axis. The name and value of data need to be defined in the series. Let's begin with a basic pie chart:

```js [live]
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'Direct Visit'
        },
        {
          value: 234,
          name: 'Union Ad'
        },
        {
          value: 1548,
          name: 'Search Engine'
        }
      ]
    }
  ]
};
```

To be mentioned, the `value` here does not need to be percentage data. ECharts will proportionately distribute their corresponding radians in the pie chart depending on all the data.

## Customized Pie Chart

### Radius of Pie Chart

The radius of pie chart can be defined by [`series.radius`](${optionPath}series-pie.radius). Both percent string(`'60%'`) and absolute pixel string(`'200'`) are available. While it is a percent string, it is proportional related to the shorter container(`'div'`) edge.

```js [live]
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'Direct Visit'
        },
        {
          value: 234,
          name: 'Union Ad'
        },
        {
          value: 1548,
          name: 'Search Engine'
        }
      ],
      radius: '50%'
    }
  ]
};
```

## Hide Chart While Data Sum is 0

By default, if the data sum is 0, the series will divide the shape equally. For instance, if you don't want to show any shape while all 4 series have value equals 0, you could define [`series.stillShowZeroSum`](${optionPath}series-pie.stillShowZeroSum) to `false`.

```js [live]
option = {
  series: [
    {
      type: 'pie',
      stillShowZeroSum: false,
      data: [
        {
          value: 0,
          name: 'Direct Visit'
        },
        {
          value: 0,
          name: 'Union Ad'
        },
        {
          value: 0,
          name: 'Search Engine'
        }
      ]
    }
  ]
};
```

If you are willing to hide the label as well, define the [`series.label.show`](${optionPath}series-pie.label.show) to `false` as well.

```js [live]
option = {
    series: [{
        type: 'pie',
        stillShowZeroSum: false,
        label: {
            show: false
        }
        data: [{
            value: 0,
            name: 'Direct Visit'
        }, {
            value: 0,
            name: 'Union Ad'
        }, {
            value: 0,
            name: 'Search Engine'
        }]
    }]
};
```
