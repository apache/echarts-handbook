# Using ECharts as an NPM Package

There are two approaches to using ECharts as a package. The simplest approach is to make all functionality immediately available by importing from `echarts`. However, it is encouraged to substantially decrease bundle size by only importing as necessary such as `echarts/core` and `echarts/charts`.

## Install ECharts via NPM

You can install ECharts via npm using the following command

```shell
npm install echarts
```

## Import All ECharts Functionality

To include all of ECharts, we simply need to import `echarts`.

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

## Shrinking Bundle Size

The above code will import all the charts and components in ECharts, but if you don't want to bring in all the components, you can use the tree-shakeable interface provided by ECharts to bundle the required components and get a minimal bundle.

```js
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';

// Import bar charts, all suffixed with Chart
import { BarChart } from 'echarts/charts';

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
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

> Note that in order to keep the size of the package to a minimum, ECharts does not provide any renderer in the tree-shakeable interface, so you need to choose to import `CanvasRenderer` or `SVGRenderer` as the renderer. The advantage of this is that if you only need to use the SVG rendering mode, the bundle will not include the `CanvasRenderer` module, which is not needed.

The "Full Code" tab on our sample editor page provides a very convenient way to generate a tree-shakable code. It will generate tree-shakable code based on the current option dynamically to use it directly in your project.

## Creating an Option Type in TypeScript

For developers who are using TypeScript to develop ECharts, type interface is provided to create a minimal `EChartsOption` type. This type will be stricter than the default one provided because it will know exactly what components are being used. This can help you check for missing components or charts more effectively.

```ts
import * as echarts from 'echarts/core';
import {
  BarChart,
  // The series option types are defined with the SeriesOption suffix
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // The component option types are defined with the ComponentOption suffix
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // Dataset
  DatasetComponent,
  DatasetComponentOption,
  // Built-in transform (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { 
  ComposeOption, 
  BarSeriesOption, 
  LineSeriesOption, 
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts';

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
