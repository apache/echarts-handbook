# Gráfico de Rosca

Los gráficos de rosca también se utilizan para mostrar la proporción de los valores en comparación con el total. A diferencia del gráfico de pastel, el espacio en el centro del gráfico puede usarse para proporcionar información adicional. Esto hace que el gráfico de rosca sea un tipo de gráfico comúnmente utilizado.

## Gráfico de Rosca Básico

En ECharts, el radio del gráfico de pastel también podría ser un arreglo con 2 elementos. Cada elemento en el arreglo podría ser una cadena de texto o un valor. El primer elemento representa el radio interno, mientras que el segundo es el radio externo.

Desde esta perspectiva, el gráfico de pastel es un subconjunto del gráfico de rosca que tiene el radio interno igual a 0.

```js live
option = {
  title: {
    text: 'A Case of Doughnut Chart',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'A'
        },
        {
          value: 234,
          name: 'B'
        },
        {
          value: 1548,
          name: 'C'
        }
      ],
      radius: ['40%', '70%']
    }
  ]
};
```

Si configuramos un radio como una cadena con un valor de porcentaje, mientras que el otro es un valor numérico, el radio interno será más pequeño que el radio externo en algunas resoluciones. ECharts elegirá automáticamente el elemento más pequeño para el radio interno. Sin embargo, esto no debería causar un resultado inesperado.

## Mostrar Texto en el Centro de la Rosca desde el Sector Destacado

El caso anterior te muestra cómo mostrar texto fijo en el centro del gráfico de rosca. El siguiente caso te enseñará cómo mostrar el texto correspondiente del sector resaltado por el mouse. La idea general es fijar la `label` en el centro del gráfico mientras se oculta la `label` por defecto.

```js live
option = {
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' }
      ]
    }
  ]
};
```

En este caso, `avoidLabelOverlap` se usa para controlar si ECharts ajusta la posición de la etiqueta para evitar solapamientos. El valor por defecto de `avoidLabelOverlap` es `true`. Queremos que la etiqueta esté fija en el centro, por lo que necesitamos definirla como `false`.

Por lo tanto, el centro del gráfico de rosca mostrará el`name` del sector resaltado.
