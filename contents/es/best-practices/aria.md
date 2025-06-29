
# Accesibilidad Web

[WAI-ARIA](https://www.w3.org/WAI/intro/aria), la Suite de Aplicaciones Web Ricas Accesibles desarrollada por W3C, define una manera de hacer que el contenido web y las aplicaciones web sean más accesibles para personas con discapacidades.

ECharts 4.0 cumplió con esta especificación y soporta la generación de una descripción basada en la configuración del gráfico de manera inteligente, permitiendo que las personas con discapacidades visuales comprendan el contenido del gráfico con la ayuda de dispositivos lectores. Apache ECharts 5 soporta patrones de decalques que permiten distinguir los datos del gráfico mediante patrones además del color, ofreciendo una mejor experiencia a personas con daltonismo. 

Esta función de accesibilidad está desactivada por defecto. Se puede activar configurando el valor de [aria.show](${optionPath}aria.show) a  `true`.

## Etiquetas de Gráficos


Después de configurar [aria.show](${optionPath}aria.show) a `true`, ECharts generará automáticamente una descripción del gráfico según el título, el gráfico, los datos, etc. Los usuarios también pueden configurar la descripción manualmente a través del objeto de configuración.

Ejemplo de objeto de configuración:

```js
option = {
  aria: {
    show: true
  },
  title: {
    text: 'Referrer of a User',
    x: 'center'
  },
  series: [
    {
      name: 'Referrer',
      type: 'pie',
      data: [
        { value: 335, name: 'Direct Visit' },
        { value: 310, name: 'Email Marketing' },
        { value: 234, name: 'Union Ad' },
        { value: 135, name: 'Video Ad' },
        { value: 1548, name: 'Search Engine' }
      ]
    }
  ]
};
```

<md-example src="doc-example/aria-pie"></md-example>

Al habilitar aria, se agregará un atributo `aria-label` al HTML del gráfico. Los lectores de pantalla utilizan este atributo para describir el contenido; este gráfico tendría la siguiente descripción:

```
This is a chart about "Referrer of a User" with type Pie chart named Referrer. The data is as follows: the data of Direct Visit is 335,the data of Mail Marketing is 310,the data of Union Ad is 234,the data of Video Ad is 135,the data of Search Engine is 1548.
```

El lenguaje configurado se utilizará para generar la descripción.


### Personalizando el Título


El  aria-label comienza con una descripción general. Hay dos plantillas,   [aria.general.withTitle](${optionPath}aria.general.withTitle) que se utilizan cuando existe  [title.text](${optionPath}title.text) y [aria.general.withoutTitle](${optionPath}aria.general.withoutTitle) para cuando no se define `title.text`.

En la plantilla `withTitle`, la cadena `{title}` se reemplaza por  [title.text](${optionPath}title.text). La plantilla `This is a chart named {title}` with a title of `Referrer of a User` generearia `This is a chart named Referrer of a User`. 


### Personalizando la Descripción

La descripción de la serie y los datos se añaden después del título. Para algunos gráficos, la descripción predeterminada no puede mostrar toda la información en el gráfico. En el siguiente gráfico de dispersión, la descripción generada por defecto incluye todos los elementos, pero no es accesible debido a la cantidad de elementos, lo que hace que la lista sea demasiado larga para comprender.

En este caso, la descripción debe configurarse con la propiedad [aria.description](${optionPath}aria.description).

### Personalización Avanzada

Cada parte del aria-label puede incluir variables de plantilla que se reemplazarán por el valor real en el gráfico. Para obtener más información sobre el proceso de generación de una descripción, consulte la documentación de la API [aria.label](${optionPath}aria.label).

## Patrones de Decalques

Además, Apache ECharts 5 añade soporte para patrones de decalques como una representación secundaria del color para diferenciar mejor los datos. Con `aria.enabled` configurado a  `true` y `aria.decal.show` configurado a  `true`, se aplicará el estilo predeterminado de decalque.

<md-example src="doc-example/aria-decal-simple"></md-example>

Si necesita personalizar el patrón de decalque, puede utilizar [aria.decal.decals](${optionPath}aria.decal.decals) para configurar un patrón de decalques flexible.

Por favor, consulte la opción[ARIA option](${optionPath}aria.decal) para más detalles.
