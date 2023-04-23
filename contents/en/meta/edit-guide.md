# Document Editing Guidelines

## Adding a Markdown File

Add a markdown file to the `contents/zh/` (Chinese posts) or `contents/en/` (English posts) directories, up to three levels. Update the path and title information in `contents/zh/posts.yml` or `contents/en/posts.yml`.

Lowercase markdown file names.

## Using Prettier to Automatically Format Code

Before you start, we recommend installing the [prettier VSCode plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), which will automatically format the code for you when you save it.

If you feel that the automatic formatting is breaking your code block, you can add the following comment to prevent `prettier` from formatting the code inside the block

```markdown
<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

If you find blocks of code that are not formatted, check first for syntax errors in the code.

## Built-in Variables

- `optionPath`
- `mainSitePath`
- `exampleViewPath`
- `exampleEditorPath`
- `lang`

Usage:

```
${xxxxx}
```

## Link to Other Articles

```markdown
[Get Apache ECharts](${lang}/basics/download)
```

[Get Apache ECharts](${lang}/basics/download)

## Embedding Code

### Basic Usage

<!-- prettier-ignore-start -->

```markdown
```js
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
\```
```

<!-- prettier-ignore-end -->

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

### Recommended Way of Writing Code

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

### Live Preview and Editing

> Currently only preview of Option code is supported

<!-- prettier-ignore-start -->
```markdown
\```js live
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
\```
```

<!-- prettier-ignore-end -->

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

### More Preview Layouts

#### Left to Right

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'lr'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

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

#### Right to left

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'rl'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

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

#### Down to Up

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'bt'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

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

### Highlighting Lines of Code and Adding Filenames

Use.

<!-- prettier-ignore-start -->

```markdown
```js{1,3-5}[option.js]
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
\```
```

<!-- prettier-ignore-end -->

Effects.

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

## Embedding Images

Source images are stored under `static/images/`.

```markdown
![image description](images/demo.png)
```

### Set the Image Height and Width

For the temporary style of the current page, you can just write html.

```markdown
<img data-src="images/demo.png" style="width: 50px" />
```

## Add Example Iframe

`src` is the string after `?c=` in the https://echarts.apache.org/examples/en/editor.html?c=line-simple address

Use:

```markdown
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>
```

Result:
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>

## Add Link to Option Item

Use:

```markdown
<md-option link="series-bar.itemStyle.color"></md-option>
```

Result:
<md-option link="series-bar.itemStyle.color"></md-option>

## More Component Usage

The documentation supports the use of globally registered `markdown` components. In addition to the `md-example` component just described, the following components are also available

### md-alert

Prompt components

```markdown
<md-alert type="info">
This is an info alert.
</md-alert>
```

<md-alert type="info">
This is an info alert.
</md-alert>

```markdown
<md-alert type="success">
This is a success alert.
</md-alert>
```

<md-alert type="success">
This is a success alert.
</md-alert>

```markdown
<md-alert type="warning">
This is a warning alert.
</md-alert>
```

<md-alert type="warning">
This is a warning alert.
</md-alert>

```markdown
<md-alert type="danger">
This is a danger alert.
</md-alert>
```

<md-alert type="danger">
This is a danger alert.
</md-alert>
