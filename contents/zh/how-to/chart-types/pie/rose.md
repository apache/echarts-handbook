# 南丁格尔图（玫瑰图）

南丁格尔图又称玫瑰图，通常用弧度相同但半径不同的扇形表示各个类目。

ECharts 可以通过将饼图的 [`series.roseType`](${optionPath}series-pie.roseType) 值设为 `'area'` 实现南丁格尔图，其他配置项和饼图是相同的。

```js live
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
上面是最基本的南丁格尔图,有时候,我们希望不同的标签,展示的方式不太一样

比如:最大的扇形,标签要在里面,那我们可以修改 [`series.data.label`](${optionPath}series-pie.data.label) 来进行单独控制

```js live
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
          name: 'E',
          label:{
              position:'inside'
        }
      ],
      roseType: 'area'
    }
  ]
};
