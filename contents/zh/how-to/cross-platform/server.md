# 服务端渲染 ECharts 图表

通常情况下，Apache ECharts<sup>TM</sup> 会在浏览器中动态的渲染图表，并且根据用户的交互来更新渲染。但是在下面这些比较特殊的场景，我们也需要在服务端中渲染图表并且输出到浏览器中：

- 需要缩短前端的渲染时间，保证第一时间显示图表
- 需要在 Markdown, PDF 等不支持动态运行脚本的环境中嵌入图表

在这些场景下，ECharts 也提供了两种服务端渲染（server-side rendering，SSR）的方案：SVG 渲染或 Canvas 渲染。

| 渲染方案           | 渲染结果的形式  | 优点              |
| ----------------- | ----------------- | ----------------- |
| 服务端 SVG 渲染     | SVG 字符串 | 比 Canvas 图片体积更小；<br>矢量 SVG 图片不会模糊；<br>支持初始动画 |
| 服务端 Canvas 渲染  | 图片       | 图片形式适用场景更广泛，对不支持 SVG 的场景可选择 |

通常情况下，应优先考虑使用服务端 SVG 渲染方案，如果 SVG 不适用，也可以考虑 Canvas 渲染方案。

使用服务端渲染也有一定的局限性，尤其是和交互相关的一些操作无法支持。因此，如果有交互需求，可参考下文的“服务端渲染 Hydration”。

## 服务端渲染

### 服务端 SVG 渲染

> 版本更新：
>
> - 5.3.0 版本：使用零依赖的服务端 SVG 字符串渲染方案，并支持图表的初始动画
> - 5.5.0 版本：新增客户端轻量运行时，客户端无需加载完整 ECharts 即可实现部分交互

5.3.0 里新引入了零依赖的服务端 SVG 字符串渲染方案：

```ts
// 服务端代码
const echarts = require('echarts');

// 在 SSR 模式下第一个参数不需要再传入 DOM 对象
let chart = echarts.init(null, null, {
  renderer: 'svg', // 必须使用 SVG 模式
  ssr: true, // 开启 SSR
  width: 400, // 需要指明高和宽
  height: 300
});

// 像正常使用一样 setOption
chart.setOption({
  //...
});

// 输出字符串
const svgStr = chart.renderToSVGString();

// 如果不再需要图表，调用 dispose 以释放内存
chart.dispose();
chart = null;
```

整体使用的代码结构跟在浏览器中使用一样，首先是`init`初始化一个图表实例，然后通过`setOption`设置图表的配置项。但是`init`传入的参数会跟在跟浏览器中使用有所不同：

- 首先因为在服务端会采用字符串拼接的方式来渲染得到 SVG，我们并不需要容器来展示渲染的内容，所以我们可以在`init`的时候第一个`container`参数传入`null`或者`undefined`。
- 然后我们在`init`的第三个参数中，我们需要通过显示指定`ssr: true`来告诉 ECharts 我们需要开启服务端渲染的模式，该模式下 ECharts 会关闭动画循环的模块以及事件交互的模块。
- 在服务端渲染中我们也必须要通过`width`和`height`显示的指定图表的高和宽，因此如果你的图表是需要根据容器大小自适应的话，可能需要思考一下服务端渲染是否适合你的场景了。一种可能的解决方案是，首屏获取到图表容器大小后，请求服务端渲染图表，然后在客户端渲染图表；当用户交互改变容器大小时，重新请求服务端渲染。

在浏览器中我们在`setOption`完之后 ECharts 就会自动进行渲染将结果绘制到页面中，后续也会在每一帧判断是否有动画需要进行重绘。Node.js 中我们在设置了`ssr: true`后则没有这个过程。取而代之我们使用了`renderToSVGString`，将当前的图表渲染到 SVG 字符串，进一步得再通过 HTTP Response 返回给前端或者缓存到本地。

HTTP Response 返回给前端（这里以 Express.js 为例）：

```ts
res.writeHead(200, {
  'Content-Type': 'application/xml'
});
res.write(svgStr); // svgStr 是上面 chart.renderToSVGString() 得到的字符串
res.end();
```

或者保存到本地：

```ts
fs.writeFile('bar.svg', svgStr, 'utf-8');
```

#### 服务端渲染中的动画效果

上面的例子中可以看到，就算是服务端渲染 ECharts 也可以提供动画效果，这个动画效果是通过在输出的 SVG 字符串中嵌入 CSS 动画实现的。并不需要额外的 JavaScript 再去控制动画。

但是，也因为 CSS 动画的局限性，我们没法在服务端渲染中实现一些更灵活的动画功能，诸如柱状图排序动画，标签动画，路径图的特效动画等。部分系列诸如饼图的动画效果也为服务端渲染做了特殊的优化。

如果你不希望有这个动画效果，可以在`setOption`的时候通过`animation: false`关闭动画。

```ts
setOption({
  animation: false
});
```

### 服务端 Canvas 渲染

