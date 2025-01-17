# Carga Asíncrona de Datos y Actualización Dinámica

## Carga Asíncrona

En el  [Getting Started Example](${lang}/get-started) los datos se actualizan directamente usando `setOption`. Pero en muchos casos, los datos necesitan ser llenados mediante carga asíncrona de manera frecuente. `ECharts` puede implementar la carga asíncrona de manera sencilla. Puedes obtener los datos de manera asíncrona a través de una función como jQuery y usar `setOption` para llenar los datos y configuraciones después de que el gráfico haya sido inicializado.

```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(data) {
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
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: data.values
      }
    ]
  });
});
```

O mostrar los ejes vacíos con todos los estilos definidos antes de llenar los datos:

```js
var myChart = echarts.init(document.getElementById('main'));
// Show title, legends and empty axes
myChart.setOption({
  title: {
    text: 'Asynchronous Loading Example'
  },
  tooltip: {},
  legend: {
    data: ['Sales']
  },
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [
    {
      name: 'Sales',
      type: 'bar',
      data: []
    }
  ]
});

// Asynchronous Data Loading
$.get('data.json').done(function(data) {
  // Fill in the data
  myChart.setOption({
    xAxis: {
      data: data.categories
    },
    series: [
      {
        // Find series by name
        name: 'Sales',
        data: data.data
      }
    ]
  });
});
```

Por ejemplo:

<md-example src="doc-example/tutorial-async"></md-example>

Necesitas usar `name` para "navegar" en ECharts cuando actualices los datos. En el ejemplo anterior, el gráfico puede actualizarse normalmente dependiendo del orden de las series, pero te recomendamos agregar el dato  `name` al actualizar los datos.

## Animación de Carga

Cuando toma mucho tiempo cargar los datos, el usuario puede estar viendo un gráfico vacío con solo los ejes y preguntarse si hay un error.

ECharts tiene una animación de carga sencilla por defecto. Puedes llamar a [showLoading](${mainSitePath}/api.html#echartsInstance.showLoading) para mostrarla. Cuando la carga de datos haya finalizado, llama a [hideLoading](${mainSitePath}/api.html#echartsInstance.hideLoading) para ocultar la animación.

```js
myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```

Aquí está el efecto:


<md-example src="doc-example/tutorial-loading"></md-example>

## Actualización Dinámica

ECharts está impulsado por los datos, cualquier cambio en los datos provocará cambios en la presentación del gráfico. Por lo tanto, es sorprendentemente sencillo implementar una actualización dinámica.

Todas las actualizaciones de datos se implementan mediante [setOption](${mainSitePath}/api.html#echartsInstance.setOption). Solo necesitas obtener los datos periódicamente. ECharts encontrará la diferencia entre dos conjuntos de datos para elegir la forma adecuada de animación.

Mira el siguiente ejemplo.

<md-example src="doc-example/tutorial-dynamic-data"></md-example>
