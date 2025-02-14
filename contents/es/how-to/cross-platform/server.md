# Renderizado del lado del servidor

Normalmente, Apache ECharts<sup>TM</sup> renderiza el gráfico dinámicamente en el navegador y vuelve a renderizarse después de las interacciones del usuario. Sin embargo, hay escenarios específicos en los que también necesitamos renderizar los gráficos del lado del servidor:

- Reducir el tiempo de primer renderizado (FCP) y garantizar que el gráfico se muestre inmediatamente..
- Incrustar gráficos en entornos como Markdown o PDF que no admiten scripts.

En estos casos, ECharts ofrece soluciones de renderizado del lado del servidor (SSR) tanto en SVG como en Canvas.


| Solution           | Rendering Result  | Pros              |
| ----------------- | ----------------- | ----------------- |
| Server-Side SVG Rendering     | SVG string | Smaller than Canvas images;<br>Vector SVG images are not blurred;<br>Support for initial animation |
| Server-Side Canvas Rendering  | Image       | The image format is available for a wider range of scenarios, and is optional for scenarios that do not support SVG |

En general, se debe preferir la solución de renderizado SVG del lado del servidor, o si SVG no es aplicable, se puede considerar la solución de renderizado en Canvas.

El renderizado del lado del servidor también tiene algunas limitaciones, especialmente en lo que respecta a interacciones que no pueden ser soportadas. Por lo tanto, si tienes requisitos de interacción, puedes consultar la sección "Renderizado del lado del servidor con hidratación" a continuación.

## Renderizado del lado del servidor


### Renderizado del lado del servidor en SVG

> Actualización de versión:

>
> - 5.3.0: Introducción de una nueva solución de renderizado basada en cadenas SVG sin dependencias y soporte para animaciones iniciales.
> - 5.5.0: Se añadió un entorno de ejecución ligero en el cliente, que permite algunas interacciones sin necesidad de cargar el ECharts completo en el cliente.

Introdujimos una nueva solución de renderizado del lado del servidor basada en cadenas SVG sin dependencias en la versión 5.3.0.

```ts
// Server-side code
const echarts = require('echarts');

// In SSR mode the first container parameter is not required
let chart = echarts.init(null, null, {
  renderer: 'svg', // must use SVG rendering mode
  ssr: true, // enable SSR
  width: 400, // need to specify height and width
  height: 300
});

// use setOption as normal
chart.setOption({
  //...
});

// Output a string
const svgStr = chart.renderToSVGString();

// If chart is no longer useful, consider disposing it to release memory.
chart.dispose();
chart = null;
```

La estructura general del código es casi la misma que en el navegador, comenzando con `init` para inicializar un gráfico de ejemplo y luego configurando los elementos del gráfico mediante `setOption`. Sin embargo, los parámetros pasados a `init` serán diferentes a los utilizados en el navegador.

- En primer lugar, dado que el SVG renderizado en el lado del servidor es basado en cadenas, no necesitamos un contenedor para mostrar el contenido renderizado, por lo que podemos pasar `null` o `undefined` como primer `container` parametro de `init`.
- Luego, en el tercer parámetro de `init` debemos indicarle a ECharts que habilite el modo de renderizado del lado del servidor especificando `ssr: true`.De esta manera, ECharts sabrá que debe desactivar el bucle de animación y los módulos de eventos.
- También debemos especificar la `height` y `width` del gráfico, por lo que si el tamaño del gráfico debe ser sensible al contenedor, es posible que debas pensar si el renderizado del lado del servidor es adecuado para tu escenario.

En el navegador, ECharts renderiza automáticamente el resultado en la página después de `setOption` y luego determina en cada cuadro si hay una animación que necesita ser redibujada, pero en Node.js no hacemos esto después de establecer  `ssr: true`. En su lugar, usamos `renderToSVGString` para renderizar el gráfico actual como una cadena SVG, que luego puede ser devuelta al frontend mediante la respuesta HTTP o guardada en un archivo local.

Respuesta al navegador (usando Express.js como ejemplo):

```ts
res.writeHead(200, {
  'Content-Type': 'application/xml'
});
res.write(svgStr); // svgStr is the result of chart.renderToSVGString()
res.end();
```

Or save to a local file

```ts
fs.writeFile('bar.svg', svgStr, 'utf-8');
```

#### Animaciones en el renderizado del lado del servidor