如果你希望输出的是一张图片而非 SVG 字符串，或者你还在使用更老的版本，我们会推荐使用 [node-canvas](https://github.com/Automattic/node-canvas) 来实现 ECharts 的服务渲染，[node-canvas](https://github.com/Automattic/node-canvas) 是在 Node.js 上的一套 Canvas 实现，它提供了跟浏览器中 Canvas 几乎一致的接口。

下面是一个简单的例子

```ts
var echarts = require('echarts');
const { createCanvas } = require('canvas');

// 在 5.3.0 之前的版本中，你必须要通过该接口注册 canvas 实例创建方法。
// 从 5.3.0 开始就不需要了
echarts.setCanvasCreator(() => {
  return createCanvas();
});

const canvas = createCanvas(800, 600);
// ECharts 可以直接使用 node-canvas 创建的 Canvas 实例作为容器
let chart = echarts.init(canvas);

// 像正常使用一样 setOption
chart.setOption({
  //...
});

const buffer = canvas.toBuffer('image/png');

// 如果不再需要图表，调用 dispose 以释放内存
chart.dispose();
chart = null;

// 通过 Response 输出 PNG 图片
res.writeHead(200, {
  'Content-Type': 'image/png'
});
res.write(buffer);
res.end();
```

#### 图片的加载

[node-canvas](https://github.com/Automattic/node-canvas) 提供了图片加载的`Image`实现，如果你在图表中使用了到了图片，我们可以使用`5.3.0`新增的`setPlatformAPI`接口来适配。

```ts
echarts.setPlatformAPI({
  // 同老版本的 setCanvasCreator
  createCanvas() {
    return createCanvas();
  },
  loadImage(src, onload, onerror) {
    const img = new Image();
    // 必须要绑定 this context.
    img.onload = onload.bind(img);
    img.onerror = onerror.bind(img);
    img.src = src;
    return img;
  }
});
```

如果你的图片是需要远程获取的，我们建议你通过 http 请求先预取该图片得到`base64`之后再作为图片的 URL 传入，这样可以保证在 Response 输出的时候图片是加载完成的。

## 客户端二次渲染

### 客户端懒加载完整 ECharts

最新版本的 ECharts 服务端 SVG 渲染除了完成图表的渲染外，支持的功能包括：

- 图表初始动画（例如：柱状图初始化时的柱子上升动画）
- 高亮样式（例如：鼠标移动到柱状图柱子上时的高亮效果）

但仅使用服务端渲染无法支持的功能包括：

- 动态改变数据
- 点击图例切换系列是否显示
- 移动鼠标显示提示框
- 其他交互相关的功能

如果有相关需求，可以考虑先使用服务端渲染快速输出首屏图表，然后等待 `echarts.js` 加载完后，重新在客户端渲染同样的图表（称为 Hydration），这样就可以实现正常的交互效果和动态改变数据了。需要注意的是，在客户端渲染的时候，应开启 `tooltip: { show: true }` 之类的交互组件，并且用 `animation: 0` 关闭初始动画（初始动画应由服务端渲染结果的 SVG 动画完成）。

从用户体验的角度，几乎感受不到二次渲染的过程，整个切换效果是非常无缝衔接的。你也可以像上面的例子中一样，在加载 `echarts.js` 的过程中使用 [pace-js](https://www.npmjs.com/package/pace-js) 之类的库实现显示加载进度条的效果，来解决 ECharts 尚未完全加载完之前没有交互反馈的问题。

使用服务端渲染 SVG 加上客户端 ECharts 懒加载的方式，其优点是，能够在首屏快速展示图表，而懒加载完成后可以实现所有 ECharts 的功能和交互；而缺点是，懒加载完整的 ECharts 需要一定时间，在加载完成前无法实现除高亮之外的用户交互（在这种情况下，开发者可以通过显示“加载中”来解决无交互反馈带来的困惑）。这个方案也是目前比较推荐的对首屏加载时间敏感，对功能交互完整性要求高的方案。

### 客户端轻量运行时

方案一给出了实现完整交互的方案，但是有些场景下，我们并不需要很复杂的交互，只是希望在服务端渲染的基础上，能够在客户端进行一些简单的交互，例如：点击图例切换系列是否显示。这种情况下，我们能否不在客户端加载至少需要几百 KB 的 ECharts 代码呢？

从 v5.5.0 版本起，如果图表只需要以下效果和交互，可以通过服务端 SVG 渲染 + 客户端轻量运行时来实现：

- 图表初始动画（实现原理：服务端渲染的 SVG 带有 CSS 动画）
- 高亮样式（实现原理：服务端渲染的 SVG 带有 CSS 动画）
- 动态改变数据（实现原理：轻量运行时请求服务器进行二次渲染）
- 点击图例切换系列是否显示（实现原理：轻量运行时请求服务器进行二次渲染）

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

  // 使用轻量运行时赋予图表交互能力
  ssrClient.hydrate(container, {
    on: {
      click: (params) => {
        if (params.ssrType === 'legend') {
          // 点击图例元素，请求服务器进行二次渲染
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

// 通过 AJAX 请求获取服务端渲染的 SVG 字符串
fetch('...')
  .then(res => res.text())
  .then(svgStr => {
    updateChart(svgStr);
  });
</script>
```

服务器端根据客户端传来的每个系列是否显示的信息（`isSeriesShown`）进行二次渲染，返回新的 SVG 字符串。服务端代码[同上文](#服务端-svg-渲染)，不再赘述。

> 关于状态记录：上述这种开发方式和纯客户端渲染的相比，开发者需要记录并维护一些额外的信息（例如这个例子中每个系列是否显示）。这是不可避免的，因为 HTTP 请求本身是无状态的，如果要实现有状态，要么像上面的例子这样由客户端记录状态并传递，要么服务器保留状态（例如通过 session，但需要耗费更多的服务器内存以及更复杂的销毁逻辑所以并不推荐）。

使用服务端 SVG 渲染加上客户端轻量运行时的方式，其优点是，客户端不再需要加载几百 KB 的 ECharts 代码，只需要加载一个不到 4KB 的轻量运行时代码；并且从用户体验的角度牺牲很少（支持初始动画、鼠标高亮）。而缺点是，需要一定的开发成本来维护额外的状态信息，并且无法支持实时性要求高的交互（例如移动鼠标显示提示框）。总体来说，**推荐在对代码体积有非常严格要求的环境使用**。

## 使用轻量运行时

客户端轻量运行时通过将服务端渲染的 SVG 图表进行理解，从而赋予图表一定的交互能力。

可以通过以下方式引入客户端轻量运行时：

```html
<!-- 方法一：使用 CDN -->
<script src="https://cdn.jsdelivr.net/npm/echarts/ssr/client/dist/index.min.js"></script>
<!-- 方法二：使用 NPM -->
<script src="node_modules/echarts/ssr/client/dist/index.js"></script>
```

### API

在全局变量 `window['echarts-ssr-client']` 中提供了以下 API：

#### hydrate(dom: HTMLElement, options: ECSSRClientOptions)

- `dom`：图表容器，其内部的内容在调用本方法前应已设为服务端渲染的 SVG 图表
- `options`：配置项

##### ECSSRClientOptions

```ts
on?: {
  mouseover?: (params: ECSSRClientEventParams) => void,
  mouseout?: (params: ECSSRClientEventParams) => void,
  click?: (params: ECSSRClientEventParams) => void
}
```

和[图表鼠标事件](${mainSitePath}api.html#events.鼠标事件)一样，这里的时间都是针对图表数据对象的（例如：柱状图的柱子、折线图的数据点等），而不是针对图表容器的。

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

- `type`：事件类型
- `ssrType`：事件对象类型，`legend` 表示图例数据，`chart` 表示图表数据对象
- `seriesIndex`：系列索引
- `dataIndex`：数据索引
- `event`：原生事件对象

### 示例

参见上文「客户端轻量运行时」章节。

## 小结

上面，我们介绍了几种不同的渲染方案，包括：

- 客户端渲染
- 服务端 SVG 渲染
- 服务端 Canvas 渲染
- 客户端轻量运行时渲染

这四种渲染方式可以结合使用，我们再来总结一下它们各自适用的场景：

| 渲染方案 | 加载体积 | 功能及交互损失 | 相对开发工作量 | 推荐场景 |
| --- | --- | --- | --- | --- |
| 客户端渲染 | 最大 | 无 | 最小 | 首屏加载时间不敏感，对功能交互完整性要求高 |
| 客户端渲染（[按需引用](${lang}/basics/import#按需引入-echarts-图表和组件)部分包） | 大 | 大：没有引入的包就无法使用对应功能 | 小 | 首屏加载时间不敏感，对代码体积没有严格要求但是希望尽可能小，仅使用 ECharts 的一小部分功能，没有服务器资源 |
| 一次性服务端 SVG 渲染 | 小 | 大：无法动态改变数据、不支持图例切换系列是否显示、不支持提示框等实时性要求高的交互 | 中 | 首屏加载时间敏感，对功能交互完整性要求低 |
| 一次性服务端 Canvas 渲染 | 大 | 最大：同上且不支持初始动画、图片体积更大、放大会模糊 | 中 | 首屏加载时间敏感，对功能交互完整性要求低，平台限制无法使用 SVG |
| 服务端 SVG 渲染加客户端懒加载 ECharts | 小，然后大 | 中：懒加载完成前无法交互 | 中 | 首屏加载时间敏感，对功能交互完整性要求高，最好图表不会在加载后立刻需要交互 |
| 服务端 SVG 渲染加客户端轻量运行时 | 小 | 中：无法实现实时性要求高的交互 | 大（需要维护图表状态、定义客户端服务端接口协议） | 首屏加载时间敏感，对功能交互完整性要求低，对代码体积有非常严格要求，交互实时性要求不严格 |
| 服务端 SVG 渲染加客户端懒加载 ECharts，懒加载完成前使用轻量运行时 | 小，然后大 | 小：在懒加载完成前无法进行复杂交互 | 最大 | 首屏加载时间敏感，对功能交互完整性要求高，有充分的开发时间 |

当然，还存在一些其他的组合可能性，但最常用的就是以上几种，相信如果你了解了这些渲染方案的特点，就可以根据自己的场景选择合适的方案了。
