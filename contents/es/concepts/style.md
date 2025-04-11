# Resumen de la Personalización de Estilos

Este artículo ofrece un resumen de los diferentes enfoques sobre la personalización de estilos en Apache ECharts<sup>TM</sup>. Por ejemplo, cómo configurar el color, tamaño, sombra de los elementos gráficos y etiquetas.

> El término "estilo" puede no seguir la convención de la visualización de datos, pero lo usamos en este artículo porque es popular y fácil de entender.

A continuación, se presentarán los enfoques. Las funcionalidades de estos pueden solaparse, pero son adecuados para diferentes escenarios.

- Tema
- Paleta de Colores
- Personalizar estilo explícitamente (itemStyle, lineStyle, areaStyle, label, ...)
- Codificación visual (visualMap component)

## Tema

Establecer un tema es la forma más sencilla de cambiar el estilo de color. Por ejemplo, en la [Examples page](${mainSitePath}examples),podemos cambiar a modo oscuro y ver el resultado de un tema diferente.

En nuestro proyecto, podemos cambiar a un tema oscuro de la siguiente manera:

```js
var chart = echarts.init(dom, 'dark');
```

Otros temas no están incluidos por defecto, y necesitamos cargarlos nosotros mismos si queremos utilizarlos. Los temas pueden ser visitados y descargados en el [theme builder](${mainSitePath}theme-builder.html). En él, también se pueden crear o editar temas. El tema descargado se puede usar de la siguiente manera:

Si un tema se descarga como un archivo JSON, debemos registrarlo nosotros mismos, por ejemplo:

```js
// Assume the theme name is "vintage".
fetch('theme/vintage.json')
  .then(r => r.json())
  .then(theme => {
    echarts.registerTheme('vintage', theme);
    var chart = echarts.init(dom, 'vintage');
  })
```

If a theme is downloaded as a JS file, it will auto register itself:

```js
// Import the `vintage.js` file in HTML, then:
var chart = echarts.init(dom, 'vintage');
// ...
```

## Paleta de Colores

La paleta de colores puede proporcionarse en la opción. Estas proporcionan un grupo de colores, que serán seleccionados automáticamente por las series y los datos. Podemos dar una paleta global, o una paleta exclusiva para ciertas series.

```js
option = {
  // Global palette:
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ],

  series: [
    {
      type: 'bar',
      // A palette only work for the series:
      color: [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ]
      // ...
    },
    {
      type: 'pie',
      // A palette only work for the series:
      color: [
        '#37A2DA',
        '#32C5E9',
        '#67E0E3',
        '#9FE6B8',
        '#FFDB5C',
        '#ff9f7f',
        '#fb7293',
        '#E062AE',
        '#E690D1',
        '#e7bcf3',
        '#9d96f5',
        '#8378EA',
        '#96BFFF'
      ]
      // ...
    }
  ]
};
```

## Personalizar Estilo de Forma Explícita

Es una forma común de establecer estilos de manera explícita. A lo largo de la  [option](${optionPath}), de ECharts, se pueden configurar opciones relacionadas con el estilo en varios lugares, incluyendo  [itemStyle](${optionPath}series.itemStyle), [lineStyle](${optionPath}series-line.lineStyle), [areaStyle](${optionPath}series-line.areaStyle), [label](${optionPath}series.label), etc.

En términos generales, todos los componentes y series incorporados siguen la convención de nombres como `itemStyle`, `lineStyle`, `areaStyle`, `label` etc, aunque pueden aparecer en diferentes lugares según la serie o componente.

En el siguiente código, añadimos sombra y degradado a un gráfico de burbujas.

