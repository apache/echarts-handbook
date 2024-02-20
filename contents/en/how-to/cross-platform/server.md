# Server Side Rendering

Normally, Apache ECharts<sup>TM</sup> renders the chart dynamically in the browser and will re-render after user interactions. However, there are specific scenarios where we also need to render charts on the server side:

- Reducing the FCP time and ensuring the chart is displayed immediately.
- Embedding charts in the environments such as Markdown, PDF that do not support scripts.

In these scenarios, ECharts offers both SVG and Canvas server-side rendering (SSR) solutions.

| Solution           | Rendering Result  | Pros              |
| ----------------- | ----------------- | ----------------- |
| Serverside SVG Rendering     | SVG string | Smaller than Canvas images;<br>Vector SVG images are not blurred;<br>Support for initial animation |
| Serverside Canvas Rendering  | Image       | The image format is available for a wider range of scenarios, and is optional for scenarios that do not support SVG |

In general, the server-side SVG rendering solution should be preferred, or if SVG is not applicable, the Canvas rendering solution can be considered.

Server-side rendering also has some limitations, especially some operations related to interaction cannot be supported. Therefore, if you have interaction requirements, you can refer to "Server-Side Rendering with Hydration" below.

## Server-Side SVG Rendering

### Server-Side SVG Rendering

> Version Update:
>
> - 5.3.0: Introduced a new zero-dependency server-side string based SVG rendering solution, and support for initial animation
> - 5.5.0: Added a lightweight client runtime, which allows some interaction without the need to load the full ECharts on the client side

We introduced a new zero-dependency server-side string based SVG rendering solution in 5.3.0.

```ts
// Server-side code
const echarts = require('echarts');

// In SSR mode the first container parameter is not required
const chart = echarts.init(null, null, {
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

// If chart is no longer useful, consider dispose it to release memory.
chart.dispose();
chart = null;
```

The overall code structure is the almost same as in the browser, starting with `init` to initialise a chart example and then setting the configuration items for the chart via `setOption`. However, the parameters passed to `init` will be different from those used in the browser.

- Firstly, since the SVG is rendered on the server side is string based, we don't need a container to display the rendered content, so we can pass `null` or `undefined` as the first `container` parameter in the `init`.
- Then in the third parameter of `init` we need to tell ECharts that we need to enable server-side rendering mode by specifying `ssr: true` in the display. Then ECharts will know it needs to disable the animation loop and event modules.
- We also have to specify the `height` and `width` of the chart, so if your chart size needs to be responsive to the container, you may need to think about whether server-side rendering is appropriate for your scenario.

In the browser ECharts automatically renders the result to the page after `setOption` and then determines at each frame if there is an animation that needs to be redrawn, but in Node.js we don't do this after setting `ssr: true`. Instead, we use `renderToSVGString` to render the current chart to an SVG string, which can then be returned to the front-end via HTTP Response or saved to a local file.

Response to the browser (using Express.js as example):

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

Here is a complete server-side SVG rendering example in CodeSandbox.

<iframe src="https://codesandbox.io/embed/heuristic-leftpad-oq23t?autoresize=1&codemirror=1&fontsize=12&hidenavigation=1&&theme= dark"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="heuristic-leftpad-oq23t"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr- spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Animations in Server-side Rendering

As you can see in the example above, even using server-side rendering, ECharts can still provide animation effects, which are achieved by embedding CSS animations in the output SVG string. There is no need for additional JavaScript to play the animation.

However, the limitations of CSS animation prevent us from implementing more flexible animations in server-side rendering, such as bar chart racing animations, label animations, and special effects animations in the `lines` series. Animation of some of the series, such as the `pie`, have been specially optimised for server-side rendering.

If you don't want this animation, you can turn it off by setting `animation: false` when `setOption`.

```ts
setOption({
  animation: false
});
```

### Server-side Canvas rendering

