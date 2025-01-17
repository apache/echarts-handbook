# Texto Enriquecido

El texto enriquecido se puede utilizar en las etiquetas de las series, ejes u otros componentes de Apache ECharts™ desde la versión 3.7. Esta característica admite:

- Estilos de caja (fondo, borde, sombra, etc.), rotación y posición de un bloque de texto pueden especificarse.
- Se pueden personalizar estilos (color, fuente, ancho/alto, fondo, sombra, etc.) y alineación en fragmentos de texto.
- Se pueden usar imágenes en el texto como íconos o fondo.
- Combinando estas configuraciones, se pueden crear efectos especiales, como tablas simples o reglas horizontales (hr).

Al principio, es importante aclarar los significados de dos términos que se utilizarán a continuación:

- Text Block: Todo el bloque de texto de la etiqueta.
- Text fragment: Una parte del texto en un bloque de texto.

Por ejemplo:

<md-example src="doc-example/text-block-fragment" width="450" height="300"></md-example>

## Opciones sobre el texto

ECharts proporciona muchas opciones de texto, incluyendo:

- Basic font style: `fontStyle`, `fontWeight`, `fontSize`, `fontFamily`.
- Fill of text: `color`.
- Stroke of text: `textBorderColor`, `textBorderWidth`.
- Shadow of text: `textShadowColor`, `textShadowBlur`, `textShadowOffsetX`, `textShadowOffsetY`.
- Box size of text block or text fragment: `lineHeight`, `width`, `height`, `padding`.
- Alignment of text block or text fragment: `align`, `verticalAlign`.
- Border, background (color or image) of text block or text fragment: `backgroundColor`, `borderColor`, `borderWidth`, `borderRadius`.
- Shadow of text block or text fragment: `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`.
- Position and rotation of text block: `position`, `distance`, `rotate`.


