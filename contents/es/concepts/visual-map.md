# Mapa Visual de Datos

La visualización de datos es un proceso de mapeo de datos en elementos visuales. Este procedimiento también puede llamarse codificación visual, y los elementos visuales también pueden llamarse canales visuales.

Cada tipo de gráfico en Apache ECharts<sup>TM</sup> tiene este procedimiento de mapeo incorporado. Por ejemplo, el gráfico de líneas mapea los datos en líneas, el gráfico de barras mapea los datos en altura. Algunos gráficos más complicados, como `graph`, `themeRiver`, y `treemap` , tienen su propio mapeo incorporado.

Además, ECharts proporciona el [visualMap component](${optionPath}visualMap) para mapeo visual general. Los elementos visuales permitidos en el componente  `visualMap` son:

- `symbol`, `symbolSize`
- `color`, `opacity`, `colorAlpha`,
- `colorLightness`, `colorSaturation`, `colorHue`

A continuación, vamos a presentar cómo usar el componente `visualMap`.

## Datos y Dimensiones

Los datos suelen almacenarse en [series.data](${optionPath}series.data) en ECharts. Dependiendo del tipo de gráfico, como lista, árbol, gráfico, etc., la forma de los datos puede variar. Pero tienen una característica común: son una colección de elementos de datos. Cada elemento de datos contiene un valor de datos y otra información si es necesario. Cada valor de datos puede ser un valor único (una dimensión) o un arreglo (varias dimensiones).

Por ejemplo, [series.data](${optionPath}series.data) es la forma más común, que es una `list`, un arreglo común:

```js
series: {
  data: [
    {
      // every item here is a dataItem
      value: 2323, // this is data value
      itemStyle: {}
    },
    1212, // it can also be a value of dataItem, which is a more common case
    2323, // every data value here is one dimension
    4343,
    3434
  ];
}
```

```js
series: {
  data: [
    {
      // every item here is a dataItem
      value: [3434, 129, 'San Marino'], // this is data value
      itemStyle: {}
    },
    [1212, 5454, 'Vatican'], // it can also be a value of dataItem, which is a more common case
    [2323, 3223, 'Nauru'], // every data value here is three dimension
    [4343, 23, 'Tuvalu'] // If is scatter chart, usually map the first dimension to x axis,
    // the second dimension to y axis,
    // and the third dimension to symbolSize
  ];
}
```

Normalmente, las primeras una o dos dimensiones se utilizan para el mapeo. Por ejemplo, mapear la primera dimensión al eje x, y la segunda dimensión al eje y. Si deseas representar más dimensiones,`visualMap` es lo que necesitas. Es probable que los [scatter charts](${optionPath}series-scatter) usen el radio para representar la tercera dimensión.

## El Componente visualMap

El componente visualMap define el mapeo de qué dimensión de los datos a qué elementos visuales.


Los siguientes dos tipos de componentes visualMap están soportados, identificados con[visualMap.type](${optionPath}visualMap.type).

Su estructura se define de la siguiente manera:

```js
option = {
  visualMap: [
    // can define multiple visualMap components at the same time
    {
      // the first visualMap component
      type: 'continuous' // defined as continuous visualMap
      // ...
    },
    {
      // the second visualMap component
      type: 'piecewise' // defined as discrete visualMap
      // ...
    }
  ]
  // ...
};
```

## Componentes de Mapeo Visual Continuo y Discreto

El componente de mapeo visual de ECharts se divide en continuo
([visualMapContinuous](${optionPath}visualMap-continuous)) y discreto ([visualMapPiecewise](${optionPath}visualMap-piecewise)).

Continuo significa que la dimensión de los datos para el mapeo visual es un valor continuo, mientras que discreto significa que los datos se dividen en múltiples segmentos o datos discretos.

### Mapeo Visual Continuo

El mapeo visual de tipo continuo puede determinar el rango del mapeo visual especificando los valores máximos y mínimos.

```js
option = {
  visualMap: [
    {
      type: 'continuous',
      min: 0,
      max: 5000,
      dimension: 3, // the fourth dimension of series.data (i.e. value[3]) is mapped
      seriesIndex: 4, // The fourth series is mapped.
      inRange: {
        // The visual configuration in the selected range
        color: ['blue', '#121122', 'red'], // A list of colors that defines the graph color mapping
        // the minimum value of the data is mapped to 'blue', and
        // the maximum value is mapped to 'red', // the maximum value is mapped to 'red', // the maximum value is mapped to 'red'.
        // The rest is automatically calculated linearly.
        symbolSize: [30, 100] // Defines the mapping range for the graphic size.
        // The minimum value of the data is mapped to 30, // and the maximum value is mapped to 100.
        // The maximum value is mapped to 100.
        // The rest is calculated linearly automatically.
      },
      outOfRange: {
        // Check the out of range visual configuration
        symbolSize: [30, 100]
      }
    }
    // ...
  ]
};
```

donde [visualMap.inRange](${optionPath}visualMap.inRange) indica el estilo utilizado para los datos dentro del rango de mapeo de datos; mientras que [visualMap.outOfRange](${optionPath}visualMap.outOfRange) especifica el estilo para los datos fuera del rango de mapeo.

[visualMap.dimension](~visualMap.dimension) especifica qué dimensión de los datos será mapeada visualmente.

### Mapeo Visual por Segmentos

El componente de mapeo visual por segmentos tiene tres modos.

- Segmentación promedio de datos continuos: basada en [visualMap-piecewise.splitNumber](${optionPath}visualMap-piecewise.splitNumber) para dividir automáticamente los datos en partes iguales.
- Segmentación personalizada de datos continuos: define el rango de cada parte basado en [visualMap-piecewise.pieces](${optionPath}visualMap-piecewise.pieces).
- Datos discretos (datos categóricos): las categorías se definen en [visualMap-piecewise.categories](${optionPath}visualMap-piecewise.categories).

Para utilizar un mapa visual segmentado, debes configurar `type` a `'piecewise'` y elegir uno de los tres elementos de configuración mencionados.
