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

If you are using 5.3.0 and newer, we strongly recommend that you use the new zero-dependency server-side string based SVG rendering solution introduced in 5.3.0.

```ts
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
- We also have to specify the height and width of the chart, so if your chart size needs to be responsive to the container, you may need to think about whether server-side rendering is appropriate for your scenario.

In the browser ECharts automatically renders the result to the page after `setOption` and then determines at each frame if there is an animation that needs to be redrawn, but in NodeJS we don't do this after setting `ssr: true`. Instead, we use `renderToSVGString` to render the current chart to an SVG string, which can then be returned to the front-end via HTTP Response or saved to a local file.

Response to the browser

```ts
res.writeHead(200, {
  'Content-Type': 'application/xml'
});
res.write(chart.renderToSVGString());
res.end();
```

Or save to a local file

```ts
fs.writeFile('bar.svg', chart.renderToSVGString(), 'utf-8');
```

Here is a complete server-side SVG rendering example in CodeSandbox.

<iframe src="https://codesandbox.io/embed/heuristic-leftpad-oq23t?autoresize=1&codemirror=1&fontsize=12&hidenavigation=1&&theme= dark"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="heuristic-leftpad-oq23t"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr- spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Animations in Server-side Rendering

As you can see in the example above, even using server-side rendering, ECharts can still provide animation effects, which are achieved by embedding CSS animations in the output SVG string. There is no need for additional JavaScript to play the animation.

However, the limitations of CSS animation prevent us from implementing more flexible animations in server-side rendering, such as bar chart racing animations, label animations, and special effects animations in the `lines` series. Animation of some of the series, such as the `pie`, have been specially optimised for server-side rendering.

If you don't want this animation, you can turn it off by setting `animation: false` when `setOption`.

```ts
setOption({
  animation: false
});
```

## Server-side Canvas rendering

If you want the output to be an image rather than an SVG string, or if you're still using an older version, we'd recommend using [node-canvas](https://github.com/Automattic/node-canvas) for server-side rendering, [node-canvas](https://github.com/Automattic/node-canvas) is Canvas implementations on NodeJS that provide an interface that is almost identical to the Canvas in the browser.

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

### Loading of images

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

## Server-Side Rendering with Hydration

Features that cannot be supported by server-side rendering include

- Dynamically changing data
- Highlighting the data item where the mouse is hovered
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
