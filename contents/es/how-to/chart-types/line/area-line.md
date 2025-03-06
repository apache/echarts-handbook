# Gráfico de Área

El gráfico de área rellena el espacio entre la línea y el eje con el color de fondo, para expresar los datos según el tamaño del área. En comparación con el gráfico de líneas normal, el gráfico de área tiene efectos visuales más intuitivos. Es especialmente adecuado para escenarios con pocas series.

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
      areaStyle: {}
    },
    {
      data: [25, 14, 23, 35, 10],
      type: 'line',
      areaStyle: {
        color: '#ff0',
        opacity: 0.5
      }
    }
  ]
};
```

Si deseas cambiar el estilo del área en el gráfico de líneas, intenta usar[`areaStyle`](${optionPath}series-line.areaStyle). Establece `'areaStyle'` en `{}`  para usar el tipo predeterminado: usa el color de la serie para rellenar el área de forma translúcida. Si deseas cambiar el estilo, intenta sobrescribir los elementos de configuración en`'areaStyle'`. Por ejemplo, el color de la segunda serie se cambió a amarillo con un 50% de opacidad.
