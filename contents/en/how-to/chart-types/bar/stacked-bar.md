# Stacked Bar Chart

Sometimes, we hope to not only figure series separately but also the trend of the sum. It's a good choice to implement it by using the stacked bar chart. As the name suggests, in the stacked bar chart, data in the same category will be stacked up in one column. The overall height of the bar explained the change of total.

There is a simple way to implement a stacked bar chart by ECharts. You need to set the same string type value for a group of series in `stack`. The series with the same `stack` value will be in the same category.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x'
    }
  ]
};
```

In this case, the position of the second series is based on the position of the first series, the height increased is corresponding to the first series' height. Therefore, from the position of the second series, you can find the changing trend of the sum of the two.

> The value of `stack` explained what series will be stacked up together. Theoretically, the specific value of 'stack' is meaningless. However, we prefer some suggestive strings for the convenience of reading.
>
> For instance, here is a chart with 4 series that counted the amount of male and female. "adult male" and "boy" need to be stacked while "adult female" and "girl" need to be stacked. In this case, the suggestive value of `stack` is `'male'` and `'female'`. Although meaningless strings like `'a'` and `'b'` can achieve the same effect but the code will have worse readability.
