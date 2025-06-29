# Gráfico de Barras Apiladas

A veces, esperamos no solo analizar las series por separado, sino también la tendencia de la suma. Una buena opción para implementarlo es usando el gráfico de barras apiladas. Como su nombre indica, en el gráfico de barras apiladas, los datos de la misma categoría se apilan en una sola columna. La altura total de la barra explica el cambio total.

Hay una forma sencilla de implementar un gráfico de barras apiladas con ECharts. Solo necesitas establecer el mismo valor de tipo cadena para un grupo de series en `stack`. Las series con el mismo valor de  `stack` rán en la misma categoría.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x'
    }
  ]
};
```

En este caso, la posición de la segunda serie se basa en la posición de la primera serie, y la altura aumentada corresponde a la altura de la primera serie. Por lo tanto, desde la posición de la segunda serie, puedes ver la tendencia del cambio de la suma de ambas.

> El valor de  `stack` explica qué series se apilarán juntas. Teóricamente, el valor específico de 'stack' no tiene un significado importante. Sin embargo, preferimos usar cadenas sugerentes para facilitar la lectura
>
> Por ejemplo, aquí hay un gráfico con 4 series que cuentan la cantidad de hombres y mujeres. "Hombre adulto" y "Niño" deben apilarse, mientras que "Mujer adulta" y "Niña" también deben apilarse. En este caso, el valor sugerido para `stack` is `'male'` y `'female'`.  Aunque cadenas sin sentido como  `'a'` y `'b'` pueden lograr el mismo efecto, el código tendrá una menor legibilidad.
