# Leyenda

Las leyendas se utilizan para anotar el contenido del gráfico utilizando diferentes colores, formas y textos para indicar distintas categorías. Al hacer clic en las leyendas, el usuario puede mostrar u ocultar las categorías correspondientes. La leyenda es clave para entender el gráfico.

## Diseño

La leyenda siempre se coloca en la esquina superior derecha del gráfico. Todas las leyendas en la misma página deben ser consistentes, alineándose horizontal o verticalmente según el diseño general del espacio del gráfico. Cuando el gráfico tiene poco espacio vertical o el área de contenido está congestionada, también es una buena opción colocar la leyenda en la parte inferior del gráfico. A continuación se muestran algunos diseños de leyenda:

```js live
option = {
  legend: {
    // Try 'horizontal'
    orient: 'vertical',
    right: 10,
    top: 'center'
  },
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```
Usa un control desplazable si hay muchas leyendas.


```js
option = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    data: ['Legend A', 'Legend B', 'Legend C' /* ... */, , 'Legend x']
    // ...
  }
  // ...
};
```

## Estilo

Para fondos de color oscuro, utiliza un color claro para la capa de fondo y el texto mientras cambias el fondo a translúcido.

```js
option = {
  legend: {
    data: ['Legend A', 'Legend B', 'Legend C'],
    backgroundColor: '#ccc',
    textStyle: {
      color: '#ccc'
      // ...
    }
    // ...
  }
  // ...
};
```

El color de la leyenda tiene muchas formas de diseñarse. Para diferentes gráficos, el estilo de la leyenda puede ser distinto.

<img max-width="830" width="80%" height="80%" src="images/design/legend/charts_sign_img04.png" />

```js
option = {
  legend: {
    data: ['Legend A', 'Legend B', 'Legend C'],
    icon: 'rect'
    // ...
  }
  // ...
};
```

## Interactivo

Dependiendo de la demanda ambiental, la leyenda puede soportar operaciones interactivas. Haz clic en la leyenda para mostrar u ocultar las categorías correspondientes:

```js
option = {
  legend: {
    data: ['Legend A', 'Legend B', 'Legend C'],
    selected: {
      'Legend A': true,
      'Legend B': true,
      'Legend C': false
    }
    // ...
  }
  // ...
};
```

## Consejos

La leyenda debe utilizarse según la situación. Algunos gráficos de doble eje incluyen varios tipos de gráficos. Los diferentes tipos de leyenda deben distinguirse.

```js
option = {
  legend: {
    data: [
      {
        name: 'Legend A',
        icon: 'rect'
      },
      {
        name: 'Legend B',
        icon: 'circle'
      },
      {
        name: 'Legend C',
        icon: 'pin'
      }
    ]
    //  ...
  },
  series: [
    {
      name: 'Legend A'
      //  ...
    },
    {
      name: 'Legend B'
      //  ...
    },
    {
      name: 'Legend C'
      //  ...
    }
  ]
  //  ...
};
```

Cuando hay solo un tipo de dato en el gráfico, usa el título del gráfico en lugar de la leyenda para explicarlo.
