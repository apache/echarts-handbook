# Un Ejemplo: Implementación de Arrastre

Este es un ejemplo pequeño que introduce cómo implementar el arrastre de elementos gráficos en Apache ECharts<sup>TM</sup>. Con este ejemplo, veremos cómo crear una aplicación rica en interactividad basada en la API de ECharts.


<md-example src="line-draggable" height="400"></md-example>

Este ejemplo implementa principalmente el arrastre de puntos de una curva, lo que modifica la curva. Aunque es un ejemplo simple, se pueden hacer muchas más cosas a partir de él, como editar gráficos visualmente. Así que comencemos con este ejemplo simple.

## Implementar arrastre básico


Primero, creamos un gráfico de líneas básico [line chart (line series)](${optionPath}series-line):

```js
var symbolSize = 20;
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];

myChart.setOption({
  xAxis: {
    min: -100,
    max: 80,
    type: 'value',
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -30,
    max: 60,
    type: 'value',
    axisLine: { onZero: false }
  },
  series: [
    {
      id: 'a',
      type: 'line',
      smooth: true,
      // Set a big symbolSize for dragging convenience.
      symbolSize: symbolSize,
      data: data
    }
  ]
});
```

Dado que los símbolos en la línea no son arrastrables, los hacemos arrastrables utilizando el  [graphic component](${optionPath}graphic) para agregar elementos circulares arrastrables a los símbolos, respectivamente.

```js
myChart.setOption({
  // Declare a graphic component, which contains some graphic elements
  // with the type of 'circle'.
  // Here we have used the method `echarts.util.map`, which has the same
  // behavior as Array.prototype.map, and is compatible with ES5-.
  graphic: echarts.util.map(data, function(dataItem, dataIndex) {
    return {
      // 'circle' means this graphic element is a shape of circle.
      type: 'circle',

      shape: {
        // The radius of the circle.
        r: symbolSize / 2
      },
      // Transform is used to located the circle. position:
      // [x, y] means translate the circle to the position [x, y].
      // The API `convertToPixel` is used to get the position of
      // the circle, which will introduced later.
      position: myChart.convertToPixel('grid', dataItem),

      // Make the circle invisible (but mouse event works as normal).
      invisible: true,
      // Make the circle draggable.
      draggable: true,
      // Give a big z value, which makes the circle cover the symbol
      // in line series.
      z: 100,
      // This is the event handler of dragging, which will be triggered
      // repeatly while dragging. See more details below.
      // A util method `echarts.util.curry` is used here to generate a
      // new function the same as `onPointDragging`, except that the
      // first parameter is fixed to be the `dataIndex` here.
      ondrag: echarts.util.curry(onPointDragging, dataIndex)
    };
  })
});
```

En el código anterior, se utiliza la API [convertToPixel](${mainSitePath}api.html#echartsInstance.convertToPixel) para convertir los datos a sus "coordenadas en píxeles", con las cuales cada elemento gráfico se puede renderizar en el lienzo. El término "coordenadas en píxeles" significa que la coordenada está en píxeles del lienzo, cuyo origen está en la parte superior izquierda del lienzo. En la sentencia `myChart.convertToPixel('grid', dataItem)`, el primer parámetro `'grid'` indica que `dataItem` debe ser convertido en el primer componente de cuadrícula [grid component (cartesian)](${optionPath}grid).

**Nota:** `convertToPixel` no debe llamarse antes de que se llame por primera vez a `setOption`.  Es decir, solo se puede usar después de que los sistemas de coordenadas (cuadrícula/polar/...) hayan sido inicializados.

Ahora los puntos se han vuelto arrastrables. A continuación, vinculamos los controladores de eventos al arrastrar esos puntos.

```js
// This function will be called repeatly while dragging.
// The mission of this function is to update `series.data` based on
// the new points updated by dragging, and to re-render the line
// series based on the new data, by which the graphic elements of the
// line series can be synchronized with dragging.
function onPointDragging(dataIndex) {
  // Here the `data` is declared in the code block in the beginning
  // of this article. The `this` refers to the dragged circle.
  // `this.position` is the current position of the circle.
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  // Re-render the chart based on the updated `data`.
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}
```

En el código anterior, se utiliza la API [convertFromPixel](api.html#echartsInstance.convertFromPixel) que es el proceso inverso de [convertToPixel](api.html#echartsInstance.convertToPixel). `myChart.convertFromPixel('grid', this.position)`  convierte una coordenada en píxeles a un elemento de datos en [grid (cartesian)](${optionPath}grid).

Finalmente, agregamos este código para hacer que los elementos gráficos respondan a los cambios en el tamaño del lienzo.

```js
window.addEventListener('resize', function() {
  // Re-calculate the position of each circle and update chart using `setOption`.
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return {
        position: myChart.convertToPixel('grid', item)
      };
    })
  });
});
```

## Agregar el componente de tooltip

Ahora que la funcionalidad básica ha sido implementada en la primera parte, si queremos que los datos se muestren en tiempo real mientras arrastramos, podemos usar el [tooltip component](${optionPath}tooltip) para hacerlo. Sin embargo, el componente tooltip tiene una regla predeterminada de "mostrar/ocultar", que no es aplicable en este caso. Por lo tanto, necesitamos personalizar la "regla de mostrar/ocultar" para nuestro caso.

Agregamos estos fragmentos de código al bloque de código anterior:

```js
myChart.setOption({
  // ...,
  tooltip: {
    // Means disable default "show/hide rule".
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br>Y: ' +
        params.data[1].toFixed(2)
      );
    }
  }
});
```

```js
myChart.setOption({
  graphic: data.map(function(item, dataIndex) {
    return {
      type: 'circle',
      // ...,
      // Customize "show/hide rule", show when mouse over, hide when mouse out.
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex)
    };
  })
});

function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}

function hideTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'hideTip'
  });
}
```

Se utiliza la API  [dispatchAction](${mainSitePath}/api.html#echartsInstance.dispatchAction) para mostrar/ocultar el contenido del tooltip, donde se despachan las acciones [showTip](${mainSitePath}/api.html#action.tooltip.showTip) y [hideTip](api.html#action.tooltip.hideTip) is dispatched.

## Código Completo

El código completo es el siguiente:

```js
import echarts from 'echarts';

var symbolSize = 20;
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  tooltip: {
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br />Y: ' +
        params.data[1].toFixed(2)
      );
    }
  },
  xAxis: { min: -100, max: 80, type: 'value', axisLine: { onZero: false } },
  yAxis: { min: -30, max: 60, type: 'value', axisLine: { onZero: false } },
  series: [
    { id: 'a', type: 'line', smooth: true, symbolSize: symbolSize, data: data }
  ]
});
myChart.setOption({
  graphic: echarts.util.map(data, function(item, dataIndex) {
    return {
      type: 'circle',
      position: myChart.convertToPixel('grid', item),
      shape: { r: symbolSize / 2 },
      invisible: true,
      draggable: true,
      ondrag: echarts.util.curry(onPointDragging, dataIndex),
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex),
      z: 100
    };
  })
});
window.addEventListener('resize', function() {
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return { position: myChart.convertToPixel('grid', item) };
    })
  });
});
function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}
function hideTooltip(dataIndex) {
  myChart.dispatchAction({ type: 'hideTip' });
}
function onPointDragging(dataIndex, dx, dy) {
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}
```

Con los conocimientos introducidos anteriormente, se pueden implementar más características. Por ejemplo, se puede agregar un [dataZoom component](${optionPath}dataZoom) para cooperar con el sistema cartesiano, o crear una pizarra de gráficos sobre sistemas de coordenadas. ¡Usa tu imaginación!