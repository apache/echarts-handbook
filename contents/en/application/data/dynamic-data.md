# Asynchronous Data Loading and Dynamic Update


## Asynchronous Loading

Data in [Getting Started Example](~getting-started) is directly updated by using `setOption`. But in many cases, data need to be filled by asynchronous loading frequently. `ECharts` can implement asynchronous loading in a simple way. You can get data asynchronously through a function such as jQuery and use `setOption` to fill in data and configs after the chart initialized.

```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function (data) {
    // Structure of data:
    // {
    //     categories: ["Shirt","Wool sweater","Chiffon shirt","Pants","High-heeled shoes","socks"],
    //     values: [5, 20, 36, 10, 10, 20]
    // }
    myChart.setOption({
        title: {
            text: 'Asynchronous Loading Example'
        },
        tooltip: {},
        legend: {},
        xAxis: {
            data: data.categories
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: data.values
        }]
    });
});
```

Or display empty axes with all styles defined before fill in the data:

```js
var myChart = echarts.init(document.getElementById('main'));
// Show title, legends and empty axes
myChart.setOption({
    title: {
        text: 'Asynchronous Loading Example'
    },
    tooltip: {},
    legend: {
        data:['Sales']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: 'Sales',
        type: 'bar',
        data: []
    }]
});

// Asynchronous Data Loading
$.get('data.json').done(function (data) {
    // Fill in the data
    myChart.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // Find series by name
            name: 'Sales',
            data: data.data
        }]
    });
});
```

For example:

<iframe src="${exampleViewPath}doc-example/tutorial-async&edit=1&reset=1" width="400" height="300"></iframe>

You need to use `name` to "navigate" ECharts when updating data. In the previous example, the chart can update normally depending on the order of series, but we recommend you to add the `name` data while updating data.

## loading animation

When it takes a long time to load the data, the user is facing the empty chart with only axes will wonder if there are bugs appear.

ECharts have a simple loading animation by default. You can call [showLoading](api.html#echartsInstance.showLoading) to display. When the data loading was completed, call [hideLoading](api.html#echartsInstance.hideLoading) to hide the animation.


```js
myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```

Here is the effect:

<iframe src="${exampleViewPath}doc-example/tutorial-loading&edit=1&reset=1" width="400" height="300"></iframe>

## Dynamic Update

ECharts was driven by data, change in data will drive changes in the presentation of the chart. Therefore, It's surprisingly simple to implement a dynamic update.

All data's update was implemented by [setOption](~api.html#echartsInstance.setOption). You only need to fetch the data periodically. ECharts will find the difference between two groups of data to use the proper way to choose the animation.

Check the following example.

<iframe src="${exampleViewPath}doc-example/tutorial-dynamic-data&edit=1&reset=1" width="400" height="300"></iframe>