# Gráfico de Barras con Ordenamiento Dinámico

## Opciones relacionadas

El gráfico de barras de carrera es un gráfico que muestra los cambios en el ranking de los datos a lo largo del tiempo y está soportado por defecto desde ECharts 5.

> Los gráficos de barras de carrera usualmente utilizan barras horizontales. Si deseas usar barras verticales, simplemente invierte los ejes X y Y en este tutorial.

1. Establece `realtimeSort` de la serie de barras a `true` para habilitar el gráfico de barras de carrera.
2. Establece `yAxis.inverse` a `true` para mostrar las barras más largas en la parte superior.
3. Se sugiere establecer  `yAxis.animationDuration` en `300` para la animación de reordenamiento de barras por primera vez.
4. Se sugiere establecer  `yAxis.animationDurationUpdate` en  `300`  para la animación de reordenamiento de barras en tiempos posteriores.
5. Establece `yAxis.max` en  n - 1_ donde n es el número de barras a mostrar; de lo contrario, se mostrarán todas las barras.
6. Se sugiere establecer `xAxis.max`en `'dataMax'` para que se utilice el valor máximo de los datos como el máximo en el eje X.
7. Si se requiere cambio en las etiquetas en tiempo real, establece `series.label.valueAnimation` a `true`
8. Establece `animationDuration` a  `0` para que la primera animación no empiece desde 0; si deseas lo contrario, ponlo al mismo valor que `animationDurationUpdate`.
9. Se sugiere establecer  `animationDurationUpdate` en `3000` para la duración de la animación de actualización, la cual debe ser igual a la frecuencia de llamada de
duration, which should be the same as the frequency of calling `setOption`
10. Llama `setOption` para actualizar los datos con el siguiente valor en el tiempo usando  `setInterval`  a la frecuencia de  `animationDurationUpdate`

## Demo

Un demo completo:

js
Copy code


```js live
var data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

function run() {
  var data = option.series[0].data;
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption(option);
}

setTimeout(function() {
  run();
}, 0);
setInterval(function() {
  run();
}, 3000);
```
