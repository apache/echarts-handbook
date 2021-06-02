# 项目结构说明

## 新增一个 markdown 文件

在 `contents/zh/`（中文文章）或 `contents/en/`（英文文章）目录下新增一个 markdown 文件，最多支持三级目录。将路径及标题信息更新在 `contents/zh/posts.js` 或 `contents/en/posts.js`。

markdown 文件名称小写，用 `-` 分割单词，不要用`_`分割。

## 引用代码

### 基础使用

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

```js
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
```


### 高亮代码行以及添加文件名

```markdown
```js{1,3-5}[option.js]
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
\```
```

```js{1,3-5}[option.js]
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
```



## 引用图片的方式

图片实际存放地址在 `static/images/` 下。

```markdown
![图片说明](images/demo.png)
```

### 设置图片高宽

对于当前页面的临时样式，可以直接写 html：

```markdown
<img src="images/demo.png" style="width: 50px" />
```

对于多个页面可以共享的样式，修改相关的 `.vue` 文件。


## 添加示例 iframe

```markdown
<md-example src="doc-example/tutorial-async" width="100%" height="300"></md-example>
```

<md-example src="doc-example/tutorial-async" width="100%" height="300"></md-example>