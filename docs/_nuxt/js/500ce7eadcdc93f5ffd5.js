(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{403:function(n,e,t){"use strict";t.r(e),e.default="# 事件与行为\n\n在 Apache ECharts 的图表中用户的操作将会触发相应的事件。开发者可以监听这些事件，然后通过回调函数做相应的处理，比如跳转到一个地址，或者弹出对话框，或者做数据下钻等等。\n\nECharts 中的事件名称对应 DOM 事件名称，均为小写的字符串，如下是一个绑定点击操作的示例。\n\n```js\nmyChart.on('click', function(params) {\n  // 控制台打印数据的名称\n  console.log(params.name);\n});\n```\n\n在 ECharts 中事件分为两种类型，一种是用户鼠标操作点击，或者 hover 图表的图形时触发的事件，还有一种是用户在使用可以交互的组件后触发的行为事件，例如在切换图例开关时触发的 ['legendselectchanged'](${mainSitePath}api.html#events.legendselectchanged) 事件（这里需要注意切换图例开关是不会触发 `'legendselected'` 事件的），数据区域缩放时触发的 ['datazoom'](${mainSitePath}api.html#events.legendselectchanged) 事件等等。\n\n## 鼠标事件的处理\n\nECharts 支持常规的鼠标事件类型，包括 `'click'`、 `'dblclick'`、 `'mousedown'`、 `'mousemove'`、 `'mouseup'`、 `'mouseover'`、 `'mouseout'`、 `'globalout'`、 `'contextmenu'` 事件。下面先来看一个简单的点击柱状图后打开相应的百度搜索页面的示例。\n\n```js live\n// 基于准备好的dom，初始化ECharts实例\n// var myChart = echarts.init(document.getElementById('main'));\n\n// 指定图表的配置项和数据\nvar option = {\n  xAxis: {\n    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']\n  },\n  yAxis: {},\n  series: [\n    {\n      name: '销量',\n      type: 'bar',\n      data: [5, 20, 36, 10, 10, 20]\n    }\n  ]\n};\n// 使用刚指定的配置项和数据显示图表。\nmyChart.setOption(option);\n// 处理点击事件并且跳转到相应的百度搜索页面\nmyChart.on('click', function(params) {\n  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));\n});\n```\n\n所有的鼠标事件包含参数 `params`，这是一个包含点击图形的数据信息的对象，如下格式：\n\n```ts\ntype EventParams = {\n  // 当前点击的图形元素所属的组件名称，\n  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。\n  componentType: string;\n  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。\n  seriesType: string;\n  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。\n  seriesIndex: number;\n  // 系列名称。当 componentType 为 'series' 时有意义。\n  seriesName: string;\n  // 数据名，类目名\n  name: string;\n  // 数据在传入的 data 数组中的 index\n  dataIndex: number;\n  // 传入的原始数据项\n  data: Object;\n  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，\n  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。\n  // 其他大部分图表中只有一种 data，dataType 无意义。\n  dataType: string;\n  // 传入的数据值\n  value: number | Array;\n  // 数据图形的颜色。当 componentType 为 'series' 时有意义。\n  color: string;\n};\n```\n\n如何区分鼠标点击到了哪里：\n\n```js\nmyChart.on('click', function(params) {\n  if (params.componentType === 'markPoint') {\n    // 点击到了 markPoint 上\n    if (params.seriesIndex === 5) {\n      // 点击到了 index 为 5 的 series 的 markPoint 上。\n    }\n  } else if (params.componentType === 'series') {\n    if (params.seriesType === 'graph') {\n      if (params.dataType === 'edge') {\n        // 点击到了 graph 的 edge（边）上。\n      } else {\n        // 点击到了 graph 的 node（节点）上。\n      }\n    }\n  }\n});\n```\n\n使用 `query` 只对指定的组件的图形元素的触发回调：\n\n```js\nchart.on(eventName, query, handler);\n```\n\n`query` 可为 `string` 或者 `Object`。\n\n如果为 `string` 表示组件类型。格式可以是 'mainType' 或者 'mainType.subType'。例如：\n\n```js\nchart.on('click', 'series', function() {});\nchart.on('click', 'series.line', function() {});\nchart.on('click', 'dataZoom', function() {});\nchart.on('click', 'xAxis.category', function() {});\n```\n\n如果为 `Object`，可以包含以下一个或多个属性，每个属性都是可选的：\n\n```ts\n{\n  ${mainType}Index: number // 组件 index\n  ${mainType}Name: string // 组件 name\n  ${mainType}Id: string // 组件 id\n  dataIndex: number // 数据项 index\n  name: string // 数据项 name\n  dataType: string // 数据项 type，如关系图中的 'node', 'edge'\n  element: string // 自定义系列中的 el 的 name\n}\n```\n\n例如：\n\n```js\nchart.setOption({\n  // ...\n  series: [\n    {\n      name: 'uuu'\n      // ...\n    }\n  ]\n});\nchart.on('mouseover', { seriesName: 'uuu' }, function() {\n  // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。\n});\n```\n\n例如：\n\n```js\nchart.setOption({\n  // ...\n  series: [\n    {\n      // ...\n    },\n    {\n      // ...\n      data: [\n        { name: 'xx', value: 121 },\n        { name: 'yy', value: 33 }\n      ]\n    }\n  ]\n});\nchart.on('mouseover', { seriesIndex: 1, name: 'xx' }, function() {\n  // series index 1 的系列中的 name 为 'xx' 的元素被 'mouseover' 时，此方法被回调。\n});\n```\n\n例如：\n\n```js\nchart.setOption({\n  // ...\n  series: [\n    {\n      type: 'graph',\n      nodes: [\n        { name: 'a', value: 10 },\n        { name: 'b', value: 20 }\n      ],\n      edges: [{ source: 0, target: 1 }]\n    }\n  ]\n});\nchart.on('click', { dataType: 'node' }, function() {\n  // 关系图的节点被点击时此方法被回调。\n});\nchart.on('click', { dataType: 'edge' }, function() {\n  // 关系图的边被点击时此方法被回调。\n});\n```\n\n例如：\n\n```js\nchart.setOption({\n  // ...\n  series: {\n    // ...\n    type: 'custom',\n    renderItem: function(params, api) {\n      return {\n        type: 'group',\n        children: [\n          {\n            type: 'circle',\n            name: 'my_el'\n            // ...\n          },\n          {\n            // ...\n          }\n        ]\n      };\n    },\n    data: [[12, 33]]\n  }\n});\nchart.on('mouseup', { element: 'my_el' }, function() {\n  // name 为 'my_el' 的元素被 'mouseup' 时，此方法被回调。\n});\n```\n\n你可以在回调函数中获得这个对象中的数据名、系列名称后在自己的数据仓库中索引得到其它的信息后更新图表，显示浮层等等，如下示例代码：\n\n```js\nmyChart.on('click', function(parmas) {\n  $.get('detail?q=' + params.name, function(detail) {\n    myChart.setOption({\n      series: [\n        {\n          name: 'pie',\n          // 通过饼图表现单个柱子中的数据分布\n          data: [detail.data]\n        }\n      ]\n    });\n  });\n});\n```\n\n## 组件交互的行为事件\n\n在 ECharts 中基本上所有的组件交互行为都会触发相应的事件，常用的事件和事件对应参数在 [events](${mainSitePath}/api.html#events) 文档中有列出。\n\n下面是监听一个图例开关的示例：\n\n```js\n// 图例开关的行为只会触发 legendselectchanged 事件\nmyChart.on('legendselectchanged', function(params) {\n  // 获取点击图例的选中状态\n  var isSelected = params.selected[params.name];\n  // 在控制台中打印\n  console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);\n  // 打印所有图例的状态\n  console.log(params.selected);\n});\n```\n\n## 代码触发 ECharts 中组件的行为\n\n上面提到诸如 `'legendselectchanged'` 事件会由组件交互的行为触发，那除了用户的交互操作，有时候也会有需要在程序里调用方法触发图表的行为，诸如显示 tooltip，选中图例。\n\n在 ECharts 通过调用 `myChart.dispatchAction({ type: '' })` 触发图表行为，统一管理了所有动作，也可以方便地根据需要去记录用户的行为路径。\n\n常用的动作和动作对应参数在 [action](${mainSitePath}/api.html#action) 文档中有列出。\n\n下面示例演示了如何通过 `dispatchAction` 去轮流高亮饼图的每个扇形。\n\n```js live\noption = {\n  title: {\n    text: '饼图程序调用高亮示例',\n    left: 'center'\n  },\n  tooltip: {\n    trigger: 'item',\n    formatter: '{a} <br/>{b} : {c} ({d}%)'\n  },\n  legend: {\n    orient: 'vertical',\n    left: 'left',\n    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']\n  },\n  series: [\n    {\n      name: '访问来源',\n      type: 'pie',\n      radius: '55%',\n      center: ['50%', '60%'],\n      data: [\n        { value: 335, name: '直接访问' },\n        { value: 310, name: '邮件营销' },\n        { value: 234, name: '联盟广告' },\n        { value: 135, name: '视频广告' },\n        { value: 1548, name: '搜索引擎' }\n      ],\n      emphasis: {\n        itemStyle: {\n          shadowBlur: 10,\n          shadowOffsetX: 0,\n          shadowColor: 'rgba(0, 0, 0, 0.5)'\n        }\n      }\n    }\n  ]\n};\n\nlet currentIndex = -1;\n\nsetInterval(function() {\n  var dataLen = option.series[0].data.length;\n  // 取消之前高亮的图形\n  myChart.dispatchAction({\n    type: 'downplay',\n    seriesIndex: 0,\n    dataIndex: currentIndex\n  });\n  currentIndex = (currentIndex + 1) % dataLen;\n  // 高亮当前图形\n  myChart.dispatchAction({\n    type: 'highlight',\n    seriesIndex: 0,\n    dataIndex: currentIndex\n  });\n  // 显示 tooltip\n  myChart.dispatchAction({\n    type: 'showTip',\n    seriesIndex: 0,\n    dataIndex: currentIndex\n  });\n}, 1000);\n```\n\n## 监听“空白处”的事件\n\n有时候，开发者需要监听画布的“空白处”所触发的事件。比如，当需要在用户点击“空白处”的时候重置图表时。\n\n在讨论这个功能之前，我们需要先明确两种事件。zrender 事件和 echarts 事件。\n\n```js\nmyChart.getZr().on('click', function(event) {\n  // 该监听器正在监听一个`zrender 事件`。\n});\nmyChart.on('click', function(event) {\n  // 该监听器正在监听一个`echarts 事件`。\n});\n```\n\nzrender 事件与 echarts 事件不同。前者是当鼠标在任何地方都会被触发，而后者是只有当鼠标在图形元素上时才能被触发。事实上，echarts 事件是在 zrender 事件的基础上实现的，也就是说，当一个 zrender 事件在图形元素上被触发时，echarts 将触发一个 echarts 事件给开发者。\n\n有了 zrender 事件，我们就可以实现监听空白处的事件，具体如下：\n\n```js\nmyChart.getZr().on('click', function(event) {\n  // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。\n  if (!event.target) {\n    // 点击在了空白处，做些什么。\n  }\n});\n```\n"}}]);