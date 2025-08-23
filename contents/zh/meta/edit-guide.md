# 文档编辑指南

## 新增一个 markdown 文件 [[[#adding-a-markdown-file]]]

在 `contents/zh/`（中文文章）或 `contents/en/`（英文文章）目录下新增一个 markdown 文件，最多支持三级目录。将路径及标题信息更新在 `contents/zh/posts.yml` 或 `contents/en/posts.yml`。

markdown 文件名称小写。

## 使用 prettier 来自动格式化代码 [[[#using-prettier-to-automatically-format-code]]]

在开始之前，我们推荐安装`prettier`的 [VSCode 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，该插件可以在你保存的时候自动帮你格式化代码。

如果你觉得自动的格式化破坏了你的代码块，你可以在在代码块外面加上下面代码阻止`prettier`格式化该部分代码

```markdown
<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

如果你发现有的代码块并没有被格式化，请先检查该代码是否存在语法上的错误。

## 内置变量 [[[#built-in-variables]]]


- `optionPath`: 例如，链接 [xAxis.type](${optionPath}xAxis.type) 能这么写而得到：

  <pre>&#91;xAxis.type&#93;&#40;&#36;{optionPath}xAxis.type&#41;</pre>
- `apiPath`: 例如，链接 [echarts.init](${apiPath}echarts.init) 能这么写而得到：

  <pre>&#91;echarts.init&#93;&#40;&#36;{apiPath}echarts.init&#41;</pre>
- `mainSitePath`: 例如，链接 [echarts.init](${mainSitePath}api.html#echarts.init) 能这么写而得到：

  <pre>&#91;echarts.init&#93;&#40;&#36;{mainSitePath}api.html#echarts.init&#41;</pre>
- `exampleEditorPath`: 例如，链接 [line-simple](${exampleEditorPath}line-simple&edit=1&reset=1) 能这么写而得到：

  <pre>&#91;line-simple&#93;&#40;&#36;{exampleEditorPath}line-simple&edit=1&reset=1&#41;</pre>
- `exampleViewPath`: 例如，链接 [line-simple](${exampleViewPath}line-simple&edit=1&reset=1) 能这么写而得到：

  <pre>&#91;line-simple&#93;&#40;&#36;{exampleViewPath}scatter-exponential-regression&edit=1&reset=1&#41;</pre>
- `lang`: 例如，链接 [Get Started](${lang}/get-started) 能这么写而得到：

  <pre>&#91;Get Started&#93;&#40;&#36;{lang}/get-started&#41;</pre>


## 段落标题/子标题 [[[#headings]]]

The syntax:
<!-- prettier-ignore-start -->
<pre>
&#35;&#35; 某段落标题 [[[#a-unique-id-for-link]]]
</pre>
<!-- prettier-ignore-end -->

<md-alert type="danger">
id 用于外链到此段落。强烈建议为每个段落标题声明唯一 id ，并且保持不变。否则，会自动根据段落标题文字生成一个 id ，但是当标题修改时，生成的 id 也会变，导致外链失效。并且，不同语言的文档中生成的 id 也不同，很不方便引用。
</md-alert>

注：文章主标题不必声明 id ，因为文章的链接就是文件路径（在 `posts.yml` 中定义）。

## 引用其它文章 [[[#link-to-other-articles]]]

<pre>
&#91;获取 Apache ECharts&#93;&#40;&#36;{lang}/basics/download&#41;
</pre>

效果为：
[获取 Apache ECharts](${lang}/basics/download)

## 嵌入代码 [[[#embedding-code]]]

### 基础使用 [[[#embedding-code-basic-usage]]]

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

效果为：
```js
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### 代码推荐写法 [[[#embedding-code-recommended-way-of-writing-code]]]

为了可以让工具帮助我们对代码进行格式化，我们应该尽量避免有语法问题的写法。

比如注释 `...`

```js
option = {
  series: [
    {
      type: 'bar'
      // ...
    }
  ]
};
```

### 实时预览和编辑 [[[#embedding-code-live-preview-and-editing]]]

> 目前只支持对 ECharts option 代码的预览（执行代码绘制图表）

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

效果为：
```js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### 更多预览布局 [[[#embedding-code-more-preview-layouts]]]

#### 左右 [[[#embedding-code-more-preview-layouts-left-to-right]]]

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'lr'}
option = {
  ...
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

效果为：
```js live {layout: 'lr'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

#### 右左 [[[#embedding-code-more-preview-layouts-right-to-left]]]

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'rl'}
option = {
  ...
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

效果为：
```js live {layout: 'rl'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

#### 下上 [[[#embedding-code-more-preview-layouts-down-to-up]]]

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'bt'}
option = {
  ...
};
</pre>
<!-- prettier-ignore-end -->

效果为：
```js live {layout: 'bt'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### 高亮指定代码行以及设置文件名[[[#embedding-code-highlighting-lines-of-code-and-adding-filenames]]]

写法为：
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js {1,3-5}[option.js]
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

效果为：
```js {1,3-5}
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

## 嵌入图片 [[[#embedding-images]]]

图片实际存放地址在 `static/images/` 下。

写法为：
```
![图片说明](images/demo.png)
```

### 设置图片高宽 [[[#embedding-images-set-width-height]]]

对于当前页面的临时样式，可以直接写 html：

```
<img data-src="images/demo.png" style="width: 50px" />
```

## 嵌入示例（iframe） [[[#embedding-examples]]]


写法为：
```
<md-example src="doc-example/getting-started" width="100%" height="300" />
```
其中，`src` 为 https://echarts.apache.org/examples/zh/editor.html?c=line-simple 地址中 `?c=` 后面这一串。

效果为：
<md-example src="doc-example/getting-started" width="100%" height="300" />

## 添加示例链接 [[[#link-to-examples]]]

写法为：
<pre>&#91;line-simple&#93;&#40;&#36;{exampleEditorPath}line-simple&edit=1&reset=1&#41;</pre>

效果为：[line-simple](${exampleEditorPath}line-simple&edit=1&reset=1)

## 添加 ECharts 配置项链接 [[[#link-to-echarts-option-items]]]

写法为：
<pre>&#91;xAxis.type&#93;&#40;&#36;{optionPath}xAxis.type&#41;</pre>

效果为：
[xAxis.type](${optionPath}xAxis.type)

写法为：
<pre>&#91;echarts.init&#93;&#40;&#36;{apiPath}echarts.init&#41;</pre>

效果为：
[echarts.init](${apiPath}echarts.init)


## 更多组件使用 [[[#more-component-usage]]]

文档支持使用全局注册的`markdown`组件，除了刚才介绍的`md-example`组件，还有下面几种组件

### md-alert [[[#more-component-usage-md-alert]]]

提示组件

```
<md-alert type="info">
This is an info alert.
</md-alert>
```

<md-alert type="info">
This is an info alert.
</md-alert>

```
<md-alert type="success">
This is a success alert.
</md-alert>
```

<md-alert type="success">
This is a success alert.
</md-alert>

```
<md-alert type="warning">
This is a warning alert.
</md-alert>
```

<md-alert type="warning">
This is a warning alert.
</md-alert>

```
<md-alert type="danger">
This is a danger alert.
</md-alert>
```

<md-alert type="danger">
This is a danger alert.
</md-alert>