```js live
var data = [
  [
    [28604, 77, 17096869, 'Australia', 1990],
    [31163, 77.4, 27662440, 'Canada', 1990],
    [1516, 68, 1154605773, 'China', 1990],
    [13670, 74.7, 10582082, 'Cuba', 1990],
    [28599, 75, 4986705, 'Finland', 1990],
    [29476, 77.1, 56943299, 'France', 1990],
    [31476, 75.4, 78958237, 'Germany', 1990],
    [28666, 78.1, 254830, 'Iceland', 1990],
    [1777, 57.7, 870601776, 'India', 1990],
    [29550, 79.1, 122249285, 'Japan', 1990],
    [2076, 67.9, 20194354, 'North Korea', 1990],
    [12087, 72, 42972254, 'South Korea', 1990],
    [24021, 75.4, 3397534, 'New Zealand', 1990],
    [43296, 76.8, 4240375, 'Norway', 1990],
    [10088, 70.8, 38195258, 'Poland', 1990],
    [19349, 69.6, 147568552, 'Russia', 1990],
    [10670, 67.3, 53994605, 'Turkey', 1990],
    [26424, 75.7, 57110117, 'United Kingdom', 1990],
    [37062, 75.4, 252847810, 'United States', 1990]
  ],
  [
    [44056, 81.8, 23968973, 'Australia', 2015],
    [43294, 81.7, 35939927, 'Canada', 2015],
    [13334, 76.9, 1376048943, 'China', 2015],
    [21291, 78.5, 11389562, 'Cuba', 2015],
    [38923, 80.8, 5503457, 'Finland', 2015],
    [37599, 81.9, 64395345, 'France', 2015],
    [44053, 81.1, 80688545, 'Germany', 2015],
    [42182, 82.8, 329425, 'Iceland', 2015],
    [5903, 66.8, 1311050527, 'India', 2015],
    [36162, 83.5, 126573481, 'Japan', 2015],
    [1390, 71.4, 25155317, 'North Korea', 2015],
    [34644, 80.7, 50293439, 'South Korea', 2015],
    [34186, 80.6, 4528526, 'New Zealand', 2015],
    [64304, 81.6, 5210967, 'Norway', 2015],
    [24787, 77.3, 38611794, 'Poland', 2015],
    [23038, 73.13, 143456918, 'Russia', 2015],
    [19360, 76.5, 78665830, 'Turkey', 2015],
    [38225, 81.4, 64715810, 'United Kingdom', 2015],
    [53354, 79.1, 321773631, 'United States', 2015]
  ]
];

option = {
  backgroundColor: {
    type: 'radial',
    x: 0.3,
    y: 0.3,
    r: 0.8,
    colorStops: [
      {
        offset: 0,
        color: '#f7f8fa'
      },
      {
        offset: 1,
        color: '#cdd0d5'
      }
    ]
  },
  grid: {
    left: 10,
    containLabel: true,
    bottom: 10,
    top: 10,
    right: 30
  },
  xAxis: {
    splitLine: {
      show: false
    }
  },
  yAxis: {
    splitLine: {
      show: false
    },
    scale: true
  },
  series: [
    {
      name: '1990',
      data: data[0],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5,
        color: {
          type: 'radial',
          x: 0.4,
          y: 0.3,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(251, 118, 123)'
            },
            {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }
          ]
        }
      }
    },
    {
      name: '2015',
      data: data[1],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(25, 100, 150, 0.5)',
        shadowOffsetY: 5,
        color: {
          type: 'radial',
          x: 0.4,
          y: 0.3,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(129, 227, 238)'
            },
            {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }
          ]
        }
      }
    }
  ]
};
```

## Estado de Estilo de Énfasis

Cuando el mouse pasa por encima de un elemento gráfico, generalmente se mostrará el estilo de énfasis. Por defecto, el estilo de énfasis se genera automáticamente a partir del estilo normal. Sin embargo, se puede especificar mediante la propiedad [emphasis](${optionPath}series-bar.emphasis) Las opciones en [emphasis](${optionPath}series-bar.emphasis) son las mismas que las del estado normal, por ejemplo:

```js
option = {
  series: {
    type: 'scatter',

    // Styles for normal state.
    itemStyle: {
      // Color of the point.
      color: 'red'
    },
    label: {
      show: true,
      // Text of labels.
      formatter: 'This is a normal label.'
    },

    // Styles for emphasis state.
    emphasis: {
      itemStyle: {
        // Color in emphasis state.
        color: 'blue'
      },
      label: {
        show: true,
        // Text in emphasis.
        formatter: 'This is a emphasis label.'
      }
    }
  }
};
```

Nota: Antes de ECharts4, el estilo de énfasis debía escribirse de la siguiente manera:

```js
option = {
  series: {
    type: 'scatter',

    itemStyle: {
      // Styles for normal state.
      normal: {
        color: 'red'
      },
      // Styles for emphasis state.
      emphasis: {
        color: 'blue'
      }
    },

    label: {
      // Styles for normal state.
      normal: {
        show: true,
        formatter: 'This is a normal label.'
      },
      // Styles for emphasis state.
      emphasis: {
        show: true,
        formatter: 'This is a emphasis label.'
      }
    }
  }
};
```

El formato de opción sigue siendo **compatible**, pero no se recomienda. De hecho, en la mayoría de los casos, los usuarios solo configuran el estilo normal y utilizan el estilo de énfasis predeterminado. Por lo tanto, desde ECharts4, se admite escribir el estilo sin el término "normal", lo que hace que la opción sea más simple y ordenada.

## Codificación Visual mediante el Componente visualMap

El [visualMap component](${optionPath}visualMap) permite configurar la regla que mapea un valor a un canal visual (color, tamaño, ...). Puedes encontrar más detalles en [Visual Map of Data](${lang}/concepts/visual-map/).
