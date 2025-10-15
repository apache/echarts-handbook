# Dataset

`dataset` es un componente dedicado a gestionar los datos. Aunque puedes definir los datos en `series.data` para cada serie, te recomendamos utilizar el `dataset` para gestionar los datos desde ECharts 4, ya que permite que los datos se reutilicen en múltiples componentes y facilita la separación de "datos y configuraciones". Después de todo, los datos son la parte que más cambia, mientras que las otras configuraciones generalmente no cambian en tiempo de ejecución.

## Definir **datos** bajo **series**

Si defines los datos bajo `series`, por ejemplo:

```js live
option = {
  xAxis: {
    type: 'category',
    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1]
    }
  ]
};
```

Definir los  `data` bajo `series` es adecuado para la personalización de estructuras de datos especiales como "árbol", "gráfico" y grandes volúmenes de datos. Sin embargo, no es conveniente para compartir los datos entre varias series ni para organizar los tipos de gráficos y series basados en los datos originales. Otra desventaja es que los programadores siempre tienen que dividir los datos en series separadas (y categorías) primero.

## Definir  **datos** en **dataset**

Aquí están las ventajas si defines los `datos` en el  `dataset`:

- Sigue la lógica de visualización de datos: (I) Proporciona los datos, (II) Mapea los datos a la visualización para      convertirlos en un gráfico.
- Separa los datos de otras configuraciones. Los datos cambian frecuentemente, pero las otras configuraciones no lo hacen. Es fácil gestionarlos por separado.
- Los datos pueden ser reutilizados por varias series o componentes, sin necesidad de crear copias de grandes volúmenes de datos para cada serie.
- Soporta formatos de datos más comunes, como un arreglo 2D, arreglo de clases, etc., para evitar que los usuarios tengan que convertir los datos a un formato específico.

Aquí tienes un ejemplo simple de `dataset`:

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // Provide a set of data.
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  // Declare an x-axis (category axis).
  // The category map the first column in the dataset by default.
  xAxis: { type: 'category' },
  // Declare a y-axis (value axis).
  yAxis: {},
  // Declare several 'bar' series,
  // every series will auto-map to each column by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

O intenta usar el formato "array of classes":

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // Define the dimension of array. In cartesian coordinate system,
    // if the type of x-axis is category, map the first dimension to
    // x-axis by default, the second dimension to y-axis.
    // You can also specify 'series.encode' to complete the map
    // without specify dimensions. Please see below.

    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

## Mapeo de Datos a Gráfico

Las ideas de visualización de datos son: (I) Proporcionar los datos, (II) Mapear los datos a la visualización para convertirlos en un gráfico.

En resumen, puedes configurar estos mapeos:

- Especifica la 'columna' o 'fila' del `dataset` para mapear a la `series`. Puedes usar [series.seriesLayoutBy](${optionPath}series.seriesLayoutBy) para configurarlo. El valor por defecto es mapear según la columna.
- Regla de mapeo de dimensiones: cómo mapear las dimensiones de 'dataset' a `axis`, `tooltip`, `label` y `visualMap`. Para configurar el mapeo usa [series.encode](${optionPath}series.encode) y [visualMap](${optionPath}visualMap). En el caso anterior no se proporcionó la configuración de mapeo, por lo que ECharts seguirá el comportamiento por defecto: si el eje X es de tipo categoría, mapea a la primera fila en `dataset.source`; un gráfico de tres columnas mapea con cada fila en `dataset.source` una por una.

Los detalles de la configuración se muestran a continuación:

## Mapeo de Fila o Columna  de  **dataset** a **series**

Teniendo el dataset, puedes configurar de manera flexible cómo los datos se mapean al eje y la serie.

Puedes usar `seriesLayoutBy` para cambiar la interpretación de fila y columna del gráfico. `seriesLayoutBy` puede ser:

- `'column'`: Valor por defecto. Las series se colocan sobre la columna del  `dataset`.
- `'row'`: Las series se colocan sobre la fila del `dataset`.

Mira este caso:

```js live
option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
    ]
  },
  xAxis: [
    { type: 'category', gridIndex: 0 },
    { type: 'category', gridIndex: 1 }
  ],
  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  grid: [{ bottom: '55%' }, { top: '55%' }],
  series: [
    // These series will show in the first coordinate, each series map a row in dataset.
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },
    // These series will show in the second coordinate, each series map a column in dataset.
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 }
  ]
};
```

