# 下载

Apache ECharts (incubating) 提供了多种安装方式，你可以根据项目的实际情况选择以下任意一种方式安装。

1. 从官网获取
2. 从 GitHub 获取
3. 从 npm 获取
4. 从 CDN 获取
5. 在线定制

接下来我们将分别介绍这些安装方式，以及下载后的目录结构。



## 安装方式

### 从官网获取

[Apache ECharts (incubating) 官网下载界面](https://echarts.apache.org/download.html) 提供了镜像网站下载源码，并且核对签名的方式——这可以保证下载的代码与发布的代码一致。

具体的方法参见[官网下载页面](${mainSitePath}/download.html)。


### 从 GitHub 获取

[apache/incubator-echarts](https://github.com/apache/incubator-echarts) 项目的 [release](https://github.com/apache/incubator-echarts/releases) 页面可以找到各个版本的链接。点击下载页面下方 Assets 中的 Source code，解压后 `dist` 目录下的 `echarts.js` 即为包含完整 ECharts 功能的文件。


### 从 npm 获取

```sh
npm install echarts --save
```

详见[在 webpack 中使用 echarts](https://echarts.apache.org/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)。


### 从 CDN 获取

在 jsDelivr 的 [echarts](https://www.jsdelivr.com/package/npm/echarts) 项目中找到 `dist/echarts.js`，下载到本地使用。


### 在线定制

如果只想引入部分模块以减少包体积，可以使用 [ECharts 在线定制](${mainSitePath}/builder.html)功能。


## 目录结构

下面介绍项目 [`dist`](https://github.com/apache/incubator-echarts/tree/master/dist) 目录下各个文件的意义：

- `echarts.js`：包含了完整 ECharts 功能的代码，没有经过压缩；推荐调试时使用。
- `echarts.min.js`：`echarts.js` 的压缩结果；推荐线上使用。
- `echarts.simple.js`：包含折线图、柱状图、饼图的代码；推荐不需要其他系列类型的项目使用。
- `echarts.common.js`：包含了常用组件和系列类型的代码，完整支持的内容参见 [echarts.common.js](https://github.com/apache/incubator-echarts/blob/master/echarts.common.js)

带有 `-en` 的文件是对应的英文版本，带有 `.min` 的文件是对应的压缩版本。
