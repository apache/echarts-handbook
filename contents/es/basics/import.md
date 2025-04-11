# Usando Echarts como un Paquete NPM

Hay dos enfoques para usar ECharts como un paquete. El enfoque mas sencillo es acerque toda la funcionalidad este disponible de inmediato importando desde `echarts`. Sin embargo, se recomienda reducir considerablemente el tamaño del paquete importando solo lo necesario como  `echarts/core` y `echarts/charts`.

## Instalar ECharts via NPM

Puedes instalar Echarts mediante npm con el siguiente comando:

```shell
npm install echarts
```

## Importar toda la funcionalidad de ECharts

Para incluir todo ECharts, simplemente necesitamos importar `echarts`.

```js
import * as echarts from 'echarts';

// Create the echarts instance
var myChart = echarts.init(document.getElementById('main'));

// Draw the chart
myChart.setOption({
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {},
  xAxis: {
    data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
  },
  yAxis: {},
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
```

## Reducir el Tamaño del Paquete

El código anterior importa todos los gráficos y componentes de ECharts, pero si no deseas incluir todos los componentes, puedes usar la interfaz compatible con tree-shaking proporcionada por ECharts para agrupar solo los componentes necesarios y obtener un paquete mínimo.

```js
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';

// Import bar charts, all suffixed with Chart
import { BarChart } from 'echarts/charts';

// Import the title, tooltip, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// The chart is initialized and configured in the same manner as before
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});
```

> Ten en cuenta que, para mantener el tamaño del paquete al mínimo, ECharts no proporciona ningún renderizador en la interfaz compatible con tree-shaking. Por lo tanto, debes elegir importar `CanvasRenderer` o `SVGRenderer` como el renderizador. La ventaja de esto es que, si solo necesitas usar el modo de renderizado SVG, el paquete no incluirá el módulo `CanvasRenderer` que no es necesario.

La pestaña "Código Completo" en nuestra página del editor de muestras ofrece una manera conveniente de generar un código compatible con tree-shaking. Este generará código compatible con tree-shaking basado en la opción actual para usarlo directamente en tu proyecto.

## Crear un Tipo de Opcion TypeScript

Para los desarrolladores que están usando TypeScript para desarrollar con ECharts, se proporciona un tipo de interfaz para crear un tipo `EChartsOption` mínimo. Este tipo será más estricto que el proporcionado por defecto, ya que conocerá exactamente qué componentes se están utilizando. Esto puede ayudarte a verificar si falta algún componente o gráfico de manera más efectiva.


```ts
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // Dataset
  DatasetComponent,
  // Built-in transform (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // The series option types are defined with the SeriesOption suffix
  BarSeriesOption, 
  LineSeriesOption,
} from 'echarts/charts';
import type {
  // The component option types are defined with the ComponentOption suffix
  TitleComponentOption, 
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type { 
  ComposeOption, 
} from 'echarts/core';

// Create an Option type with only the required components and charts via ComposeOption
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const option: ECOption = {
  // ...
};
```