El efecto de la configuración se muestra en [this case](${exampleEditorPath}dataset-series-layout-by).

## Dimensión

La mayoría de los datos descritos en los gráficos comúnmente usados tienen una estructura de "tabla bidimensional", en el caso anterior, usamos un arreglo 2D para contener una tabla bidimensional. Ahora, cuando asignamos una serie a una columna, esa columna se llama "dimensión" y cada fila se llama "elemento", y viceversa.

La dimensión puede tener su propio nombre para mostrarse en el gráfico. El nombre de la dimensión puede definirse en la primera columna (fila). En [next case](${lang}/concepts/dataset/#map-from-data-to-charts-(series.encode)), `'score'`, `'amount'`, `'product'` son los nombres de las dimensiones. Los datos reales se encuentran en la segunda fila. ECharts verificará automáticamente si la primera columna (fila) contiene el nombre de la dimensión en `dataset.source`. También puedes usar `dataset.sourceHeader: true` declarar que la primera columna (fila) representa el nombre de la dimensión.

Intenta usar solo `dataset.dimensions` o algunas `series.dimensions` para definir las dimensiones, por lo tanto, puedes especificar el nombre y el tipo juntos.

```js
var option1 = {
  dataset: {
    dimensions: [
      { name: 'score' },
      // can be abbreviated as 'string', to indicate dimension name
      'amount',
      // Specify dimensions in 'type'.
      { name: 'product', type: 'ordinal' }
    ],
    source: []
  }
  // ...
};

var option2 = {
  dataset: {
    source: []
  },
  series: {
    type: 'line',
    // series.dimensions will cover the config in dataset.dimension
    dimensions: [
      null, // use null if you do not want dimension name.
      'amount',
      { name: 'product', type: 'ordinal' }
    ]
  }
  // ...
};
```

En la mayoría de los casos, no es necesario definir el tipo de dimensión porque ECharts lo determinará automáticamente. Si el juicio es inexacto, puedes definirlo manualmente.

El tipo de dimensión puede ser uno de los siguientes valores:

- `'number'`: Predeterminado, datos normales..
- `'ordinal'`: Datos de tipo cadena como categorías, texto, que solo se pueden usar en el eje con el tipo de dimensión 'ordinal'. ECharts intentará determinar automáticamente este tipo, pero puede ser inexacto, por lo que puedes especificarlo manualmente.
- `'time'`: Para representar datos de tiempo, ECharts puede analizar automáticamente los datos como una marca de tiempo si el tipo de dimensión se define como `'time'`. Por ejemplo, ECharts lo analizará automáticamente si los datos de esta dimensión son '2017-05-10'. Si la dimensión se usa como un eje de tiempo ([axis.type](${optionPath}xAxis.type) = `'time'`), el tipo de dimensión también será `'time'`. Consulta [data](${optionPath}series.data) para más soporte de tipo de tiempo.
- `'float'`: Utiliza  `TypedArray` para optimizar el rendimiento en la dimensión `'float'`.
- `'int'`: Utiliza  `TypedArray` para optimizar el rendimiento en la dimensión  `'int'`.

## Mapeo de Datos a Gráficos (series.encode)

Después de entender el concepto de dimensión, puedes usar [series.encode](${optionPath}series.encode) para hacer un mapeo:

```js live
var option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, 'Matcha Latte'],
      [57.1, 78254, 'Milk Tea'],
      [74.4, 41032, 'Cheese Cocoa'],
      [50.1, 12755, 'Cheese Brownie'],
      [89.7, 20145, 'Matcha Cocoa'],
      [68.1, 79146, 'Tea'],
      [19.6, 91852, 'Orange Juice'],
      [10.6, 101852, 'Lemon Juice'],
      [32.7, 20112, 'Walnut Brownie']
    ]
  },
  xAxis: {},
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      encode: {
        // Map "amount" column to x-axis.
        x: 'amount',
        // Map "product" row to y-axis.
        y: 'product'
      }
    }
  ]
};
```

La estructura básica de la declaración  `series.encode`:

- A la izquierda del colon: Nombre específico del eje o etiqueta.
- A la derecha del colon: Nombre de la dimensión (cadena) o número (entero, contando desde 0), para especificar una o varias dimensiones (usando un arreglo).

En general, la siguiente información no es necesario definirla. Completa según sea necesario.

Atributos sugeridos por `series.encode`

```js
// Supported in every coordinate and series:
encode: {
  // Display the value of dimension named "product" and "score" in tooltip.
  tooltip: ['product', 'score']
  // Connect dimension name of "Dimension 1" and "Dimension 3" as the series name. (Avoid to repeat longer names in series.name)
  seriesName: [1, 3],
  // Means to use the value in "Dimension 2" as the id. It makes the new and old data correspond by id
	// when using setOption to update data, so that it can show animation properly.
  itemId: 2,
  // The itemName will show in the legend of Pie Charts.
  itemName: 3
}

// Grid/cartesian coordinate unique configs:
encode: {
  // Map "Dimension 1", "Dimension 5" and "dimension named 'score'" to x-axis:
  x: [1, 5, 'score'],
  // Map "Dimension 0" to y-axis:
  y: 0
}

// singleAxis unique configs:
encode: {
  single: 3
}

// Polar coordinate unique configs:
encode: {
  radius: 3,
  angle: 2
}

// Geo-coordinate unique configs:
encode: {
  lng: 3,
  lat: 2
}

// For some charts without coordinate like pie chart, funnel chart:
encode: {
  value: 3
}
```

Este es un ejemplo más completo de [example](${exampleEditorPath}dataset-encode1)  `series.encode`.

## series.encode por defecto

Vale la pena mencionar que ECharts utilizará algunas reglas de mapeo por defecto para algunos gráficos generales (línea, barra, dispersión, velas, etc.) si no se especifica `series.encode` La regla predeterminada es:

- En un sistema de coordenadas (por ejemplo, cartesiano, polar):
  - Si hay un eje de categoría ([axis.type](${optionPath}xAxis.type) = `'category'`), mapea la primera columna (fila) al eje y cada columna (fila) subsecuente a cada serie.
  - Si ambos ejes no son de categoría, entonces mapea cada par de columnas en una serie a dos ejes.
- Sin eje (por ejemplo, gráfico de torta):
  - Usa la primera columna (fila) como el nombre, la segunda columna (fila) como el valor. ECharts no asignará un nombre si solo hay una columna (fila).

Si la regla predeterminada no satisface los requisitos, puedes configurar `encode` bpor ti mismo, lo cual no es complicado. Aquí tienes un [example](${exampleEditorPath}dataset-default).

## Algunos ajustes normales de series.encode

Q: ¿Cómo establecer la tercera columna como el eje x, y la quinta columna como el eje y?

A:

```js
option = {
  series: {
    // dimensionIndex count from 0, so the 3rd line is dimensions[2].
    encode: { x: 2, y: 4 }
    // ...
  }
};
```

Q: ¿Cómo establecer la tercera fila como el eje x, y la quinta fila como el eje y?

A:

```js
option = {
  series: {
    encode: { x: 2, y: 4 },
    seriesLayoutBy: 'row'
    // ...
  }
};
```

Q: ¿Cómo establecer la segunda columna como etiqueta?

A:
Ahora soportamos rastrear el valor de una dimensión específica para [label.formatter](${optionPath}series.label.formatter):

```js
series: {
  label: {
    // `'{@score}'` means the value in the dimension named "score".
    // `'{@[4]}'` means the value in dimension 4.
    formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd';
  }
}
```

Q: ¿Cómo mostrar la segunda y tercera columna en el tooltip?

A:

```js
option = {
  series: {
    encode: {
      tooltip: [1, 2]
      // ...
    }
    // ...
  }
};
```

Q: ¿Cómo definir el nombre de la dimensión si no está incluido en el conjunto de datos?

A:

```js
var option = {
  dataset: {
    dimensions: ['score', 'amount'],
    source: [
      [89.3, 3371],
      [92.1, 8123],
      [94.4, 1954],
      [85.4, 829]
    ]
  }
};
```

Q: ¿Cómo asignar la tercera columna al tamaño del gráfico de dispersión?

A:

```js live
var option = {
  dataset: {
    source: [
      [12, 323, 11.2],
      [23, 167, 8.3],
      [81, 284, 12],
      [91, 413, 4.1],
      [13, 287, 13.5]
    ]
  },
  visualMap: {
    show: false,
    dimension: 2, // means the 3rd column
    min: 2, // lower bound
    max: 15, // higher bound
    inRange: {
      // Size of the bubble.
      symbolSize: [5, 60]
    }
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter'
  }
};
```

Q: Especificé una asignación en encode, ¿por qué no funcionó?

A: Revisa tu ortografía, por ejemplo, si escribiste mal el nombre de la dimensión `'Life Expectancy'` como `'Life Expectency'` en encode.

## Mapeo de Canales Visuales

Podemos mapear un canal visual usando [visualMap](${optionPath}visualMap). Consulta los detalles en el documento de [visualMap](${optionPath}visualMap) Aquí hay un [example](${exampleEditorPath}dataset-encode0).

## Formatos de Gráficos

En la mayoría de los gráficos normales, los datos se describen adecuadamente en forma de una tabla bidimensional. Programas conocidos como 'MS Excel' y 'Numbers' utilizan tablas bidimensionales. Sus datos pueden exportarse a formato JSON e ingresarse en `dataset.source` lo que evita algunos pasos de procesamiento de datos.

> Puedes convertir archivos .csv a JSON usando herramientas como  [dsv](https://github.com/d3/d3-dsv) o [PapaParse](https://github.com/mholt/PapaParse).

Como se muestra en el ejemplo posterior, en la transmisión de datos de JavaScript, los datos bidimensionales pueden almacenarse directamente en un array bidimensional.

Aparte del array bidimensional, el conjunto de datos también admite el uso de pares clave-valor, que también es una forma común. Sin embargo, actualmente no soportamos [seriesLayoutBy](${optionPath}series.seriesLayoutBy) en este formato.

```js
dataset: [
  {
    // column by column key-value array is a normal format
    source: [
      { product: 'Matcha Latte', count: 823, score: 95.8 },
      { product: 'Milk Tea', count: 235, score: 81.4 },
      { product: 'Cheese Cocoa', count: 1042, score: 91.2 },
      { product: 'Walnut Brownie', count: 988, score: 76.9 }
    ]
  },
  {
    // row by row key-value
    source: {
      product: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
      count: [823, 235, 1042, 988],
      score: [95.8, 81.4, 91.2, 76.9]
    }
  }
];
```

## Cómo Referenciar Varios Conjuntos de Datos

ECharts permite definir varios conjuntos de datos al mismo tiempo. Las series pueden asignar uno a referencia mediante [series.datasetIndex](${optionPath}series.datasetIndex). Por ejemplo:

```js
var option = {
  dataset: [
    {
      // 1st Dataset
      source: []
    },
    {
      // 2nd Dataset
      source: []
    },
    {
      // 3rd Dataset
      source: []
    }
  ],
  series: [
    {
      // Use 2nd dataset
      datasetIndex: 1
    },
    {
      // Use 1st dataset
      datasetIndex: 0
    }
  ]
};
```

## series.data en ECharts 3

ECharts 4 aún soporta la declaración de datos de la manera de ECharts 3. Si la serie ya ha declarado  [series.data](${optionPath}series.data),  entonces usa  [series.data](${optionPath}series.data) pero no `dataset`.

```js
option = {
  xAxis: {
    type: 'category',
    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1]
    }
  ]
};
```

De hecho, [series.data](${optionPath}series.data) es un método de configuración importante que siempre existirá. Algunos gráficos especiales en formatos no tabulares, como [treemap](${optionPath}series-treemap), [graph](${optionPath}series-graph) y [lines](${optionPath}series-lines) aún no pueden editarse en el conjunto de datos, por lo que aún necesitas usar  [series.data](${optionPath}series.data). De otra manera, para representar grandes cantidades de datos (más de un millón), deberás usar [appendData](${mainSitePath}api.html#echartsInstance.appendData)  que no es compatible con  `dataset`.

## Otros

Los siguientes gráficos ahora soportan dataset:
`line`, `bar`, `pie`, `scatter`, `effectScatter`, `parallel`, `candlestick`, `map`, `funnel`, `custom`.
 ECharts soportará más gráficos en el futuro.

Al final, aquí hay un [example](${exampleEditorPath}dataset-link) de varios gráficos compartiendo un  `dataset` con interacción de vinculación.
