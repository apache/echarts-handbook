# 获取 Apache ECharts

Apache ECharts 提供了多种安装方式，你可以根据项目的实际情况选择以下任意一种方式安装。

- 从 GitHub 获取
- 从 npm 获取
- 从 CDN 获取
- 在线定制

接下来我们将分别介绍这些安装方式，以及下载后的目录结构。

## 安装方式

### 从 npm 获取

```sh
npm install echarts
```

详见[在项目中引入 Apache ECharts](${lang}/basics/import)。

### 从 CDN 获取

可以从以下免费 CDN 中获取和引用 ECharts。

- [jsDelivr](https://www.jsdelivr.com/package/npm/echarts)
- [unpkg](https://unpkg.com/browse/echarts/)
- [cdnjs](https://cdnjs.com/libraries/echarts)

### 从 GitHub 获取

[apache/echarts](https://github.com/apache/echarts) 项目的 [release](https://github.com/apache/echarts/releases) 页面可以找到各个版本的链接。点击下载页面下方 Assets 中的 Source code，解压后 `dist` 目录下的 `echarts.js` 即为包含完整 ECharts 功能的文件。

### 在线定制

如果只想引入部分模块以减少包体积，可以使用 [ECharts 在线定制](${mainSitePath}builder.html)功能。
