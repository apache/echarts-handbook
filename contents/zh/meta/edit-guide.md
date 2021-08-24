# 文档编辑指南

## 新增一个 markdown 文件

在 `contents/zh/`（中文文章）或 `contents/en/`（英文文章）目录下新增一个 markdown 文件，最多支持三级目录。将路径及标题信息更新在 `contents/zh/posts.yml` 或 `contents/en/posts.yml`。

markdown 文件名称小写。

## 使用 prettier 来自动格式化代码

在开始之前，我们推荐安装`prettier`的 [VSCode 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，该插件可以在你保存的时候自动帮你格式化代码。

如果你觉得自动的格式化破坏了你的代码块，你可以在在代码块外面加上下面代码阻止`prettier`格式化该部分代码

```markdown
<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

如果你发现有的代码块并没有被格式化，请先检查该代码是否存在语法上的错误。

## 内置变量

- `optionPath`
- `mainSitePath`
- `exampleViewPath`
- `exampleEditorPath`

使用方式:

```
${xxxxx}
```

## 引用代码

### 基础使用

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

### 代码推荐写法

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

### 实时预览和编辑

> 目前只支持对 Option 代码的预览

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

### 更多预览布局

#### 左右

<!-- prettier-ignore-start -->
```markdown
\```js live {layout: 'lr'}
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

#### 右左

<!-- prettier-ignore-start -->
```markdown
\```js live {layout: 'rl'}
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

#### 下上

<!-- prettier-ignore-start -->
```markdown
\```js live {layout: 'bt'}
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

### 高亮代码行

使用：

<!-- prettier-ignore-start -->
```markdown
\```js {1,3-5}
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

效果：

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

## 引用图片

图片实际存放地址在 `static/images/` 下。

```markdown
![图片说明](images/demo.png)
```

### 设置图片高宽

对于当前页面的临时样式，可以直接写 html：

```markdown
<img src="images/demo.png" style="width: 50px" />
```

## 添加示例 iframe

`src`为 https://echarts.apache.org/examples/zh/editor.html?c=line-simple 地址中`?c=`后面这一串

使用：

```markdown
<md-example src="doc-example/getting-started" width="100%" height="300" />
```

效果：
<md-example src="doc-example/getting-started" width="100%" height="300" />

## 添加配置项链接

使用：

```markdown
<md-option link="series-bar.itemStyle.color" />
```

效果:
<md-option link="series-bar.itemStyle.color" />

## 更多组件使用

文档支持使用全局注册的`markdown`组件，除了刚才介绍的`md-example`组件，还有下面几种组件

### md-alert

提示组件

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
<md-alert type="warning">
This is a danger alert.
</md-alert>
```

<md-alert type="danger">
This is a danger alert.
</md-alert>
