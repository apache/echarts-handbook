# Event and Action

Users can trigger corresponding events by their operation. The developer can handle the callback function by listening to these events, such as jump to a new website, pop-up a dialog box, or drill down the data.

The name of the event and the DOM event is both lowercase string. Here is an example of binding listening to `click` event.

```js
myChart.on('click', function(params) {
  // Print name in console
  console.log(params.name);
});
```

There are two kinds of event in ECharts, one happened when the user clicks the mouse or hover the elements in charts, the other happened while the user triggered some interactive actions. Such as ['legendselectchanged'](${mainSitePath}api.html#events.legendselectchanged) triggered while changing the legend selected (please notice that `legendselected` won't be triggered in this situation), ['datazoom'](${mainSitePath}api.html#events.legendselectchanged) triggered while zooming the data area.

## Handling the Mouse Events

ECharts support general mouse events: `'click'`, `'dblclick'`, `'mousedown'`, `'mousemove'`, `'mouseup'`, `'mouseover'`, `'mouseout'`, `'globalout'`, `'contextmenu'`. This is an example of opening the search result page after clicking the bar chart.

```js
// Init the ECharts base on DOM
var myChart = echarts.init(document.getElementById('main'));

// Config
var option = {
  xAxis: {
    data: [
      'Shirt',
      'Wool sweater',
      'Chiffon shirt',
      'Pants',
      'High-heeled shoes',
      'socks'
    ]
  },
  yAxis: {},
  series: [
    {
      name: 'Sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
// Use the option and data to display the chart
myChart.setOption(option);
// Click and jump to Baidu search website
myChart.on('click', function(params) {
  window.open(
    'https://www.google.com/search?q=' + encodeURIComponent(params.name)
  );
});
```

All mouse events included `params` which contained the data of the object.

Format:

```js
type EventParams = {
  // The component name clicked,
  // component type, could be 'series'、'markLine'、'markPoint'、'timeLine', etc..
  componentType: string,
  // series type, could be 'line'、'bar'、'pie', etc.. Works when componentType is 'series'.
  seriesType: string,
  // the index in option.series. Works when componentType is 'series'.
  seriesIndex: number,
  // series name, works when componentType is 'series'.
  seriesName: string,
  // name of data (categories).
  name: string,
  // the index in 'data' array.
  dataIndex: number,
  // incoming raw data item
  data: Object,
  // charts like 'sankey' and 'graph' included nodeData and edgeData as the same time.
  // dataType can be 'node' or 'edge', indicates whether the current click is on node or edge.
  // most of charts have one kind of data, the dataType is meaningless
  dataType: string,
  // incoming data value
  value: number | Array,
  // color of the shape, works when componentType is 'series'.
  color: string
};
```

Identify where the mouse clicked.

```js
myChart.on('click', function(params) {
  if (params.componentType === 'markPoint') {
    // Clicked on the markPoint
    if (params.seriesIndex === 5) {
      // clicked on the markPoint of the series with index = 5
    }
  } else if (params.componentType === 'series') {
    if (params.seriesType === 'graph') {
      if (params.dataType === 'edge') {
        // clicked at the edge of graph.
      } else {
        // clicked at the node of graph.
      }
    }
  }
});
```

Use `query` to trigger callback of the specified component:

```js
chart.on(eventName, query, handler);
```

`query` can be `string` or `Object`.

If it is `string`, the format can be `mainType` or `mainType.subType`, such as:

```js
chart.on('click', 'series', function () {...});
chart.on('click', 'series.line', function () {...});
chart.on('click', 'dataZoom', function () {...});
chart.on('click', 'xAxis.category', function () {...});
```

If it is `Object`, `query` can include more than one attribute:

```js
{
  ${mainType}Index: number // component index
  ${mainType}Name: string // component name
  ${mainType}Id: string // component id
  dataIndex: number // data item index
  name: string // data item name
  dataType: string // date item type, such as 'node', 'edge'
  element: string // name of element in custom series.
}
```

Such as:

```js
chart.setOption({
  // ...
  series: [
    {
      name: 'uuu'
      // ...
    }
  ]
});
chart.on('mouseover', { seriesName: 'uuu' }, function() {
  // when elements in series named 'uuu' triggered 'mouseover'
});
```

For example:

```js
chart.setOption({
  // ...
  series: [
    {
      // ...
    },
    {
      // ...
      data: [
        { name: 'xx', value: 121 },
        { name: 'yy', value: 33 }
      ]
    }
  ]
});
chart.on('mouseover', { seriesIndex: 1, name: 'xx' }, function() {
  // when data named 'xx' in series index 1 triggered 'mouseover'.
});
```

For example:

```js
chart.setOption({
  // ...
  series: [
    {
      type: 'graph',
      nodes: [
        { name: 'a', value: 10 },
        { name: 'b', value: 20 }
      ],
      edges: [{ source: 0, target: 1 }]
    }
  ]
});
chart.on('click', { dataType: 'node' }, function() {
  // call this method while the node of graph was clicked.
});
chart.on('click', { dataType: 'edge' }, function() {
  // call this method while the edge of graph was clicked.
});
```

For example:

```js
chart.setOption({
  // ...
  series: {
    // ...
    type: 'custom',
    renderItem: function(params, api) {
      return {
        type: 'group',
        children: [
          {
            type: 'circle',
            name: 'my_el'
            // ...
          },
          {
            // ...
          }
        ]
      };
    },
    data: [[12, 33]]
  }
});
chart.on('mouseup', { element: 'my_el' }, function() {
  // when data named 'my_el' triggered 'mouseup'.
});
```

You can display a popup, update the charts using the query result from your database by the data name or series name in the callback function. Here is an example:

```js
myChart.on('click', function(parmas) {
  $.get('detail?q=' + params.name, function(detail) {
    myChart.setOption({
      series: [
        {
          name: 'pie',
          // using pie chart to show the data distribution in one column.
          data: [detail.data]
        }
      ]
    });
  });
});
```

## Event of Component Interaction

All Component Interaction in ECharts will trigger a corresponding event. Normal events and parameters are listed in the [events](${mainSitePath}/api.html#events) document.

Here is an example of listening to legend event:

```js
// Show/hide the legend only trigger legendselectchanged event
myChart.on('legendselectchanged', function(params) {
  // State if legend is selected.
  var isSelected = params.selected[params.name];
  // print in the console.
  console.log(
    (isSelected ? 'Selected' : 'Not Selected') + 'legend' + params.name
  );
  // print for all legends.
  console.log(params.selected);
});
```

## Writing Code to Trigger Component Action Manually

You can trigger events such as `'legendselectchanged'` not only by the user but also with code manually. It can be used to display the tooltip, select the legend.

In ECharts `myChart.dispatchAction({ type: '' })` is used to trigger the behavior. This manages all actions and can record the behaviors conveniently.

Commonly used behavior and corresponding parameters are listed in [action](${mainSitePath}/api.html#action).

The following example shows how to highlight each sector one by one in the pie chart using `dispatchAction`.

```js [live]
option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [
      'Direct Access',
      'Email Marketing',
      'Affiliate Ads',
      'Video Ads',
      'Search Engines'
    ]
  },
  series: [
    {
      name: 'Access Source',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct Access' },
        { value: 310, name: 'Email Marketing' },
        { value: 234, name: 'Affiliate Ads' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

let currentIndex = -1;

setInterval(function() {
  var dataLen = option.series[0].data.length;
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
  currentIndex = (currentIndex + 1) % dataLen;
  myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
}, 1000);
```

## Listen to Events on the Blank Area

Sometimes developers need to listen to the events that are triggered from the blank of the canvas. For example, need to reset the chart when users click on the blank area.

Before we talk about this feature, we need to clarify two kinds of events: zrender events and echarts events.

```js
myChart.getZr().on('click', function(event) {
  // This listener is listening to a `zrender event`.
});
myChart.on('click', function(event) {
  // This listener is listening to a `echarts event`.
});
```

zrender events are different from echarts events. The former one are triggered when mouse/pointer is at everywhere, while the latter one can only be triggered when mouse/pointer is at the graphic elements. In fact, echarts events are implemented based on zrender events, that is, when a zrender events is triggered at a graphic element, echarts will trigger a echarts event.

Having zrender events, we can implement listen to events from the blank as follows:

```js
myChart.getZr().on('click', function(event) {
  // No "target" means that mouse/pointer is not on
  // any of the graphic elements, which is "blank".
  if (!event.target) {
    // Click on blank. Do something.
  }
});
```
