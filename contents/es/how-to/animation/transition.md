# Transición de Datos


Apache ECharts<sup>TM</sup> aplicará transiciones en la posición, escala y forma al agregar, actualizar y eliminar datos. Esto hace que el gráfico sea más suave y muestra mejor las relaciones entre los datos. A menudo, el desarrollador no necesita preocuparse por cómo usar las animaciones, sino que simplemente usa `setOption` para actualizar los datos, y ECharts encontrará la diferencia con los datos anteriores y aplicará automáticamente la animación de transición más adecuada.

Por ejemplo, el siguiente ejemplo muestra la transición en una actualización programada de los datos de un gráfico circular.

```js live {layout: 'lr'}
function makeRandomData() {
  return [
    {
      value: Math.random(),
      name: 'A'
    },
    {
      value: Math.random(),
      name: 'B'
    },
    {
      value: Math.random(),
      name: 'C'
    }
  ];
}
option = {
  series: [
    {
      type: 'pie',
      radius: [0, '50%'],
      data: makeRandomData()
    }
  ]
};

setInterval(() => {
  myChart.setOption({
    series: {
      data: makeRandomData()
    }
  });
}, 2000);
```

## Configuración de Transiciones


Debido a que agregar y actualizar datos generalmente requiere animaciones diferentes, por ejemplo, esperamos que la animación de actualización sea más corta, ECharts distingue entre dos configuraciones de animación.

- Para agregar datos, aplicamos una animación de entrada, utilizando
`animationDuration`, `animationEasing`, y `animationDelay` para configurar la duración, el tipo de transición y el retraso de la animación, respectivamente.

- Para actualizar datos, aplicamos una animación de actualización con `animationDurationUpdate`, `animationEasingUpdate`, y `animationDelayUpdate` para configurar la duración, el tipo de transición y el retraso de la animación, respectivamente.


Como se puede ver, la configuración de la animación de actualización es la configuración de la animación de entrada con el sufijo `Update`.

> ECada vez que se usa setOption en ECharts, se realiza una comparación entre los datos actuales y los datos actualizados por última vez, y se ejecutan tres estados para los datos según el resultado de la comparación: agregar, actualizar y eliminar. Esta comparación se basa en el `name` de los datos. Por ejemplo, si la última actualización tenía tres  `names` de `'A'`, `'B'`, `'C'`, y la nueva actualización tiene `'B'`, `'C'`, `'D'`, entonces los datos `'B'`, `'C'`  se actualizarán, los datos `'A'` se eliminarán y los datos `' D'` se agregarán. Si es la primera vez que se usa `setOption`, como no hay datos anteriores, todos los datos se agregarán. Dependiendo de estos tres estados, ECharts aplicará las animaciones de entrada, actualización y salida respectivamente.

Todas estas configuraciones pueden establecerse a nivel superior de `option` para todos los series y componentes, o por separado para cada serie.

Si queremos desactivar las animaciones, simplemente podemos establecer `option.animation` a `false`.

### Duración de la Animación

`animationDuration` y `animationDurationUpdate` se usan para configurar la duración de la animación en milisegundos  `ms`. Establecer una duración de animación más larga permite que el usuario vea más claramente el efecto de la animación de transición, pero también debemos tener cuidado, ya que un tiempo demasiado largo puede hacer que el usuario pierda la paciencia mientras espera que la animación termine.

Un valor de `0` desactivará la animación, y esto se puede lograr estableciendo la configuración correspondiente en `0` individualmente cuando solo queramos desactivar la animación de entrada o de actualización.

### Función de Transición de la Animación

`animationEasing` y `animationEasingUpdate` se utilizan para configurar la función de suavizado de la animación, que es una función que toma el tiempo de la animación como entrada y genera el progreso de la animación.

```ts
(t: number) => number;
```

Las funciones de suavizado comunes como `'cubicIn'` and `'cubicOut'` están integradas en ECharts y se pueden usar directamente.

Funciones de suavizado integradas.

<md-example src="line-easing" width="100%" height="400" />

### Retraso de la Animación

`animationDelay` y `animationDelayUpdate` se usan para configurar el momento en que comienza el retraso de la animación. Normalmente utilizamos una función de devolución de llamada para establecer diferentes retrasos para diferentes datos y lograr el efecto de animaciones escalonadas:

```ts live { layout: 'lr' }
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('A' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
option = {
  legend: {
    data: ['bar', 'bar2']
  },
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      data: data1,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10;
      }
    },
    {
      name: 'bar2',
      type: 'bar',
      data: data2,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10 + 100;
      }
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function(idx) {
    return idx * 5;
  }
};
```

## Optimización del Rendimiento de las Animaciones

Cuando la cantidad de datos es particularmente grande, ejecutar animaciones puede generar problemas de rendimiento, por lo que podemos establecer `animation: false` para desactivar la animación.

Para gráficos donde la cantidad de datos cambia dinámicamente, se recomienda usar la configuración `animationThreshold` que permite a ECharts desactivar automáticamente la animación cuando el número de gráficos en el lienzo supera este umbral para mejorar el rendimiento del dibujo. Este es un valor empírico, y ECharts generalmente es capaz de renderizar miles de gráficos en tiempo real (el valor predeterminado también se establece en 2000), pero si tus gráficos son complejos, o tu entorno de usuario es muy exigente y hay mucho otro código complejo ejecutándose en la página al mismo tiempo, puede ser apropiado ajustar este valor hacia abajo para garantizar la suavidad de toda la aplicación.

## Escuchar el Fin de la Animación

A veces queremos obtener el resultado del renderizado actual, si no se utiliza animación, ECharts realizará el renderizado directamente después de `setOption` y podemos usar el método  `getDataURL` para obtener el resultado de manera sincrónica.

```ts
const chart = echarts.init(dom);
chart.setOption({
  animation: false
  //...
});
// can be executed directly and synchronously
const dataUrl = chart.getDataURL();
```

Pero si el gráfico está animado, ejecutar  `getDataURL`de inmediato nos dará la imagen al comienzo de la animación, no el resultado final. Así que necesitamos saber cuándo ha terminado la animación y luego ejecutar `getDataURL` para obtener el resultado.

Si estás seguro de la duración de la animación, una manera más simple y drástica es retrasar la ejecución con `setTimeout` según la duración de la animación:

```ts
chart.setOption({
  animationDuration: 1000
  //...
});
setTimeout(() => {
  const dataUrl = chart.getDataURL();
}, 1000);
```

Alternativamente, podemos usar el evento  `rendered` proporcionado por ECharts para determinar que ECharts ha terminado de animar y ha detenido el renderizado:

```ts
chart.setOption({
  animationDuration: 1000
  //...
});

function onRendered() {
  const dataUrl = chart.getDataURL();
  // ...
  // This event will also be triggered if there is a subsequent interaction and the interaction is redrawn, so it needs to be removed when you're done using it
  chart.off('rendered', onRendered);
}
chart.on('rendered', onRendered);
```