El usuario puede definir estilos para un fragmento de texto en la propiedad `rich` property. Por ejemplo, [series-bar.label.rich](option.html#series-bar.label.rich)

Por ejemplo:

```js
labelOption = {
  // Styles defined in 'rich' can be applied to some fragments
  // of text by adding some markers to those fragment, like
  // `{styleName|text content text content}`.
  // `'\n'` is the newline character.
  formatter: [
    '{a|Style "a" is applied to this fragment}',
    '{b|Style "b" is applied to this fragment}This fragment use default style{x|use style "x"}'
  ].join('\n'),

  // Styles for the whole text block are defined here:
  color: '#333',
  fontSize: 5,
  fontFamily: 'Arial',
  borderWidth: 3,
  backgroundColor: '#984455',
  padding: [3, 10, 10, 5],
  lineHeight: 20,

  // Styles for text fragments are defined here:
  rich: {
    a: {
      color: 'red',
      lineHeight: 10
    },
    b: {
      backgroundColor: {
        image: 'xxx/xxx.jpg'
      },
      height: 40
    },
    x: {
      fontSize: 18,
      fontFamily: 'Microsoft YaHei',
      borderColor: '#449933',
      borderRadius: 4
    }
    // ...
  }
};
```

> Notice: `width` and `height` only work when `rich` specified.

## Estilos básicos de texto, bloque de texto y fragmento de texto

El estilo básico de la fuente se puede establecer en el texto: `fontStyle`, `fontWeight`, `fontSize`, `fontFamily`.

El color de relleno y el color de contorno se pueden establecer en el texto: `color`, `textBorderColor`, `textBorderWidth`.

El estilo de borde y el fondo se pueden establecer en el bloque de texto: `borderColor`, `borderWidth`, `backgroundColor`, `padding`.

El estilo de borde y el fondo también se pueden establecer en el fragmento de texto: `borderColor`, `borderWidth`, `backgroundColor`, `padding`.

Ejemplo:

```js live
option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 1,
      data: [
        {
          value: [0, 0],
          label: {
            show: true,
            formatter: [
              'Plain text',
              '{textBorder|textBorderColor + textBorderWidth}',
              '{textShadow|textShadowColor + textShadowBlur + textShadowOffsetX + textShadowOffsetY}',
              '{bg|backgroundColor + borderRadius + padding}',
              '{border|borderColor + borderWidth + borderRadius + padding}',
              '{shadow|shadowColor + shadowBlur + shadowOffsetX + shadowOffsetY}'
            ].join('\n'),
            backgroundColor: '#eee',
            borderColor: '#333',
            borderWidth: 2,
            borderRadius: 5,
            padding: 10,
            color: '#000',
            fontSize: 14,
            shadowBlur: 3,
            shadowColor: '#888',
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            lineHeight: 30,
            rich: {
              textBorder: {
                fontSize: 20,
                textBorderColor: '#000',
                textBorderWidth: 3,
                color: '#fff'
              },
              textShadow: {
                fontSize: 16,
                textShadowBlur: 5,
                textShadowColor: '#000',
                textShadowOffsetX: 3,
                textShadowOffsetY: 3,
                color: '#fff'
              },
              bg: {
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                padding: 5
              },
              border: {
                color: '#000',
                borderColor: '#449911',
                borderWidth: 1,
                borderRadius: 3,
                padding: 5
              },
              shadow: {
                backgroundColor: '#992233',
                padding: 5,
                color: '#fff',
                shadowBlur: 5,
                shadowColor: '#336699',
                shadowOffsetX: 6,
                shadowOffsetY: 6
              }
            }
          }
        }
      ]
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: -1,
    max: 1
  }
};
```

## Posición de la etiqueta

La opción `label`  se puede usar en gráficos como `bar`, `line`, `scatter`, etc. La posición de una etiqueta se puede especificar mediante [label.position](option.html#series-scatter.label.position)、[label.distance](option.html#series-scatter.label.distance).

Prueba a modificar la opción  `position` y `distance` en el siguiente ejemplo:

```js live
option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 160,
      symbol: 'roundRect',
      data: [[1, 1]],
      label: {
        // Options: 'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        position: 'top',
        distance: 10,

        show: true,
        formatter: ['Label Text'].join('\n'),
        backgroundColor: '#eee',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        shadowBlur: 3,
        shadowColor: '#888',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        textBorderColor: '#000',
        textBorderWidth: 3,
        color: '#fff'
      }
    }
  ],
  xAxis: {
    max: 2
  },
  yAxis: {
    max: 2
  }
};
```

> Nota, existen diferentes valores opcionales de `position` según el tipo de gráfico. Y  `distance` no es compatible con todos los gráficos. Se puede consultar más información detallada en el [option doc](${mainSitePath}option.html).

## Rotación de Etiquetas

En algunos casos, es necesario rotar las etiquetas. Por ejemplo:

```js live {layout: 'lr'}
const labelOption = {
  show: true,
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

option = {
  xAxis: [
    {
      type: 'category',
      data: ['2012', '2013', '2014', '2015', '2016']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    }
  ]
};
```

[align](option.html#series-bar.label.align) y [verticalAlign](option.html#series-bar.label.verticalAlign) pueden usarse para ajustar la ubicación de la etiqueta en este caso.

Nota, `align` y `verticalAlign`se aplican primero, luego se rota.

## Diseño y Alineación de Fragmentos de Texto

Para entender la regla de diseño, se puede imaginar cada fragmento de texto como un elemento `inline-block` en CSS.

El  `content box size` de un fragmento de texto está determinado por su tamaño de fuente por defecto. También se puede especificar directamente mediante `width` y `height`, aunque rara vez se establece. El  `border box size` de un fragmento de texto se calcula añadiendo el `border box size` y `padding`.

Solo `'\n'` es el carácter de nueva línea, que rompe una línea.

Existen múltiples fragmentos de texto en una sola línea. La altura de la línea está determinada por el mayor `lineHeight` de los fragmentos de texto. El `lineHeight` de un fragmento de texto puede especificarse en `rich`,  o en el nivel superior de `rich`, de lo contrario, se usa el `box size` del fragmento de texto.

Con el  `lineHeight`  determinado, la posición vertical de los fragmentos de texto puede determinarse mediante `verticalAlign` (existe una pequeña diferencia respecto a la regla en CSS):

- `'bottom'`: El borde inferior del fragmento de texto se adhiere al borde inferior de la línea.
- `'top'`: El borde superior del fragmento de texto se adhiere al borde superior de la línea.
- `'middle'`: En el centro de la línea.

El ancho de un bloque de texto puede especificarse mediante  `width`, de lo contrario, se determinará por la línea más larga. Con el ancho determinado, los fragmentos de texto se colocan en cada línea, y la posición horizontal de los fragmentos de texto puede determinarse mediante su `align`.

- Primero, coloca los fragmentos de texto cuyo `align` sea `'left'` de izquierda a derecha de forma continua.
- En segundo lugar, coloca los fragmentos de texto cuyo `align` sea `'right'` de derecha a izquierda de forma continua.
- Finalmente, los fragmentos de texto restantes se colocan en el centro del espacio restante.

La posición del texto en un fragmento de texto:

- Si `align` es `'center'`, el texto se alinea en el centro del cuadro del fragmento de texto.
- Si `align` es `'left'`,  el texto se alinea a la izquierda del cuadro del fragmento de texto.
- Si `align` es `'right'`, el texto se alinea a la derecha del cuadro del fragmento de texto.

## Efectos: Icono, Regla Horizontal, Bloque de Título, Tabla Simple

Mira el ejemplo:


```js live {layout: 'lr'}
option = {
  series: [
    {
      type: 'scatter',
      data: [
        {
          value: [0, 0],
          label: {
            formatter: [
              '{tc|Center Title}{titleBg|}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        },
        {
          value: [0, 1],
          label: {
            formatter: [
              '{titleBg|Left Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n')
          }
        },
        {
          value: [0, 2],
          label: {
            formatter: [
              '{titleBg|Right Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        }
      ],
      symbolSize: 1,
      label: {
        show: true,
        backgroundColor: '#ddd',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000',
        fontSize: 14,
        rich: {
          titleBg: {
            backgroundColor: '#000',
            height: 30,
            borderRadius: [5, 5, 0, 0],
            padding: [0, 10, 0, 10],
            width: '100%',
            color: '#eee'
          },
          tc: {
            align: 'center',
            color: '#eee'
          },
          hr: {
            borderColor: '#777',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          sunny: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/sunny_128.png'
            }
          },
          cloudy: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/cloudy_128.png'
            }
          },
          showers: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/showers_128.png'
            }
          }
        }
      }
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: 0,
    max: 2,
    inverse: true
  }
};
```

Icon is implemented by using image in `backgroundColor`.

```js
rich: {
    Sunny: {
        backgroundColor: {
            image: './data/asset/img/weather/sunny_128.png'
        },
        // Can only height specified, but leave width auto obtained
        // from the image, where the aspect ratio kept.
        height: 30
    }
}
```

Horizontal rule (like HTML &lt;hr&gt; tag) can be implemented by border:

```js
rich: {
    hr: {
        borderColor: '#777',
        // width is set as '100%' to fullfill the text block.
        // Notice, the percentage is based on the content box, without
        // padding. Although it is a little different from CSS rule,
        // it is convinent in most cases.
        width: '100%',
        borderWidth: 0.5,
        height: 0
    }
}
```

Title block can be implemented by `backgroundColor`:

```js
// Title is at left.
formatter: '{titleBg|Left Title}',
rich: {
    titleBg: {
        backgroundColor: '#000',
        height: 30,
        borderRadius: [5, 5, 0, 0],
        padding: [0, 10, 0, 10],
        width: '100%',
        color: '#eee'
    }
}

// Title is in the center of the line.
// This implementation is a little tricky, but is works
// without more complicated layout mechanism involved.
formatter: '{tc|Center Title}{titleBg|}',
rich: {
    titleBg: {
        align: 'right',
        backgroundColor: '#000',
        height: 30,
        borderRadius: [5, 5, 0, 0],
        padding: [0, 10, 0, 10],
        width: '100%',
        color: '#eee'
    }
}
```
Una tabla simple se puede implementar especificando el mismo ancho para los fragmentos de texto que están en la misma columna de diferentes líneas. Consulta el [example](${exampleEditorPath}pie-rich-text).
