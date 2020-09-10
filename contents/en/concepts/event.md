# Event and Behavior

Users can trigger corresponding events by their operation. The developer can handle the callback function by mentoring these events, such as jump to a new website, pop-up a dialog box, or drill down the data. 

In ECharts 3, you should use [on](${mainSitePath}api.html#EChartsInstance.on) method to bond events as same as in ECharts 2. However, the event name is simpler than in ECharts 2. The name of the event and the DOM event is both non-capitalized string. Here is an example of bonding `Click` function. 

```js
myChart.on('click', function (params) {
    // Print name in console
    console.log(params.name);
});
```

There are two kinds of event in ECharts, one happened when the user clicks the mouse or hover the shape in charts, the other happened while the user triggered some interactive language. Such as ['legendselectchanged'](${mainSitePath}api.html#events.legendselectchanged) triggered while changing the legend selected (please notice that ['legendselectchanged'](${mainSitePath}api.html#events.legendselectchanged in this situation), ['datazoom'](${mainSitePath}api.html#events.legendselectchanged) triggered while zooming the data area. 


## Handling the Mouse Events

ECharts support general mouse event type included: `'click'`, `'dblclick'`, `'mousedown'`, `'mousemove'`, `'mouseup'`, `'mouseover'`, `'mouseout'`, `'globalout'`, `'contextmenu'`. This is an example of opening the Baidu search website after clicking the bar chart.

```js
// Init the ECharts base on DOM
var myChart = echarts.init(document.getElementById('main'));

// Config
var option = {
    xAxis: {
        data: ["Shirt","Wool sweater","Chiffon shirt","Pants","High-heeled shoes","socks"]
    },
    yAxis: {},
    series: [{
        name: 'Sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
// Use the option and data to display the chart
myChart.setOption(option);
// Click and jump to Baidu search website
myChart.on('click', function (params) {
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});
```

All mouse events included `params` which contained the data of the object.

Format:
```js
{
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
    value: number|Array,
	// color of the shape, works when componentType is 'series'. 
    color: string
}
```

Identify where the mouse clicked.

```js
myChart.on('click', function (params) {
    if (params.componentType === 'markPoint') {
        // Clicked on the markPoint
        if (params.seriesIndex === 5) {
            // clicked on the markPoint of the series with index = 5 
        }
    }
    else if (params.componentType === 'series') {
        if (params.seriesType === 'graph') {
            if (params.dataType === 'edge') {
                // clicked at the edge of graph.
            }
            else {
                // clicked at the node of graph.
            }
        }
    }
});
```

Use `query` to trigger callback for shapes of the specified component: 

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
    <mainType>Index: number // component index
    <mainType>Name: string // component name
    <mainType>Id: string // component id
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
    series: [{
        name: 'uuu'
        // ...
    }]
});
chart.on('mouseover', {seriesName: 'uuu'}, function () {
    // when shapes in series named 'uuu' triggered 'mouseover', callback this method.
});
```

For example:

```js
chart.setOption({
    // ...
    series: [{
        // ...
    }, {
        // ...
        data: [
            {name: 'xx', value: 121},
            {name: 'yy', value: 33}
        ]
    }]
});
chart.on('mouseover', {seriesIndex: 1, name: 'xx'}, function () {
    // when el named 'xx' in series index 1 triggered 'mouseover', callback this method. 
});
```

For example: 

```js
chart.setOption({
    // ...
    series: [{
        type: 'graph',
        nodes: [{name: 'a', value: 10}, {name: 'b', value: 20}],
        edges: [{source: 0, target: 1}]
    }]
});
chart.on('click', {dataType: 'node'}, function () {
    // callback this method while the node of charts was clicked. 
});
chart.on('click', {dataType: 'edge'}, function () {
    // callback this method while the edge of charts was clicked. 
});
```

For example: 

```js
chart.setOption({
    // ...
    series: {
        // ...
        type: 'custom',
        renderItem: function (params, api) {
            return {
                type: 'group',
                children: [{
                    type: 'circle',
                    name: 'my_el',
                    // ...
                }, {
                    // ...
                }]
            }
        },
        data: [[12, 33]]
    }
})
chart.on('mouseup', {element: 'my_el'}, function () {
    // when element named 'my_el' triggered 'mouseup', callback this function. 
});
```

You can display the floating layer, update the charts using the information found in your database by the data name or series name in the callback function. Here is an example: 

```js
myChart.on('click', function (parmas) {
    $.get('detail?q=' + params.name, function (detail) {
        myChart.setOption({
            series: [{
                name: 'pie',
                // using pie chart to show the data distribution in one column.
                data: [detail.data]
            }]
        });
    });
});
```

## Behavioral Events of Component Interaction

All Component Interaction in ECharts will trigger a corresponding event. Normal events and parameters listed in [events](${mainSitePath}/api.html#events) document. 

Here is an example of monitoring a legend: 

```js
// Show/hide the legend only trigger legendselectchanged event
myChart.on('legendselectchanged', function (params) {
    // State if legend is selected.
    var isSelected = params.selected[params.name];
    // print in the console.
    console.log((isSelected ? 'Selected' : 'Not Selected') + 'legend' + params.name);
    // print for all legends.
    console.log(params.selected);
});
```

## Use Code to Trigger Component Behavior

You can trigger events such as `'legendselectchanged'` not only by the user but also by the program itself. It can be used to display the tooltip, select the legend. 

In ECharts 2, we use the method of `myChart.component.tooltip.showTip` to trigger the chart behavior. It is not good because the entry is deep, and involved many internal components. In ECharts 3, it changed to `myChart.dispatchAction({ type: '' })` to trigger the behavior. The new method manage all actions uniformly and can record the behavior path conveniently. 

Commonly used behavior and corresponding parameters were listed in [action](${mainSitePath}/api.html#action).

The following example shows how to highlight each sector one by one in the pie chart using `dispatchAction`.

<iframe width="600" height="400" src="${galleryViewPath}doc-example/pie-highlight&reset=1&edit=1"></iframe>
