# Axis

El sistema de coordenadas cartesianas tiene los ejes x/y.

## x-axis, y-axis

Tanto el eje x como el eje y incluyen la línea del eje, las marcas, las etiquetas y el título. Algunos gráficos usan la cuadrícula para ayudar a visualizar y calcular los datos.

<img max-width="830" width="100%" height="100%"
src="images/design/axis/charts_axis_img02.jpg">
</img>

Un sistema de coordenadas 2D normal tiene el eje x y el eje y. El eje x generalmente se encuentra en la parte inferior, mientras que el eje y se encuentra en el lado izquierdo. La configuración se muestra a continuación:

```js
option = {
  xAxis: {
    // ...
  },
  yAxis: {
    // ...
  }
  // ...
};
```
El eje x generalmente se usa para declarar la cantidad de categorías, que también se llaman los aspectos para observar los datos: "Hora de venta", "Ubicación de venta" y "nombre del producto", etc. El eje y generalmente se usa para indicar el valor numérico de las categorías. Estos datos se usan para examinar el valor cuantitativo de un tipo específico de datos o algún indicador que necesitas analizar, como "Cantidad de ventas" y "Precio de venta".

```js
option = {
  xAxis: {
    type: 'time',
    name: 'Sales Time'
    // ...
  },
  yAxis: {
    type: 'value',
    name: 'Sales Quantity'
    // ...
  }
  // ...
};
```

Cuando el eje x tiene un rango grande, podemos usar el método de zoom para mostrar una parte de los datos en el gráfico.

```js
option = {
  xAxis: {
    type: 'time',
    name: 'Sales Time'
    // ...
  },
  yAxis: {
    type: 'value',
    name: 'Sales Quantity'
    // ...
  },
  dataZoom: []
  // ...
};
```

En los datos bidimensionales, puede haber más de dos ejes. Generalmente, hay dos ejes x o y al mismo tiempo en ECharts. Puedes cambiar la configuración [offset](${optionPath}xAxis.offset) para evitar la superposición de los ejes en el mismo lugar. Los ejes x pueden mostrarse en la parte superior e inferior, y los ejes y a la izquierda y a la derecha.

```js
option = {
  xAxis: {
    type: 'time',
    name: 'Sales Time'
    // ...
  },
  yAxis: [
    {
      type: 'value',
      name: 'Sales Quantity'
      // ...
    },
    {
      type: 'value',
      name: 'Sales Price'
      // ...
    }
  ]
  // ...
};
```

## Axis Line

ECharts proporciona la configuración de [axisLine](${optionPath}xAxis.axisLine).Puedes cambiar la configuración según lo que necesites, como agregar flechas en ambos lados o modificar el estilo de los ejes.

```js
option = {
  xAxis: {
    axisLine: {
      symbol: 'arrow',
      lineStyle: {
        type: 'dashed'
        // ...
      }
    }
    // ...
  },
  yAxis: {
    axisLine: {
      symbol: 'arrow',
      lineStyle: {
        type: 'dashed'
        // ...
      }
    }
  }
  // ...
};
```

## Tick

ECharts proporciona la configuración de [axisTick](${optionPath}xAxis.axisTick).Puedes modificar la configuración según lo que necesites, como la longitud de las marcas y el estilo de las mismas.

```js
option = {
  xAxis: {
    axisTick: {
      length: 6,
      lineStyle: {
        type: 'dashed'
        // ...
      }
    }
    // ...
  },
  yAxis: {
    axisTick: {
      length: 6,
      lineStyle: {
        type: 'dashed'
        // ...
      }
    }
  }
  // ...
};
```

## Label

ECharts proporciona la configuración de [axisLabel](${optionPath}xAxis.axisLabel). Puedes modificar la configuración según lo que necesites, como la alineación del texto y el contenido de las etiquetas personalizadas.

```js
option = {
  xAxis: {
    axisLabel: {
      formatter: '{value} kg',
      align: 'center'
      // ...
    }
    // ...
  },
  yAxis: {
    axisLabel: {
      formatter: '{value} ¥',
      align: 'center'
      // ...
    }
  }
  // ...
};
```

## Ejemplo

El eje y del lado izquierdo representa la temperatura promedio mensual en Tokio, el eje y del lado derecho representa la precipitación en Tokio. El eje x representa el tiempo. Refleja la tendencia y la relación entre la temperatura promedio y la precipitación.

```js live
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        rotate: 30
      },
      data: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      position: 'right',
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      position: 'left',
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Precipitation',
      type: 'bar',
      yAxisIndex: 0,
      data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
    },
    {
      name: 'Temperature',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [
        6.0,
        10.2,
        10.3,
        11.5,
        10.3,
        13.2,
        14.3,
        16.4,
        18.0,
        16.5,
        12.0,
        5.2
      ]
    }
  ]
};
```

Estas son las instrucciones concisas sobre el uso de la configuración de ejes. Consulta más detalles en: [Official Website](${optionPath}xAxis).
