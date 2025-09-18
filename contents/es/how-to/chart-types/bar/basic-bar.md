# Gráfico de Barras Básico

El gráfico de barras es un gráfico que presenta comparaciones entre datos discretos. La longitud de las barras está proporcionalmente relacionada con los datos categóricos.

Para configurar el gráfico de barras, necesitas establecer el type de `type` of `series` como `'bar'`.

[[Option]](${optionPath}series-bar)

## Ejemplo Simple

Comencemos con un gráfico de barras básico:

```js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

En este caso, el eje x es de tipo categoría. Por lo tanto, debes definir algunos valores correspondientes para `'xAxis'`. Mientras tanto, el tipo de datos del eje y es numérico. El rango del eje y se generará automáticamente a partir de la `data` en `'series'`.

## Gráfico de Barras con Múltiples Series

Puedes usar varias series para representar un grupo de datos relacionados. Para mostrar múltiples series en el mismo gráfico, necesitas agregar un arreglo más bajo la propiedad `series`.

```js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    },
    {
      type: 'bar',
      data: [26, 24, 18, 22, 23, 20, 27]
    }
  ]
};
```

## Gráfico de Barras Personalizado

### Estilos

Es una buena idea instalar el estilo del gráfico de barras utilizando  ['series.itemStyle'](${optionPath}series-bar.itemStyle). Descripción del SCI::

- Color de la columna(`'color'`);
- Color del borde(`'borderColor'`), ancho(`'borderWidth'`), tipo(`'borderType'`) de la columna;
- Radio de borde de la columna (`'barBorderRadius'`);
- Transparencia(`'opacity'`);
- Tipo de sombra(`'shadowBlur'`, `'shadowColor'`, `'shadowOffsetX'`, `'shadowOffsetY'`)

Aquí tienes un ejemplo:


```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [
        10,
        22,
        28,
        {
          value: 43,
          // Specify the style for single bar
          itemStyle: {
            color: '#91cc75',
            shadowColor: '#91cc75',
            borderType: 'dashed',
            opacity: 0.5
          }
        },
        49
      ],
      itemStyle: {
        barBorderRadius: 5,
        borderWidth: 1,
        borderType: 'solid',
        borderColor: '#73c0de',
        shadowColor: '#5470c6',
        shadowBlur: 3
      }
    }
  ]
};
```

En este caso, definimos el estilo del gráfico de barras usando `'itemStyle'` de la correspondiente  `series`. Para obtener más detalles sobre los elementos de configuración y su uso, consulta el manual de configuración: [`series.itemStyle`](${optionPath}series-bar.itemStyle)。

### Ancho y Alto de la Columna

Puedes usar  [`barWidth`](${optionPath}#series-bar.barWidth) para cambiar el ancho de la barra. Por ejemplo, en el siguiente caso `'barWidth'` se establece en  `'20%'`. Esto indica que el ancho de cada barra es el 20% del ancho de la categoría. Como hay 5 datos en cada serie, el 20% de `'barWidth'` significa el 4% del ancho total del eje x.

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [10, 22, 28, 43, 49],
      barWidth: '20%'
    }
  ]
};
```

Además, [`barMaxWidth`](${optionPath}series-bar.barMaxWidth) limita el ancho máximo de la barra. Para algunos valores pequeños, puedes declarar una altura mínima para la barra [`barMinHeight`](${optionPath}series-bar.barMinHeight).  Cuando la altura correspondiente de los datos sea más pequeña que el límite, ECharts tomará 'barMinHeight' como la altura reemplazada.

### Espaciado entre Columnas

Hay dos tipos de espaciado entre columnas. Uno es el espaciado entre diferentes series bajo la misma categoría: [`barGap`](${optionPath}series-bar.barGap). El otro es el espaciado entre categorías: [`barCategoryGap`](${optionPath}series-bar.barCategoryGap).

```js live
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 18],
      barGap: '20%',
      barCategoryGap: '40%'
    },
    {
      type: 'bar',
      data: [12, 14, 9, 9, 11]
    }
  ]
};
```

En este caso, el `barGap` es `'20%'`.  Esto significa que la distancia entre las barras de la misma categoría es el 20% del ancho de la barra. Por ejemplo, si establecemos el `barCategoryGap` en `'40%'`, el espacio en cada lado de la barra ocupará un 40% del espacio en las categorías (en comparación con el ancho de la columna).

Generalmente, no es necesario especificar  `barWidth` si se configuran `'barGap'` y `barCategoryGap` Si necesitas asegurarte de que la barra no sea demasiado ancha mientras el gráfico es grande, intenta usar `barMaxWidth` para limitar el ancho máximo de las barras.

> En el mismo sistema de coordenadas cartesianas, la propiedad será compartida por varias series de barras. Para asegurarte de que tenga efecto en el gráfico, establece la propiedad en la última serie de barras del sistema.

### Agregar Color de Fondo a las Barras

A veces, puede que quieras cambiar el color de fondo de las barras. Después de ECharts v4.7.0, esta función se puede habilitar mediante ['showBackground'](${optionPath}series-bar.showBackground) y configurar mediante ['backgroundStyle'](${optionPath}series-bar.backgroundStyle).

```js live
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      }
    }
  ]
};
```
