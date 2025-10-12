# Document Editing Guidelines

## Adding a Markdown File [[[#adding-a-markdown-file]]]

Add a markdown file to the `contents/zh/` (Chinese posts) or `contents/en/` (English posts) directories, up to three levels. Update the path and title information in `contents/zh/posts.yml` or `contents/en/posts.yml`. Add the corresponding contributor information in `components/helper/contributors.ts`. (Notice, `en` and `zh` are separate entries in that file.)

Lowercase markdown file names.

## Using Prettier to Automatically Format Code [[[#using-prettier-to-automatically-format-code]]]

Before you start, we recommend installing the [prettier VSCode plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), which will automatically format the code for you when you save it.

If you feel that the automatic formatting is breaking your code block, you can add the following comment to prevent `prettier` from formatting the code inside the block

```markdown
<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

If you find blocks of code that are not formatted, check first for syntax errors in the code.

## Built-in Variables [[[#built-in-variables]]]

- `optionPath`: For example, the source code of [xAxis.type](${optionPath}xAxis.type) is:

  <pre>&#91;xAxis.type&#93;&#40;&#36;{optionPath}xAxis.type&#41;</pre>
- `apiPath`: For example, the source code of [echarts.init](${apiPath}echarts.init) is:

  <pre>&#91;echarts.init&#93;&#40;&#36;{apiPath}echarts.init&#41;</pre>
- `mainSitePath`: For example, the source code of [echarts.init](${mainSitePath}api.html#echarts.init) is:

  <pre>&#91;echarts.init&#93;&#40;&#36;{mainSitePath}api.html#echarts.init&#41;</pre>
- `exampleEditorPath`: For example, the source code of [line-simple](${exampleEditorPath}line-simple&edit=1&reset=1) is:

  <pre>&#91;line-simple&#93;&#40;&#36;{exampleEditorPath}line-simple&edit=1&reset=1&#41;</pre>
- `exampleViewPath`: For example, the source code of [line-simple](${exampleViewPath}line-simple&edit=1&reset=1) is:

  <pre>&#91;line-simple&#93;&#40;&#36;{exampleViewPath}scatter-exponential-regression&edit=1&reset=1&#41;</pre>
- `lang`: For example, the source code of [Get Started](${lang}/get-started) is:

  <pre>&#91;Get Started&#93;&#40;&#36;{lang}/get-started&#41;</pre>


## Headings [[[#headings]]]

The syntax:
<!-- prettier-ignore-start -->
<pre>
&#35;&#35; Some Heading [[[#a-unique-id-for-link]]]
</pre>
<!-- prettier-ignore-end -->

<md-alert type="danger">
The id is used to link this heading from outside.
It's strongly recommended to declare the id in each heading (e.g., [[[#a-unique-id-for-link]]]) and ensure it remains unchanged. Otherwise an id is auto-generated base on the title text, which may be unstable (changed when the heading text is changed), and varies across different languages.
</md-alert>

Note: No need to declare id for the main title of an article, as the link for an article is the file path (declared in `posts.yml`).

## Link to Other Articles [[[#link-to-other-articles]]]

The syntax is:
<pre>
&#91;Get Apache ECharts&#93;&#40;&#36;{lang}/basics/download&#41;
</pre>
The effect is:
[Get Apache ECharts](${lang}/basics/download)

## Embedding Code [[[#embedding-code]]]

### Basic Usage [[[#embedding-code-basic-usage]]]

The syntax is:
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

The effect is:
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

### Recommended Way of Writing Code [[[#embedding-code-recommended-way-of-writing-code]]]

In order to allow the tool to help us format the code, we should try to avoid syntactically problematic writing styles.

For example, the comment `...`

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

### Live Preview and Editing [[[#embedding-code-live-preview-and-editing]]]

> Currently only preview (render the charts) of ECharts option code is supported

The syntax is:
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

The effect is:
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

### More Preview Layouts [[[#embedding-code-more-preview-layouts]]]

#### Left to Right [[[#embedding-code-more-preview-layouts-left-to-right]]]

The syntax is:
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'lr'}
option = {
  ...
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

The effect is:
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

#### Right to left [[[#embedding-code-more-preview-layouts-right-to-left]]]

The syntax is:
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'rl'}
option = {
  ...
};
&#96;&#96;&#96;
</pre>
<!-- prettier-ignore-end -->

The effect is:
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

#### Down to Up [[[#embedding-code-more-preview-layouts-down-to-up]]]

The syntax is:
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js live {layout: 'bt'}
option = {
  ...
};
</pre>
<!-- prettier-ignore-end -->

The effect is:
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

### Highlighting Lines of Code and Adding Filenames [[[#embedding-code-highlighting-lines-of-code-and-adding-filenames]]]

The syntax is:
<!-- prettier-ignore-start -->
<pre>
&#96;&#96;&#96;js{1,3-5}[option.js]
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

The effect is:
```js{1,3-5}[option.js]
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

## Embedding Images [[[#embedding-images]]]

Source images are stored under `static/images/`.

The syntax is:
```
![image description](images/demo.png)
```

### Set the Image Height and Width [[[#embedding-images-set-width-height]]]

For the temporary style of the current page, you can just write html.

```
<img data-src="images/demo.png" style="width: 50px" />
```

## Embedding Examples (Iframe) [[[#embedding-examples]]]


The syntax is:
```
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>
```
`src` is the string after `?c=` in the https://echarts.apache.org/examples/en/editor.html?c=line-simple address.

The effect is:
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>

## Link to Examples [[[#link-to-examples]]]

The syntax is:
<pre>&#91;line-simple&#93;&#40;&#36;{exampleEditorPath}line-simple&edit=1&reset=1&#41;</pre>

The effect is:
[line-simple](${exampleEditorPath}line-simple&edit=1&reset=1)


## Link to ECharts Option Items [[[#link-to-echarts-option-items]]]

The syntax is:
<pre>&#91;xAxis.type&#93;&#40;&#36;{optionPath}xAxis.type&#41;</pre>

The effect is:
[xAxis.type](${optionPath}xAxis.type)

The syntax is:
<pre>&#91;echarts.init&#93;&#40;&#36;{apiPath}echarts.init&#41;</pre>

The effect is:
[echarts.init](${apiPath}echarts.init)


## More Component Usage [[[#more-component-usage]]]

The documentation supports the use of globally registered `markdown` components. In addition to the `md-example` component just described, the following components are also available

### md-alert [[[#more-component-usage-md-alert]]]

Prompt components

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
