# Gráfico de Línea Suave

El gráfico de línea suave es también una variante del gráfico de líneas básico. Es una mejor opción para lograr una experiencia visual más cómoda. Al usar ECharts, solo necesitas cambiar el valor de `smooth` a `true` para lograr este efecto.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      smooth: true
    }
  ]
};
```
