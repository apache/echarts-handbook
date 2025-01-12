# Renderizar con SVG o Canvas

La mayoría de las bibliotecas de gráficos del lado del navegador utilizan SVG o Canvas como el motor de renderizado subyacente. En general, ambas tecnologías son intercambiables y tienen un efecto similar. Sin embargo, la diferencia puede ser notable en algunos escenarios y casos específicos. Por lo tanto, siempre es difícil decidir qué tecnología usar para renderizar los gráficos.

Canvas ha sido utilizado como el motor de renderizado de ECharts desde el principio. Desde la versión [v4.0](https://echarts.apache.org/en/changelog.html#v4-0-0), ECharts ha proporcionado el renderizador SVG como una opción adicional. Puedes especificar el parámetro  [renderer parameter](${mainSitePath}api.html#echarts.init) como `'canvas'` o `'svg'` al inicializar el gráfico.

> SVG y Canvas tienen una diferencia significativa en su uso. El soporte uniforme para ambas tecnologías en ECharts se debe a la abstracción e implementación de la biblioteca subyacente [ZRender](https://github.com/ecomfe/zrender).

## Cómo Elegir un Renderizador

 
Renderizar con SVG o Canvas
La mayoría de las bibliotecas de gráficos del lado del navegador utilizan SVG o Canvas como el motor de renderizado subyacente. En general, ambas tecnologías son intercambiables y tienen un efecto similar. Sin embargo, la diferencia puede ser notable en algunos escenarios y casos específicos. Por lo tanto, siempre es difícil decidir qué tecnología usar para renderizar los gráficos.

Canvas ha sido utilizado como el motor de renderizado de ECharts desde el principio. Desde la versión v4.0, ECharts ha proporcionado el renderizador SVG como una opción adicional. Puedes especificar el parámetro renderer como 'canvas' o 'svg' al inicializar el gráfico.

SVG y Canvas tienen una diferencia significativa en su uso. El soporte uniforme para ambas tecnologías en ECharts se debe a la abstracción e implementación de la biblioteca subyacente ZRender.

Cómo Elegir un Renderizador

En general, Canvas es más adecuado para gráficos con un gran número de elementos (mapas de calor, gráficos de líneas o dispersión a gran escala en coordenadas geográficas o paralelas, etc.), y con efectos visuales[effect](${mainSitePath}examples/editor.html?c=lines-bmap-effect). Sin embargo, SVG tiene una ventaja importante: utiliza menos memoria (lo cual es importante para dispositivos móviles) y no se vuelve borroso al hacer zoom.

La elección del renderizador puede basarse en una combinación del entorno de hardware y software, el volumen de datos y los requisitos funcionales.

- En escenarios donde el entorno de hardware y software es bueno y la      cantidad de datos no es demasiado grande, ambos renderizadores funcionarán y no será necesario preocuparse demasiado por la elección.
- En escenarios donde el entorno es pobre y surgen problemas de rendimiento que requieren optimización, se puede experimentar para determinar qué renderizador usar. Por ejemplo, existen estas experiencias:
  - En situaciones donde se deben crear muchas instancias de ECharts y el navegador es propenso a fallar (probablemente porque el número de Canvas está causando que el uso de memoria supere la capacidad del teléfono), se puede usar el renderizador SVG para mejorar el rendimiento. En términos generales, el renderizador SVG podría funcionar mejor si el gráfico se ejecuta en un Android de gama baja, o si estamos utilizando gráficos específicos como el [LiquidFill chart](https://ecomfe.github.io/echarts-liquidfill/example/).
  - Para volúmenes de datos mayores a 1,000 (este es un valor experimental), siempre se recomienda el renderizador Canvas.

Damos una calurosa bienvenida a los [feedback](https://github.com/apache/echarts/issues/new) de los desarrolladores sobre sus experiencias y escenarios, para ayudarnos a hacer mejores optimizaciones.

Nota: Actualmente, algunos efectos especiales aún dependen de Canvas: por ejemplo, [trail effect](${optionPath}series-lines.effect), [heatmap with blending effect](${mainSitePath}examples/editor.html?c=heatmap-bmap), etc.

Desde [v5.3.0](${lang}/basics/release-note/5-3-0/#new-svg-renderer), el renderizador SVG fue refactorizado utilizando el DOM Virtual, lo que mejoró el rendimiento entre 2 y 10 veces, ¡y en algunos escenarios específicos puede ser decenas de veces más rápido! Consulta [#836](https://github.com/ecomfe/zrender/pull/836) para más detalles.

## Cómo Usar el Renderizador

Si se importa `echarts` completamente de la siguiente manera, los renderizadores SVG y Canvas ya están registrados e importados automáticamente.

```js
import * as echarts from 'echarts';
```

Si estás utilizando [tree-shakable import](${lang}/basics/import),  necesitarás importar manualmente los renderizadores requeridos.

```js
import * as echarts from 'echarts/core';
// You can use only the renderers you need
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);
```

Luego puedes establecer el parámetro [renderer parameter](${mainSitePath}api.html#echarts.init) al inicializar el gráfico.

```js
// Use the Canvas renderer (default)
var chart = echarts.init(containerDom, null, { renderer: 'canvas' });
// Equivalent to
var chart = echarts.init(containerDom);

// use the SVG renderer
var chart = echarts.init(containerDom, null, { renderer: 'svg' });
```
