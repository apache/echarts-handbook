# Rose Chart（Nightingale Chart）

Rose Chart, which was also called the nightingale chart, usually indicates categories by sector of the same radius but different radius.

ECharts can implement Rose Chart by defining [`series.roseType`](${optionPath}series-pie.roseType) of pie chart to `'area'`. All other configs are the same as a basic pie chart.

```js [live]
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 100,
          name: 'A'
        },
        {
          value: 200,
          name: 'B'
        },
        {
          value: 300,
          name: 'C'
        },
        {
          value: 400,
          name: 'D'
        },
        {
          value: 500,
          name: 'E'
        }
      ],
      roseType: 'area'
    }
  ]
};
```