If you want the output to be an image rather than an SVG string, or if you're still using an older version, we'd recommend using [node-canvas](https://github.com/Automattic/node-canvas) for server-side rendering, [node-canvas](https://github.com/Automattic/node-canvas) is Canvas implementations on Node.js that provide an interface that is almost identical to the Canvas in the browser.

Here's a simple example

```ts
var echarts = require('echarts');
const { createCanvas } = require('canvas');

// In versions ealier than 5.3.0, you had to register the canvas factory with setCanvasCreator.
// Not necessary since 5.3.0
echarts.setCanvasCreator(() => {
  return createCanvas();
});

const canvas = createCanvas(800, 600);
// ECharts can use the Canvas instance created by node-canvas as a container directly
const chart = echarts.init(canvas);

// setOption as normal
chart.setOption({
  //...
});

const buffer = renderChart().toBuffer('image/png');

// If chart is no longer useful, consider dispose it to release memory.
chart.dispose();
chart = null;

// Output the PNG image via Response
res.writeHead(200, {
  'Content-Type': 'image/png'
});
res.write(buffer);
res.end();
```

Here is a complete example in CodeSandbox

<iframe src="https://codesandbox.io/embed/apache-echarts-canvas-ssr-demo-e340rt?autoresize=1&codemirror=1&fontsize=12& hidenavigation=1&&theme=dark"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="heuristic-leftpad-oq23t"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr- spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Loading of images

[node-canvas](https://github.com/Automattic/node-canvas) provides an `Image` implementation for image loading. If you use to images in your code, we can adapt them using the `setPlatformAPI` interface that was introduced in `5.3.0`.

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

If you are using images from remote, we recommend that you prefetch the image via an http request to get `base64` before passing it on as the URL of the image, to ensure that the image is loaded when render.

## Client Hydration

### Lazy-loading Full ECharts

With the latest version of ECharts, the server-side rendering solution can do the following things along with rendering the chart:

- Support for initial animation (i.e., the animation that is played when the chart is first rendered)
- Highlighting styles (i.e., the highlighting effect when the mouse moves over a bar in a bar chart)

But there are features that cannot be supported by server-side rendering:

- Dynamically changing data
- Clicking on a legend to toggle whether the series is displayed or not
- Moving the mouse to show a tooltip
- Other interaction-related features

If you have such requirements, you can consider using server-side rendering to quickly output the first screen chart, then wait for `echarts.js` to finish loading and re-render the same chart on the client side, so that you can achieve normal interaction effects and dynamically change the data. Note that when rendering on the client side, you should turn on interactive components like `tooltip: { show: true }` and turn off the initial animation with `animation: 0` (the initial animation should be done by the SVG animation of the rendered result on the server side).

Here is an example of building a CodeSandbox with SVG for server-side rendering and Canvas for client-side rendering. It is recommended to click "Open Sandbox" to learn the code implementation.

> If you want to use Canvas for server-side rendering or SVG for client-side rendering, it's similar, so I won't go over it again.

<iframe src="https://codesandbox.io/embed/apache-echarts-5-3-ssr-csr-0jvsdu?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="Apache ECharts 5.3 SSR + CSR"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

As we can see, from the user experience point of view, there is almost no secondary rendering process, and the whole switching effect is very seamless. You can also use a library like [pace-js](https://www.npmjs.com/package/pace-js) to display the loading progress bar during the loading of `echarts.js` as in the above example to solve the problem of no interactive feedback before the ECharts are fully loaded.

Using server-side rendering with client-side rendering along with a lazy-loading `echarts.js` on the client side is a good solution for scenarios where the first screen needs to be rendered quickly and then the interaction needs to be supported. However, it takes some time to load the `echarts.js` and before it is fully loaded, there is no interactive feedback, in which case, a "Loading" text might be displayed to the user. This is a commonly recommended solution for scenarios where the first screen needs to be rendered quickly and then the interaction needs to be supported.

### Lightweight Client Runtime

Solution A provides a way for implementing complete interactions, but in some scenarios, we don't need complex interactions, we just hope to be able to perform some simple interactions on the client side based on server-side rendering, such as: clicking the legend to toggle whether the series is displayed. In this case, can we avoid loading at least a few hundred KBs of ECharts code on the client side?

Starting from version v5.5.0, if the chart only needs the following effects and interactions, it can be achieved through server-side SVG rendering + client-side lightweight runtime:

- Initial chart animation (implementation principle: the SVG rendered by the server comes with CSS animation)
- Highlight style (implementation principle: the SVG rendered by the server comes with CSS animation)
- Dynamically changing data (implementation principle: the lightweight runtime requests the server for secondary rendering)
- Click the legend to toggle whether the series is displayed (implementation principle: the lightweight runtime requests the server for secondary rendering)

```html
<div id="chart-container" style="width:800px;height:600px"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.js"></script>
<script>
const ssrClient = window['echarts-ssr-client'];

let isSeriesShown = {
  a: true,
  b: true
};

function updateChart(svgStr) {
  const container = document.getElementById('chart-container');
  container.innerHTML = svgStr;

  // Use the lightweight runtime to give the chart interactive capabilities
  ssrClient.hydrate(main, {
    on: {
      click: (params) => {
        if (params.ssrType === 'legend') {
          // Click the legend element, request the server for secondary rendering
          isSeriesShown[params.seriesName] = !isSeriesShown[params.seriesName];
          $.get('...?series=' + JSON.stringify(isSeriesShown)).then(svgStr => {
            updateChart(svgStr);
          });
        }
      }
    }
  });
}

// Get the SVG string rendered by the server through an AJAX request
$.get('...').then(svgStr => {
  updateChart(svgStr);
});
</script>
```

The server side performs secondary rendering based on the information passed by the client about whether each series is displayed (`isSeriesShown`) and returns a new SVG string. The server-side code [is the same as above](#server-side-svg-rendering), and will not be repeated.

> About state recording: Compared with pure client-side rendering, developers need to record and maintain some additional information (such as whether each series is displayed in this example). This is inevitable because HTTP requests are stateless. If you want to implement a state, either the client records the state and passes it like the above example, or the server retains the state (for example, through a session, but it requires more server memory and more complex destruction logic, so it is not recommended).

Using server-side SVG rendering plus client-side lightweight runtime, the advantage is that the client no longer needs to load hundreds of KBs of ECharts code, only needs to load a less than 4KB lightweight runtime code; and from the user experience, very little is sacrificed (supports initial animation, mouse highlighting). The disadvantage is that it requires a certain development cost to maintain additional state information, and it does not support interactions with high real-time requirements (such as displaying tooltips when moving the mouse). Overall, **it is recommended to use it in environments with very strict requirements for code volume**.

## Using Lightweight Runtime

The client-side lightweight runtime enables interaction with the SVG charts rendered by the server-side by understanding the content.

The client-side lightweight runtime can be imported in the following ways:

```html
<!-- Method one: Using CDN -->
<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.js"></script>
<!-- Method two: Using NPM -->
<script src="node_modules/echarts/ssr/client/dist/index.js"></script>
```

### API

The following APIs are provided in the global variable `window['echarts-ssr-client']`:

#### hydrate(dom: HTMLElement, options: ECSSRClientOptions)

- `dom`: The chart container, the content of which should be set as the SVG chart rendered by the server-side before calling this method
- `options`: Configuration items

##### ECSSRClientOptions

```ts
on?: {
  mouseover?: (params: ECSSRClientEventParams) => void,
  mouseout?: (params: ECSSRClientEventParams) => void,
  click?: (params: ECSSRClientEventParams) => void
}
```

Just like the [chart mouse events](${mainSitePath}api.html#events.Mouse%20events), the events here are for the chart items (e.g., the bars of a bar chart, the data item of a line chart, etc.), not for the chart container.

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

### Example

See the "Lightweight Client Runtime" section above.

## Summary

Above, we introduced several different rendering solutions, including:

- Client-side rendering
- Server-side SVG rendering
- Server-side Canvas rendering
- Client-side lightweight runtime rendering

These four rendering methods can be used in combination. Let's summarize their respective applicable scenarios:

| Rendering Solution | Loading Volume | Loss of Function and Interaction | Relative Development Workload | Recommended Scenario |
| --- | --- | --- | --- | --- |
| Client-side rendering | ~1000KB | None | Minimum | The first screen load time is not sensitive, and there is a high demand for complete functionality and interaction |
| Client-side rendering ([partial package importing](basics/import#shrinking-bundle-size) on demand) | ＞400KB | Large: the packages not included cannot use the corresponding functions | Small | The first screen load time is not sensitive, there is no strict requirement for code volume but hope to be as small as possible, only use a small part of ECharts functions, no server resources |
| One-time server-side SVG rendering | ~20KB | Large: unable to dynamically change data, does not support legend toggle series display, does not support tooltips and other interactions with high real-time requirements | Medium | The first screen load time is sensitive, low demand for complete functionality and interaction |
| One-time server-side Canvas rendering | ~200KB | Largest: the same as above and does not support initial animation, larger image volume, blurry when enlarged | Medium | The first screen load time is sensitive, low demand for complete functionality and interaction, platform restrictions cannot use SVG |
| Server-side SVG rendering plus client-side ECharts lazy loading | ~20KB + 1000KB | Medium: cannot interact before lazy loading is completed | Medium | The first screen load time is sensitive, high demand for complete functionality and interaction, the chart is best not needed for interaction immediately after loading |
| Server-side SVG rendering plus client-side lightweight runtime | ~20KB + 4KB, an additional ~20KB per update request | Medium: Cannot implement interactions with high real-time requirements | Large (need to maintain chart status, define client-server interface protocol) | The first screen load time is sensitive, low demand for complete functionality and interaction, very strict requirements for code volume, not strict requirements for interaction real-time |
| Server-side SVG rendering plus client-side ECharts lazy loading, using lightweight runtime before lazy loading is completed | ~20KB + 4KB + 1000KB | Small: Cannot perform complex interactions before lazy loading is completed | Largest | The first screen load time is sensitive, high demand for complete functionality and interaction, sufficient development time |

Of course, there are some other combination possibilities, but the most common ones are the above. I believe that if you understand the characteristics of these rendering solutions, you can choose the appropriate solution based on your own scenario.