Como puedes ver en el ejemplo anterior, incluso con el renderizado del lado del servidor, ECharts aún puede proporcionar efectos de animación, que se logran insertando animaciones CSS en la cadena SVG de salida. No se necesita JavaScript adicional para ejecutar la animación.

Sin embargo, las limitaciones de las animaciones CSS impiden implementar animaciones más flexibles en el renderizado del lado del servidor, como animaciones de gráficos de barras en carrera, animaciones de etiquetas y efectos especiales en la serie `lines` La animación de algunas series, como `pie`, ha sido optimizada específicamente para el renderizado del lado del servidor.


Si no deseas esta animación, puedes desactivarla configurando`animation: false` al utilizar `setOption`.

```ts
setOption({
  animation: false
});
```

### Renderizado del lado del servidor en Canvas

Si deseas que la salida sea una imagen en lugar de una cadena SVG, o si estás utilizando una versión más antigua, te recomendamos usar [node-canvas](https://github.com/Automattic/node-canvas) para el renderizado del lado del servidor.[node-canvas](https://github.com/Automattic/node-canvas) es una implementación de Canvas en Node.js que proporciona una interfaz casi idéntica a la de Canvas en el navegador.

Aquí tienes un ejemplo simple:

```ts
var echarts = require('echarts');
const { createCanvas } = require('canvas');

// In versions earlier than 5.3.0, you had to register the canvas factory with setCanvasCreator.
// Not necessary since 5.3.0
echarts.setCanvasCreator(() => {
  return createCanvas();
});

const canvas = createCanvas(800, 600);
// ECharts can use the Canvas instance created by node-canvas as a container directly
let chart = echarts.init(canvas);

// setOption as normal
chart.setOption({
  //...
});

const buffer = renderChart().toBuffer('image/png');

// If chart is no longer useful, consider disposing it to release memory.
chart.dispose();
chart = null;

// Output the PNG image via Response
res.writeHead(200, {
  'Content-Type': 'image/png'
});
res.write(buffer);
res.end();
```

#### Carga de imágenes

[node-canvas](https://github.com/Automattic/node-canvas) proporciona una implementación de `Image` para la carga de imágenes. Si utilizas imágenes en tu código, podemos adaptarlas utilizando la interfaz `setPlatformAPI` que se introdujo en la versión `5.3.0`.

```ts
echarts.setPlatformAPI({
  // Same with the old setCanvasCreator
  createCanvas() {
    return createCanvas();
  },
  loadImage(src, onload, onerror) {
    const img = new Image();
    // must be bound to this context.
    img.onload = onload.bind(img);
    img.onerror = onerror.bind(img);
    img.src = src;
    return img;
  }
});
```
Si está utilizando imágenes de forma remota, le recomendamos que prefetch la imagen a través de una petición http para obtener `base64` antes de pasarlo como la URL de la imagen, para asegurarse de que la imagen se carga cuando se renderiza.


## Hidratación del cliente

### Carga diferida de ECharts completa

Con la última versión de ECharts, la solución de renderizado del lado del servidor puede hacer lo siguiente al renderizar el gráfico:

- Soporte para la animación inicial (es decir, la animación que se reproduce cuando el gráfico se renderiza por primera vez).
- Estilos de resaltado (es decir, el efecto de resaltado cuando el mouse pasa sobre una barra en un gráfico de barras).

Pero hay características que no pueden ser soportadas por el renderizado del lado del servidor:

- Cambio dinámico de datos
- Hacer clic en una leyenda para alternar si la serie se muestra o no
- Mover el mouse para mostrar un tooltip
- Otras características relacionadas con la interacción

Si tienes tales requisitos, puedes considerar usar renderizado del lado del servidor para generar rápidamente el gráfico en la primera pantalla, luego esperar a que  `echarts.js` termine de cargarse y volver a renderizar el mismo gráfico en el lado del cliente, para que puedas lograr efectos de interacción normales y cambiar los datos dinámicamente. Ten en cuenta que al renderizar en el lado del cliente, debes activar los componentes interactivos como  `tooltip: { show: true }` y desactivar la animación inicial con `animation: 0` (la animación inicial debe ser realizada por la animación SVG del resultado renderizado en el servidor).

Como se puede ver, desde el punto de vista de la experiencia del usuario, casi no hay un proceso de renderizado secundario, y el efecto de cambio es muy fluido. También puedes usar una biblioteca como [pace-js](https://www.npmjs.com/package/pace-js) para mostrar una barra de progreso de carga durante la carga de `echarts.js` como en el ejemplo anterior, para resolver el problema de la falta de retroalimentación interactiva antes de que los ECharts estén completamente cargados.

Usar renderizado del lado del servidor con renderizado del lado del cliente y carga diferida de `echarts.js` en el lado del cliente es una buena solución para escenarios en los que se necesita renderizar rápidamente la primera pantalla y luego se debe admitir la interacción. Sin embargo, toma algo de tiempo cargar `echarts.js` y, antes de que se cargue completamente, no hay retroalimentación interactiva, por lo que se podría mostrar un texto de "Cargando" al usuario. Esta es una solución comúnmente recomendada para escenarios donde se necesita renderizar rápidamente la primera pantalla y luego se debe admitir la interacción.

### Tiempo de ejecución ligero en el cliente

La solución A proporciona una forma de implementar interacciones completas, pero en algunos escenarios, no necesitamos interacciones complejas, solo esperamos poder realizar algunas interacciones simples en el cliente basadas en el renderizado del lado del servidor, como: hacer clic en la leyenda para alternar si la serie se muestra. En este caso, ¿podemos evitar cargar al menos unos cientos de KBs del código de ECharts en el cliente?

A partir de la versión v5.5.0, si el gráfico solo necesita los siguientes efectos e interacciones, se puede lograr mediante el renderizado SVG del lado del servidor + tiempo de ejecución ligero en el cliente:

- Animación inicial del gráfico (principio de implementación: el SVG renderizado por el servidor incluye animación CSS).
- Estilo de resaltado (principio de implementación: el SVG renderizado por el servidor incluye animación CSS)
- Cambio dinámico de datos (principio de implementación: el tiempo de ejecución ligero solicita renderizado secundario al servidor).
- Hacer clic en la leyenda para alternar si la serie se muestra (principio de implementación: el tiempo de ejecución ligero solicita renderizado secundario al servidor).

```html
<div id="chart-container" style="width:800px;height:600px"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.min.js"></script>
<script>
const ssrClient = window['echarts-ssr-client'];

const isSeriesShown = {
  a: true,
  b: true
};

function updateChart(svgStr) {
  const container = document.getElementById('chart-container');
  container.innerHTML = svgStr;

  // Use the lightweight runtime to give the chart interactive capabilities
  ssrClient.hydrate(container, {
    on: {
      click: (params) => {
        if (params.ssrType === 'legend') {
          // Click the legend element, request the server for secondary rendering
          isSeriesShown[params.seriesName] = !isSeriesShown[params.seriesName];
          fetch('...?series=' + JSON.stringify(isSeriesShown))
            .then(res => res.text())
            .then(svgStr => {
              updateChart(svgStr);
            });
        }
      }
    }
  });
}

// Get the SVG string rendered by the server through an AJAX request
fetch('...')
  .then(res => res.text())
  .then(svgStr => {
    updateChart(svgStr);
  });
</script>
```

El servidor realiza el renderizado secundario basado en la información pasada por el cliente sobre si cada serie se muestra (`isSeriesShown`) y devuelve una nueva cadena SVG. El código del lado del servidor [is the same as above](#server-side-svg-rendering), por lo que no se repetirá.

> Acerca del registro del estado: En comparación con el renderizado puramente del lado del cliente, los desarrolladores deben registrar y mantener información adicional (como si cada serie se muestra en este ejemplo). Esto es inevitable porque las solicitudes HTTP son sin estado. Si quieres implementar un estado, o el cliente lo registra y lo pasa como en el ejemplo anterior, o el servidor mantiene el estado (por ejemplo, a través de una sesión, pero esto requiere más memoria del servidor y una lógica de destrucción más compleja, por lo que no se recomienda).

Usar renderizado SVG del lado del servidor más tiempo de ejecución ligero del lado del cliente tiene la ventaja de que el cliente ya no necesita cargar cientos de KBs del código de ECharts, solo necesita cargar un código de tiempo de ejecución ligero de menos de 4 KB; y desde la experiencia del usuario, se pierde muy poco (admite animación inicial, resaltado al pasar el mouse). La desventaja es que requiere un costo de desarrollo para mantener información de estado adicional y no admite interacciones con requisitos de tiempo real muy altos (como mostrar tooltips al mover el mouse). En general, **se recomienda usarlo en entornos con requisitos muy estrictos para el volumen de código.**.

## Usando Tiempo de Ejecución Ligero

El tiempo de ejecución ligero en el cliente permite la interacción con los gráficos SVG renderizados por el servidor al comprender el contenido.

El tiempo de ejecución ligero en el cliente se puede importar de las siguientes maneras:

```html
<!-- Method one: Using CDN -->
<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.min.js"></script>
<!-- Method two: Using NPM -->
<script src="node_modules/echarts/ssr/client/dist/index.js"></script>
```

### API

Las siguientes APIs se proporcionan en la variable global `window['echarts-ssr-client']`:

#### hydrate(dom: HTMLElement, options: ECSSRClientOptions)

- `dom`: El contenedor del gráfico, cuyo contenido debe establecerse como el gráfico SVG renderizado por el servidor antes de llamar a este método.
- `options`: Elementos de configuración

##### ECSSRClientOptions

```ts
on?: {
  mouseover?: (params: ECSSRClientEventParams) => void,
  mouseout?: (params: ECSSRClientEventParams) => void,
  click?: (params: ECSSRClientEventParams) => void
}
```

Al igual que los [chart mouse events](${mainSitePath}api.html#events.Mouse%20events), los eventos aquí son para los elementos del gráfico (por ejemplo, las barras de un gráfico de barras, el ítem de datos de un gráfico de líneas, etc.), no para el contenedor del gráfico.

##### ECSSRClientEventParams

```ts
{
  type: 'mouseover' | 'mouseout' | 'click';
  ssrType: 'legend' | 'chart';
  seriesIndex?: number;
  dataIndex?: number;
  event: Event;
}
```

- `type`: Event type
- `ssrType`: Event object type, `legend` represents legend data, `chart` represents chart data object
- `seriesIndex`: Series index
- `dataIndex`: Data index
- `event`: Native event object

### Ejemplo

Ver la sección de "Tiempo de ejecución ligero en el cliente" anterior.

## Resumen

Arriba, hemos introducido varias soluciones de renderizado diferentes, incluyendo:

- Client-side rendering
- Server-side SVG rendering
- Server-side Canvas rendering
- Client-side lightweight runtime rendering

These four rendering methods can be used in combination. Let's summarize their respective applicable scenarios:

| Rendering Solution | Loading Volume | Loss of Function and Interaction | Relative Development Workload | Recommended Scenario |
| --- | --- | --- | --- | --- |
| Client-side rendering | Largest | None | Minimum | The first screen load time is not sensitive, and there is a high demand for complete functionality and interaction |
| Client-side rendering ([partial package importing](${lang}/basics/import#shrinking-bundle-size) on demand) | Large | Large: the packages not included cannot use the corresponding functions | Small | The first screen load time is not sensitive, there is no strict requirement for code volume but hope to be as small as possible, only use a small part of ECharts functions, no server resources |
| One-time server-side SVG rendering | Small | Large: unable to dynamically change data, does not support legend toggle series display, does not support tooltips and other interactions with high real-time requirements | Medium | The first screen load time is sensitive, low demand for complete functionality and interaction |
| One-time server-side Canvas rendering | Large | Largest: the same as above and does not support initial animation, larger image volume, blurry when enlarged | Medium | The first screen load time is sensitive, low demand for complete functionality and interaction, platform restrictions cannot use SVG |
| Server-side SVG rendering plus client-side ECharts lazy loading | Small, then large | Medium: cannot interact before lazy loading is completed | Medium | The first screen load time is sensitive, high demand for complete functionality and interaction, the chart is best not needed for interaction immediately after loading |
| Server-side SVG rendering plus client-side lightweight runtime | Small | Medium: Cannot implement interactions with high real-time requirements | Large (need to maintain chart status, define client-server interface protocol) | The first screen load time is sensitive, low demand for complete functionality and interaction, very strict requirements for code volume, not strict requirements for interaction real-time |
| Server-side SVG rendering plus client-side ECharts lazy loading, using lightweight runtime before lazy loading is completed | Small, then large | Small: Cannot perform complex interactions before lazy loading is completed | Largest | The first screen load time is sensitive, high demand for complete functionality and interaction, sufficient development time |


Por supuesto, existen otras posibilidades de combinación, pero las más comunes son las anteriores. Creo que si entiendes las características de estas soluciones de renderizado, podrás elegir la solución adecuada en función de tu propio escenario.