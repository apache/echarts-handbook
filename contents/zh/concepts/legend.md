# 图例
图例是图表中对内容区元素的注释、用不同形状、颜色、文字等来标示不同数据列，通过点击对应数据列的标记，可以显示或隐藏该数据列。图例虽然不是图表中的主要信息、却是了解图表信息的钥匙。

## 布局
图例一般放在图表的右上角、也可以放在图表的底部、同一页面中的所有图例位置保持一致，可以横排对齐也可以纵排对齐。还要综合考虑整体的图表空间是适合哪种摆放方式。当图表纵向空间紧张或者内容区量过大的时候、建议摆放在图表的下方。下面是几种图例的摆放方式：

<img max-width="830" width="80%" height="80%"
src="${rootPath}/images/design/legend/charts_sign_img01.png">
</img>
<img max-width="830" width="80%" height="80%"
src="${rootPath}/images/design/legend/charts_sign_img02.png">
</img>

```js
option = {
    legend: {
        data: ['图例一', '图例二', '图例三'],
        orient: 'vertical',
        left: 10
        ...
    }
    ...
};
```

对于图例较多时，可以使用可滚动翻页的图例


```js
option = {
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['图例一', '图例二', '图例三', ..., '图例n'],
        ...
    },
    ...
};
```

## 样式
在深色系背景下、为了方便阅读，建议给图例加上半透明的浅色背景层，文字颜色设置为浅色。

```js
option = {
    legend: {
        data: ['图例一', '图例二', '图例三'],
        backgroundColor: '#ccc',
        textStyle: {
            color: '#ccc',
            ...
        }
        ...
    },
    ...
};
```

图例的颜色标签有很多种设计方式、针对不同的图表、图例样式也会有所不同。

<img max-width="830" width="80%" height="80%"
src="${rootPath}/images/design/legend/charts_sign_img04.png">
</img>

```js
option = {
    legend: {
        data: ['图例一', '图例二', '图例三'],
        icon: 'rect',
        ...
    },
    ...
};
```

## 交互
根据场景需要，图例可支持交互操作，点击控制显示或隐藏对应的数据列；

```js
option = {
    legend: {
        data: ['图例一', '图例二', '图例三'],
        selected: {
            '图例一': true,
            '图例二': true,
            '图例三': false
        }
        ...
    },
    ...
};
```


## 图例注意事项

图例要要注意视情况使用，有些双轴图包含了多种图表类型，不同类型的图例样式要有所区分。

```js
option = {
    legend: {
        data: [
            {
                name: '图例一',
                icon: 'rect'
            },
            {
                name: '图例二',
                icon: 'circle'
            },
            {
                name: '图例三',
                icon: 'pin'
            }
        ],
        ...
    },
    series: [
        {
            name: '图例一',
            ...
        },
        {
            name: '图例二',
            ...
        },
        {
            name: '图例三',
            ...
        }
    ]
    ...
};
```

当图表只有一种数据信息时，用图表标题说明数据信息即可。建议此时不要加上图例。


## 示例
<iframe max-width="830" width="100%" height="400"
 src="https://gallery.echartsjs.com/preview.html?c=xkyleg0ydW&v=2">
</iframe>

这里简要介绍了坐标轴相关的常用配置项及用法，更多关于坐标轴配置项及用法请移步[官网](${optionPath}legend)