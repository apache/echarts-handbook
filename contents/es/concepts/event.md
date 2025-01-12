# Evento y Acción

Los usuarios pueden activar eventos correspondientes con sus acciones. El desarrollador puede manejar la función de retroalimentación escuchando estos eventos, como saltar a un nuevo sitio web, mostrar un cuadro de diálogo emergente o profundizar en los datos.

El nombre del evento y el evento DOM son cadenas en minúsculas. Aquí hay un ejemplo de cómo enlazar la escucha del evento  `click`.

```js
myChart.on('click', function(params) {
  // Print name in console
  console.log(params.name);
});
```

Existen dos tipos de eventos en ECharts: uno ocurre cuando el usuario hace clic con el ratón o pasa el cursor sobre los elementos del gráfico, y el otro sucede cuando el usuario activa alguna acción interactiva. Por ejemplo,['legendselectchanged'](${mainSitePath}api.html#events.legendselectchanged) se activa cuando se cambia la selección de la leyenda (ten en cuenta que `legendselected` no se activará en esta situación), ['datazoom'](${mainSitePath}api.html#events.legendselectchanged) se activa cuando se hace zoom en el área de datos.

## Manejo de los Eventos del Ratón

ECharts soporta eventos generales del ratón: `'click'`, `'dblclick'`, `'mousedown'`, `'mousemove'`, `'mouseup'`, `'mouseover'`, `'mouseout'`, `'globalout'`, `'contextmenu'`. Este es un ejemplo de abrir la página de resultados de búsqueda después de hacer clic en un gráfico de barras.

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

Todos los eventos del ratón incluyen `params` que contiene los datos del objeto.

Formato:

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
Identificar dónde se hizo clic con el ratón.

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

Usar `query` para activar la función de retroalimentación de un componente especificado:

```js
chart.on(eventName, query, handler);
```

`query` puede ser una  `string` o un `Object`.

Si es un `string`, el formato puede ser `mainType` o `mainType.subType`, como:

```js
chart.on('click', 'series', function () {...});
chart.on('click', 'series.line', function () {...});
chart.on('click', 'dataZoom', function () {...});
chart.on('click', 'xAxis.category', function () {...});
```

Si es un  `Object`, `query` puede incluir más de un atributo:

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
Como por ejemplo:

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
Por ejemplo:

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
Por ejemplo:

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
Por ejemplo:

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

Puedes mostrar una ventana emergente, actualizar los gráficos utilizando los resultados de la consulta de tu base de datos por el nombre de los datos o el nombre de la serie en la función de retroalimentación. Aquí tienes un ejemplo:

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

## Evento de Interacción de Componentes

Toda interacción de componentes en ECharts disparará un evento correspondiente. Los eventos normales y sus parámetros están listados en el documento de [events](${mainSitePath}/api.html#events) document.

Aquí hay un ejemplo de escuchar un evento de leyenda:

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

## Escribir Código para Activar Acciones de Componentes Manualmente

Puedes activar eventos como `'legendselectchanged'` no solo por el usuario sino también manualmente con código. Esto se puede usar para mostrar el tooltip, seleccionar la leyenda.

En ECharts `myChart.dispatchAction({ type: '' })` se utiliza para activar el comportamiento. Esto maneja todas las acciones y puede registrar los comportamientos de manera conveniente.


Los comportamientos más comunes y sus parámetros correspondientes están listados en [action](${mainSitePath}/api.html#action).

El siguiente ejemplo muestra cómo resaltar cada sector uno por uno en un gráfico de pastel usando `dispatchAction`.

```js live
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

## Escuchar Eventos en el Área Vacía

A veces los desarrolladores necesitan escuchar los eventos que se disparan desde el área vacía del lienzo. Por ejemplo, es necesario restablecer el gráfico cuando los usuarios hacen clic en el área vacía.

Antes de hablar sobre esta función, necesitamos aclarar dos tipos de eventos: eventos zrender y eventos echarts.

```js
myChart.getZr().on('click', function(event) {
  // This listener is listening to a `zrender event`.
});
myChart.on('click', function(event) {
  // This listener is listening to a `echarts event`.
});
```

Los eventos de zrender son diferentes de los eventos de echarts. Los primeros se activan cuando el ratón/puntero está en cualquier lugar, mientras que los segundos solo se activan cuando el ratón/puntero está sobre los elementos gráficos. De hecho, los eventos de echarts se implementan basándose en los eventos de zrender, es decir, cuando un evento de zrender se activa sobre un elemento gráfico, echarts activará un evento de echarts.

Teniendo en cuenta los eventos de zrender, podemos implementar la escucha de eventos desde el área en blanco de la siguiente manera:

```js
myChart.getZr().on('click', function(event) {
  // No "target" means that mouse/pointer is not on
  // any of the graphic elements, which is "blank".
  if (!event.target) {
    // Click on blank. Do something.
  }
});
```
