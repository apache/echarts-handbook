# Transformación de Datos

La `Data transform` ha sido soportada desde Apache ECharts <sup>TM</sup> 5. En ECharts, el término `data transform` significa generar nuevos datos a partir de los datos de origen proporcionados por el usuario y las funciones de transformación. Esta característica permite a los usuarios procesar los datos de manera declarativa y proporciona algunas "funciones de transformación" comunes para realizar tareas de este tipo de manera sencilla. (Para mantener la consistencia en el contexto, seguimos usando el sustantivo "transformación" en lugar de "transformación de datos").

La fórmula abstracta de la transformación de datos es: `outData = f(inputData)`, donde la función de transformación f puede ser como `f` puede ser como`filter`, `sort`, `regression`, `boxplot`, `cluster`, `aggregate`(entre otras) ...
Con la ayuda de estos métodos de transformación, los usuarios pueden implementar características como:

- Partition data into multiple series.
- Make some statistics and visualize the result.
- Adapt some visualization algorithms to data and display the result.
- Sort data.
- Remove or choose some kind of empty or special datums.
- ...

## Comenzando con la Transformación de Datos

En ECharts, la transformación de datos se implementa con base en el concepto de [dataset](~${optionPath}#dataset). Un [dataset.transform](${optionPath}#dataset.transform) se puede configurar en una instancia de dataset para indicar que este dataset se generará a partir de esta `transform`. Por ejemplo:

```js live
var option = {
  dataset: [
    {
      // This dataset is on `datasetIndex: 0`.
      source: [
        ['Product', 'Sales', 'Price', 'Year'],
        ['Cake', 123, 32, 2011],
        ['Cereal', 231, 14, 2011],
        ['Tofu', 235, 5, 2011],
        ['Dumpling', 341, 25, 2011],
        ['Biscuit', 122, 29, 2011],
        ['Cake', 143, 30, 2012],
        ['Cereal', 201, 19, 2012],
        ['Tofu', 255, 7, 2012],
        ['Dumpling', 241, 27, 2012],
        ['Biscuit', 102, 34, 2012],
        ['Cake', 153, 28, 2013],
        ['Cereal', 181, 21, 2013],
        ['Tofu', 395, 4, 2013],
        ['Dumpling', 281, 31, 2013],
        ['Biscuit', 92, 39, 2013],
        ['Cake', 223, 29, 2014],
        ['Cereal', 211, 17, 2014],
        ['Tofu', 345, 3, 2014],
        ['Dumpling', 211, 35, 2014],
        ['Biscuit', 72, 24, 2014]
      ]
      // id: 'a'
    },
    {
      // This dataset is on `datasetIndex: 1`.
      // A `transform` is configured to indicate that the
      // final data of this dataset is transformed via this
      // transform function.
      transform: {
        type: 'filter',
        config: { dimension: 'Year', value: 2011 }
      }
      // There can be optional properties `fromDatasetIndex` or `fromDatasetId`
      // to indicate that where is the input data of the transform from.
      // For example, `fromDatasetIndex: 0` specify the input data is from
      // the dataset on `datasetIndex: 0`, or `fromDatasetId: 'a'` specify the
      // input data is from the dataset having `id: 'a'`.
      // [DEFAULT_RULE]
      // If both `fromDatasetIndex` and `fromDatasetId` are omitted,
      // `fromDatasetIndex: 0` are used by default.
    },
    {
      // This dataset is on `datasetIndex: 2`.
      // Similarly, if neither `fromDatasetIndex` nor `fromDatasetId` is
      // specified, `fromDatasetIndex: 0` is used by default
      transform: {
        // The "filter" transform filters and gets data items only match
        // the given condition in property `config`.
        type: 'filter',
        // Transforms has a property `config`. In this "filter" transform,
        // the `config` specify the condition that each result data item
        // should be satisfied. In this case, this transform get all of
        // the data items that the value on dimension "Year" equals to 2012.
        config: { dimension: 'Year', value: 2012 }
      }
    },
    {
      // This dataset is on `datasetIndex: 3`
      transform: {
        type: 'filter',
        config: { dimension: 'Year', value: 2013 }
      }
    }
  ],
  series: [
    {
      type: 'pie',
      radius: 50,
      center: ['25%', '50%'],
      // In this case, each "pie" series reference to a dataset that has
      // the result of its "filter" transform.
      datasetIndex: 1
    },
    {
      type: 'pie',
      radius: 50,
      center: ['50%', '50%'],
      datasetIndex: 2
    },
    {
      type: 'pie',
      radius: 50,
      center: ['75%', '50%'],
      datasetIndex: 3
    }
  ]
};
```

Vamos a resumir los puntos clave del uso de la transformación de datos::

- Generar nuevos datos a partir de los datos declarados existentes mediante la declaración de `transform`, `fromDatasetIndex`/`fromDatasetId` en algún conjunto de datos en blanco.
- Las series hacen referencia a estos conjuntos de datos para mostrar el resultado..

## Uso Avanzado

#### Transformación Encadenada

Existe una forma sintáctica simplificada para encadenar transformaciones, como:

```js
option = {
  dataset: [
    {
      source: [] // The original data
    },
    {
      // Declare transforms in an array to pipe multiple transforms,
      // which makes them execute one by one and take the output of
      // the previous transform as the input of the next transform.
      transform: [
        {
          type: 'filter',
          config: { dimension: 'Product', value: 'Tofu' }
        },
        {
          type: 'sort',
          config: { dimension: 'Year', order: 'desc' }
        }
      ]
    }
  ],
  series: {
    type: 'pie',
    // Display the result of the piped transform.
    datasetIndex: 1
  }
};
```

> Nota: teóricamente, cualquier tipo de transformación puede tener múltiples datos de entrada y múltiples datos de salida. Pero cuando una transformación se encadena, solo puede tomar una entrada (excepto si es la primera transformación del encadenamiento) y producir una salida (excepto si es la última transformación del encadenamiento).

#### Salida de Múltiples Datos

En la mayoría de los casos, las funciones de transformación solo necesitan producir un dato. Pero en realidad, existen escenarios en los que una función de transformación necesita producir múltiples datos, cada uno de los cuales puede ser utilizado por diferentes series.

Por ejemplo, en la transformación incorporada de boxplot, además de los datos del boxplot producidos, también se generan los datos de los valores atípicos, los cuales pueden ser utilizados en una serie de dispersión. Ver el  [example](${exampleEditorPath}boxplot-light-velocity).

Usamos la propiedad [dataset.fromTransformResult](${optionPath}#dataset.fromTransformResult) para satisfacer este requerimiento. Por ejemplo:

```js
option = {
  dataset: [
    {
      // Original source data.
      source: []
    },
    {
      transform: {
        type: 'boxplot'
      }
      // After this "boxplot transform" two result data generated:
      // result[0]: The boxplot data
      // result[1]: The outlier data
      // By default, when series or other dataset reference this dataset,
      // only result[0] can be visited.
      // If we need to visit result[1], we have to use another dataset
      // as follows:
    },
    {
      // This extra dataset references the dataset above, and retrieves
      // the result[1] as its own data. Thus series or other dataset can
      // reference this dataset to get the data from result[1].
      fromDatasetIndex: 1,
      fromTransformResult: 1
    }
  ],
  xAxis: {
    type: 'category'
  },
  yAxis: {},
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      // Reference the data from result[0].
      datasetIndex: 1
    },
    {
      name: 'outlier',
      type: 'scatter',
      // Reference the data from result[1].
      datasetIndex: 2
    }
  ]
};
```

Además, [dataset.fromTransformResult](${optionPath}#dataset.fromTransformResult) y [dataset.transform](${optionPath}#dataset.transform) pueden aparecer en un mismo conjunto de datos, lo que significa que la entrada de la transformación proviene del resultado obtenido upstream especificado por `fromTransformResult`. Por ejemplo:

```js
{
  fromDatasetIndex: 1,
  fromTransformResult: 1,
  transform: {
    type: 'sort',
    config: { dimension: 2, order: 'desc' }
  }
}
```

#### Depuración en el Entorno de Desarrollo

Al usar la transformación de datos, podríamos encontrarnos con el problema de que el gráfico final no se muestra correctamente, pero no sabemos dónde está el error en la configuración. En este caso, una propiedad llamada  `transform.print` puede ser útil. (`transform.print` solo está disponible en el entorno de desarrollo).

```js
option = {
  dataset: [
    {
      source: []
    },
    {
      transform: {
        type: 'filter',
        config: {},
        // The result of this transform will be printed
        // in dev tool via `console.log`.
        print: true
      }
    }
  ]
};
```

## Transformación de Filtro

El tipo de transformación "filtro" es una transformación incorporada que proporciona un filtro de datos según las condiciones especificadas. La opción básica es la siguiente: Este es otro ejemplo de transformación de filtro:

```js live
option = {
  dataset: [
    {
      source: [
        ['Product', 'Sales', 'Price', 'Year'],
        ['Cake', 123, 32, 2011],
        ['Latte', 231, 14, 2011],
        ['Tofu', 235, 5, 2011],
        ['Milk Tee', 341, 25, 2011],
        ['Porridge', 122, 29, 2011],
        ['Cake', 143, 30, 2012],
        ['Latte', 201, 19, 2012],
        ['Tofu', 255, 7, 2012],
        ['Milk Tee', 241, 27, 2012],
        ['Porridge', 102, 34, 2012],
        ['Cake', 153, 28, 2013],
        ['Latte', 181, 21, 2013],
        ['Tofu', 395, 4, 2013],
        ['Milk Tee', 281, 31, 2013],
        ['Porridge', 92, 39, 2013],
        ['Cake', 223, 29, 2014],
        ['Latte', 211, 17, 2014],
        ['Tofu', 345, 3, 2014],
        ['Milk Tee', 211, 35, 2014],
        ['Porridge', 72, 24, 2014]
      ]
    },
    {
      transform: {
        type: 'filter',
        config: { dimension: 'Year', '=': 2011 }
        // The config is the "condition" of this filter.
        // This transform traverse the source data and
        // and retrieve all the items that the "Year"
        // is `2011`.
      }
    }
  ],
  series: {
    type: 'pie',
    datasetIndex: 1
  }
};
```

Este es otro ejemplo de transformación de filtro:

<md-example src="data-transform-filter"></md-example>

**Sobre la dimensión:**

La `config.dimension` de ser:

- El nombre de la dimensión declarado en el conjunto de datos, como `config: { dimension: 'Year', '=': 2011 }`. La declaración del nombre de la dimensión no es obligatoria.
- El índice de la dimensión (empezando desde 0), como`config: { dimension: 3, '=': 2011 }`.

**Sobre el operador relacional:**

El operador relacional puede ser:
`>`(`gt`), `>=`(`gte`), `<`(`lt`), `<=`(`lte`), `=`(`eq`), `!=`(`ne`, `<>`), `reg`. (El nombre entre paréntesis son alias). Siguen la semántica común. Además de la comparación común de números, existen algunas características adicionales:


- Varios operadores pueden aparecer en un solo ítem {} como `{ dimension: 'Price', '>=': 20, '<': 30 }`, lo que significa "y" lógico  (Price >= 20 y Price < 30).
- El valor de los datos puede ser una "cadena numérica". Una cadena numérica es una cadena que puede convertirse a número, como ' 123 '. Los espacios en blanco y los saltos de línea se recortarán automáticamente durante la conversión.
- Si necesitamos comparar una "instancia `Date` o una cadena de fecha (como '2012-05-12'), debemos especificar manualmente `parser: 'time'` como `config: { dimension: 3, lt: '2012-05-12', parser: 'time' }`.
- La comparación de cadenas puras está soportada pero solo se puede usar en `=`, `!=`. `>`, `>=`, `<`, `<=`  no soportan la comparación de cadenas puras (el "valor derecho" de los cuatro operadores no puede ser una "cadena").
- El operador `reg` se puede usar para hacer una prueba de expresión regular. Como usar`{ dimension: 'Name', reg: /\s+Müller\s*$/ }` para seleccionar todos los ítems de datos cuyo valor en la dimensión "Name" contenga el apellido Müller.

**Sobre la relación lógica:**

A veces también necesitamos expresar relaciones lógicas ( `and` / `or` / `not` ):

```js
option = {
  dataset: [
    {
      source: [
        // ...
      ]
    },
    {
      transform: {
        type: 'filter',
        config: {
          // Use operator "and".
          // Similarly, we can also use "or", "not" in the same place.
          // But "not" should be followed with a {...} rather than `[...]`.
          and: [
            { dimension: 'Year', '=': 2011 },
            { dimension: 'Price', '>=': 20, '<': 30 }
          ]
        }
        // The condition is "Year" is 2011 and "Price" is greater
        // or equal to 20 but less than 30.
      }
    }
  ],
  series: {
    type: 'pie',
    datasetIndex: 1
  }
};
```

`and`/`or`/`not` pueden estar anidados como:

```js
transform: {
  type: 'filter',
  config: {
    or: [{
      and: [{
        dimension: 'Price', '>=': 10, '<': 20
      }, {
        dimension: 'Sales', '<': 100
      }, {
        not: { dimension: 'Product', '=': 'Tofu' }
      }]
    }, {
      and: [{
        dimension: 'Price', '>=': 10, '<': 20
      }, {
        dimension: 'Sales', '<': 100
      }, {
        not: { dimension: 'Product', '=': 'Cake' }
      }]
    }]
  }
}
```

**Sobre el Parser:**

Se puede especificar un "parser" al hacer la comparación de valores. Actualmente, solo se soportan los siguientes:

- `parser: 'time'`: Convierte el valor a fecha y hora antes de compararlo. La regla del parser es la misma que `echarts.time.parse`, donde se soportan instancias de `Date` de JS, números de timestamp (en milisegundos) y cadenas de tiempo (como `'2012-05-12 03:11:22'`) para ser convertidos a números de timestamp, mientras que otros valores se convertirán a `NaN`.
- `parser: 'trim'`: Recorta la cadena antes de hacer la comparación. Para valores no string, se devuelve el valor original.
- `parser: 'number'`: Fuerza a convertir el valor a número antes de hacer la comparación. Si no es posible convertirlo a un número significativo, se convierte a `NaN`.  En la mayoría de los casos no es necesario, ya que por defecto el valor se convertirá automáticamente a número si es posible antes de hacer la comparación. Pero la conversión por defecto es estricta, mientras que este parser proporciona una estrategia más flexible. Si nos encontramos con un caso donde una cadena numérica tiene un sufijo de unidad (como `'33%'`, `12px`), debemos usar `parser: 'number'` para convertirlas a número antes de hacer la comparación.

Este es un ejemplo para mostrar el uso de `parser: 'time'`:

```js
option = {
  dataset: [
    {
      source: [
        ['Product', 'Sales', 'Price', 'Date'],
        ['Milk Tee', 311, 21, '2012-05-12'],
        ['Cake', 135, 28, '2012-05-22'],
        ['Latte', 262, 36, '2012-06-02'],
        ['Milk Tee', 359, 21, '2012-06-22'],
        ['Cake', 121, 28, '2012-07-02'],
        ['Latte', 271, 36, '2012-06-22']
        // ...
      ]
    },
    {
      transform: {
        type: 'filter',
        config: {
          dimension: 'Date',
          '>=': '2012-05',
          '<': '2012-06',
          parser: 'time'
        }
      }
    }
  ]
};
```

**Definición formal:**

Finalmente, damos la definición formal de la configuración de la transformación de filtro aquí:

```ts
type FilterTransform = {
  type: 'filter';
  config: ConditionalExpressionOption;
};
type ConditionalExpressionOption =
  | true
  | false
  | RelationalExpressionOption
  | LogicalExpressionOption;
type RelationalExpressionOption = {
  dimension: DimensionName | DimensionIndex;
  parser?: 'time' | 'trim' | 'number';
  lt?: DataValue; // less than
  lte?: DataValue; // less than or equal
  gt?: DataValue; // greater than
  gte?: DataValue; // greater than or equal
  eq?: DataValue; // equal
  ne?: DataValue; // not equal
  '<'?: DataValue; // lt
  '<='?: DataValue; // lte
  '>'?: DataValue; // gt
  '>='?: DataValue; // gte
  '='?: DataValue; // eq
  '!='?: DataValue; // ne
  '<>'?: DataValue; // ne (SQL style)
  reg?: RegExp | string; // RegExp
};
type LogicalExpressionOption = {
  and?: ConditionalExpressionOption[];
  or?: ConditionalExpressionOption[];
  not?: ConditionalExpressionOption;
};
type DataValue = string | number | Date;
type DimensionName = string;
type DimensionIndex = number;
```

> Nota: cuando se utiliza [Minimal Bundle](${lang}/basics/import#shrinking-bundle-size), si necesitas usar esta transformación incorporada, además del componente `Dataset` es necesario importar el componente `Transform`.

```ts
import {
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

echarts.use([
  DatasetComponent,
  TransformComponent
]);
```

## Transformación de Ordenación

Otra transformación incorporada es "sort".

```js
option = {
  dataset: [
    {
      dimensions: ['name', 'age', 'profession', 'score', 'date'],
      source: [
        [' Hannah Krause ', 41, 'Engineer', 314, '2011-02-12'],
        ['Zhao Qian ', 20, 'Teacher', 351, '2011-03-01'],
        [' Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
        ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
        [' Karle Neumann ', 25, 'Engineer', 253, '2011-04-02'],
        [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
        ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
        [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
        ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12']
      ]
    },
    {
      transform: {
        type: 'sort',
        // Sort by score.
        config: { dimension: 'score', order: 'asc' }
      }
    }
  ],
  series: {
    type: 'bar',
    datasetIndex: 1
  }
  // ...
};
```

<md-example src="data-transform-sort-bar"></md-example>

Algunas características adicionales sobre la "transformación de ordenación":

- Se admite el orden por múltiples dimensiones. Ver los ejemplos a continuación.
- La regla de ordenación:
  - Por defecto, los valores "numéricos" (es decir, números y cadenas numéricas como `' 123 '`) pueden ordenarse en orden numérico.
  - De lo contrario, las "cadenas no numéricas" también pueden ordenarse entre sí. Esto puede ser útil en casos como agrupar elementos de datos con la misma etiqueta, especialmente cuando participan múltiples dimensiones en la ordenación (ver el ejemplo a continuación).
  - Cuando se compara un "número" con una "cadena no numérica", o cualquiera de ellos se compara con otros tipos de valores, no son comparables. Por lo tanto, a este último se le llama "incomparable" y se trata como el "valor mínimo" o "valor máximo" según la propiedad `incomparable: 'min' | 'max'`. . Esta característica generalmente ayuda a decidir si se deben colocar los valores vacíos (como  `null`, `undefined`, `NaN`, `''`, `'-'`) u otros valores no válidos al principio o al final.
  - `parser: 'time' | 'trim' | 'number'` se puede usar, al igual que en la "transformación de filtro".
  - Si se pretende ordenar valores de tiempo (instancia `Date` de JS o cadenas de tiempo como `'2012-03-12 11:13:54'`), debe especificarse `parser: 'time'` como `config: { dimension: 'date', order: 'desc', parser: 'time' }`
  - Si se pretende ordenar valores con sufijos de unidad (como `'33%'`, `'16px'`),  es necesario usar `parser: 'number'`.

Ver un ejemplo de ordenación múltiple:

```js
option = {
  dataset: [
    {
      dimensions: ['name', 'age', 'profession', 'score', 'date'],
      source: [
        [' Hannah Krause ', 41, 'Engineer', 314, '2011-02-12'],
        ['Zhao Qian ', 20, 'Teacher', 351, '2011-03-01'],
        [' Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
        ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
        [' Karle Neumann ', 25, 'Engineer', 253, '2011-04-02'],
        [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
        ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
        [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
        ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12']
      ]
    },
    {
      transform: {
        type: 'sort',
        config: [
          // Sort by the two dimensions.
          { dimension: 'profession', order: 'desc' },
          { dimension: 'score', order: 'desc' }
        ]
      }
    }
  ],
  series: {
    type: 'bar',
    datasetIndex: 1
  }
  // ...
};
```

<md-example src="doc-example/data-transform-multiple-sort-bar"></md-example>

Finalmente, damos la definición formal de la configuración de la transformación de ordenación aquí:

```ts
type SortTransform = {
  type: 'sort';
  config: OrderExpression | OrderExpression[];
};
type OrderExpression = {
  dimension: DimensionName | DimensionIndex;
  order: 'asc' | 'desc';
  incomparable?: 'min' | 'max';
  parser?: 'time' | 'trim' | 'number';
};
type DimensionName = string;
type DimensionIndex = number;
```

> Nota: cuando se utiliza  [Minimal Bundle](${lang}/basics/import#shrinking-bundle-size), si necesitas usar esta transformación incorporada, además del componente `Dataset` es necesario importar el componente `Transform`.

```ts
import {
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

echarts.use([
  DatasetComponent,
  TransformComponent
]);
```

## Usar Transformaciones Externas

Además de las transformaciones incorporadas (como 'filtro', 'ordenación'), también podemos usar transformaciones externas para proporcionar funcionalidades más poderosas. Aquí usamos una biblioteca de terceros [ecStat](https://github.com/ecomfe/echarts-stat) como ejemplo:

Este caso muestra cómo hacer una línea de regresión mediante ecStat:

```js
// Register the external transform at first.
echarts.registerTransform(ecStatTransform(ecStat).regression);
```

```js
option = {
  dataset: [
    {
      source: rawData
    },
    {
      transform: {
        // Reference the registered external transform.
        // Note that external transform has a namespace (like 'ecStat:xxx'
        // has namespace 'ecStat').
        // built-in transform (like 'filter', 'sort') does not have a namespace.
        type: 'ecStat:regression',
        config: {
          // Parameters needed by the external transform.
          method: 'exponential'
        }
      }
    }
  ],
  xAxis: { type: 'category' },
  yAxis: {},
  series: [
    {
      name: 'scatter',
      type: 'scatter',
      datasetIndex: 0
    },
    {
      name: 'regression',
      type: 'line',
      symbol: 'none',
      datasetIndex: 1
    }
  ]
};
```

Ejemplos con echarts-stat:

- [Aggregate](${exampleEditorPath}data-transform-aggregate&edit=1&reset=1)
- [Bar histogram](${exampleEditorPath}bar-histogram&edit=1&reset=1)
- [Scatter clustering](${exampleEditorPath}scatter-clustering&edit=1&reset=1)
- [Scatter linear regression](${exampleEditorPath}scatter-linear-regression&edit=1&reset=1)
- [Scatter exponential regression](${exampleEditorPath}scatter-exponential-regression&edit=1&reset=1)
- [Scatter logarithmic regression](${exampleEditorPath}scatter-logarithmic-regression&edit=1&reset=1)
- [Scatter polynomial regression](${exampleEditorPath}scatter-polynomial-regression&edit=1&reset=1)
