# Gráfico de Líneas Escalonadas

El gráfico de líneas normal conecta dos puntos mediante una línea recta directamente, mientras que el gráfico de líneas escalonadas, también conocido como gráfico de onda cuadrada, utiliza solo líneas horizontales y verticales para conectar los puntos cercanos entre sí. En comparación con el gráfico de líneas normal, el gráfico de líneas escalonadas muestra de manera más destacada los cambios repentinos de los datos analizados.

En ECharts, `step`  se utiliza para caracterizar el tipo de conexión del gráfico de líneas escalonadas. Tiene tres valores disponibles: `'start'`, `'end'`, y `'middle'`.  Para los elementos A y B, estos valores indican que el cambio abrupto ocurre en A, B o en el punto medio entre A y B.

```js live
option = {
  legend: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Step Middle',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410]
    },
    {
      name: 'Step End',
      type: 'line',
      step: 'end',
      data: [450, 432, 401, 454, 590, 530, 510]
    }
  ]
};
```

> Enfócate en la diferencia de las líneas entre los tres tipos separados.
