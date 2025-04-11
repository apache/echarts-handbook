# Gráfico de Líneas Apiladas

Similar al  [Stacked Bar Chart](${lang}/how-to/chart-types/bar/stacked-bar), el Gráfico de Líneas Apiladas usa  `'stack'` en `series` para decidir qué series deben apilarse juntas.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ]
};
```

Sin embargo, sin una aclaración, es difícil juzgar si se trata de un gráfico de líneas apiladas o de un gráfico de líneas normal. Por lo tanto, se recomienda rellenar el área bajo la línea con color para indicar que se trata de un gráfico de líneas apiladas.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x',
      areaStyle: {}
    }
  ]
};
```
