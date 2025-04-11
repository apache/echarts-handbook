# Gráfico de Dispersión Básico

El gráfico de dispersión, un tipo de gráfico ampliamente utilizado, se construye con varios "puntos". Estos puntos a veces representan la posición del valor en el sistema de coordenadas (sistema de coordenadas cartesiano, sistema de coordenadas geográficas, etc.), y otras veces el tamaño y color de los elementos pueden mapearse al valor, representando datos de alta dimensionalidad.

## Ejemplo Simple

El siguiente ejemplo es una configuración básica de un gráfico de dispersión con el eje x como categoría y el eje y como valor:

```js live
option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};
```

## Gráfico de Dispersión en Sistema de Coordenadas Cartesianas

En el caso anterior, el eje x del gráfico de dispersión es un eje de categoría discreto y el eje y es un eje de valor continuo. Sin embargo, el escenario normal para el gráfico de dispersión es tener dos ejes de valor continuo (también conocido como el sistema de coordenadas cartesianas). El tipo de serie es diferente en que tanto el valor del eje x como el del eje y están incluidos en  `data`, pero no en `xAxis` ni en  `yAxis`.

```js live
option = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [
        [10, 5],
        [0, 8],
        [6, 10],
        [2, 12],
        [8, 9]
      ]
    }
  ]
};
```

## Gráfico de dispersión personalizado

### Estilo de símbolo

El símbolo se refiere a la forma del ítem en un gráfico de dispersión. Hay tres tipos de configuraciones disponibles. El primero es la forma incorporada en ECharts, el segundo es una imagen, y el último es el path SVG.

Las formas incorporadas en ECharts incluyen: `'circle'`, `'rect'`(rectangle), `'roundRect'`(rounded rectangle), `'triangle'`, `'diamond'`, `'pin'` and `'arrow'`. To use built-in shapes, you need to state the `symbol`  con la cadena correspondiente.

Si deseas definir la forma como cualquier imagen, puedes usar `'image'` seguido de la ruta, por ejemplo, `'image://http://example.com/xxx.png'` o `'image://./xxx.png'`.

El `symbol` de ECharts también admite gráficos vectoriales SVG. Puedes definir el  `symbol` como una ruta de archivo SVG que comienza con `'path://'` para ubicar los gráficos vectoriales. Las ventajas de los gráficos vectoriales son su tamaño más pequeño y que no presentan bordes dentados o borrosos.

Método para encontrar el path SVG: Abre un archivo `SVG` busca un path similar a `<path d="M… L…"></path>`; agrega el valor de `d`'después de `'path://'`. Veamos cómo definir un ítem con la forma vectorial de un corazón.

Primero, necesitamos un archivo `SVG` de un corazón. Puedes dibujarlo con un software de edición vectorial, o descargar uno de internet. Aquí está el contenido:

```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve">
    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"/>
</svg>
```

En ECharts, define el  `symbol` como el path de d:

```js live
option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310],
      symbolSize: 20,
      symbol:
        'path://M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'
    }
  ]
};
```

De esta manera, tenemos un gráfico con la forma vectorial de un corazón.

### Tamaño del símbolo

El tamaño del símbolo se define con [`series.symbolSize`](${optionPath}series-scatter.symbolSize). Puede ser un valor en píxeles que represente el tamaño del ítem, o un arreglo que incluya dos números para definir el ancho y la altura.

Además, puede definirse como una función de retorno de llamada. Aquí tienes un ejemplo del formato:


```ts
(value: Array | number, params: Object) => number | Array;
```

El primer argumento es el valor de los datos, y el segundo argumento incluye otros parámetros del ítem de datos. En el siguiente ejemplo, definimos el tamaño del ítem en proporción al valor de los datos.

```js live
option = {
  xAxis: {
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  yAxis: {},
  series: [
    {
      type: 'scatter',
      data: [220, 182, 191, 234, 290, 330, 310],
      symbolSize: function(value) {
        return value / 10;
      }
    }
  ]
};
```
