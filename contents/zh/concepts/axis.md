# 坐标轴
直角坐标系中的 X/Y 轴。

## X轴、Y轴
1. X轴和Y轴都由轴线、刻度、刻度标签、轴标题四个部分组成。部分图表中还会有网格线来帮助查看和计算数据

<img max-width="830" width="100%" height="100%" 
src="${rootPath}/images/design/axis/charts_axis_img02.jpg">
</img>

2. 普通的二维数据坐标系都有x轴和y轴，通常情况下，x轴显示在图表的底部，y轴显示在左侧，一般配置如下：

    ```js
    option = {
        xAxis: {
            ...
        },
        yAxis: {
            ...
        }
        ...
    };
    ```

3. X轴常用来标示数据的维度，维度一般用来指数据的类别，是观察数据的角度，例如“销售时间” “销售地点” “产品名称”等。Y轴常常用来标示数据的数值，数值是用来具体考察某一类数据的数量值，也是我们需要分析的指标，例如“销售数量”和“销售金额”等。
    
    ```js
    option = {
        xAxis: {
            type: 'time',
            name: '销售时间'
            ...
        },
        yAxis: {
            type: 'value',
            name: '销售数量'
            ...
        }
        ...
    };
    ```

4. 当X轴（水平坐标轴）跨度很大，可以采用才区域缩放方式灵活显示数据内容。

    ```js
    option = {
        xAxis: {
            type: 'time',
            name: '销售时间'
            ...
        },
        yAxis: {
            type: 'value',
            name: '销售数量'
            ...
        },
        dataZoom: [...]
        ...
    };
    ```

5. 在二维数据中，轴也可以有多个。ECharts 中一般情况下单个 grid 组件最多只能放两个 X/Y 轴，多于两个 X/Y 轴需要通过配置 offset 属性防止同个位置多个轴的重叠。两个x轴显示在上下，两个y轴显示在左右两侧。

    ```js
    option = {
        xAxis: {
            type: 'time',
            name: '销售时间'
            ...
        },
        yAxis: [
            {
                type: 'value',
                name: '销售数量'
                ...
            },
            {
                type: 'value',
                name: '销售金额'
                ...
            }
        ]
        ...
    };
    ```

## 轴线
Echarts 提供了轴线[axisLine](${optionPath}xAxis.axisLine)相关的配置，我们可以根据实际情况调整，例如轴线两端的箭头，轴线的样式等。

```js
option = {
    xAxis: {
        axisLine: {
            symbol: 'arrow',
            lineStyle: {
                type: 'dashed'
                ...
            }
        }
        ...
    },
    yAxis: {
        axisLine: {
            symbol: 'arrow',
            lineStyle: {
                type: 'dashed'
                ...
            }
        }
    }
    ...
};
```

## 刻度
Echarts 提供了轴线[axisTick](${optionPath}xAxis.axisTick)相关的配置，我们可以根据实际情况调整，例如刻度线的长度，样式等。

```js
option = {
    xAxis: {
        axisTick: {
            length: 6,
            lineStyle: {
                type: 'dashed'
                ...
            }
        }
        ...
    },
    yAxis: {
        axisTick: {
            length: 6,
            lineStyle: {
                type: 'dashed'
                ...
            }
        }
    }
    ...
};
```

## 刻度标签
Echarts 提供了轴线[axisLabel](${optionPath}xAxis.axisLabel)相关的配置，我们可以根据实际情况调整，例如文字对齐方式，自定义刻度标签内容等。

```js
option = {
    xAxis: {
        axisLabel: {
            formatter: '{value} kg',
            align: 'center'
            ...
        }
        ...
    },
    yAxis: {
        axisLabel: {
            formatter: '{value} 元',
            align: 'center'
            ...
        }
    }
    ...
};
```

## 示例
图左侧的y轴代表着东京月平均气温，右图的y轴表示东京降水量，x轴表示时间。两组y轴在一起，反映了平均气味和降水量间的趋势关系。
<!-- src 需要替换 -->
<iframe max-width="830" width="100%" height="400" 
 src="https://gallery.echartsjs.com/view-lite.html?cid=xrJYBh__4z">
</iframe>


这里简要介绍了坐标轴相关的常用配置项及用法，更多关于坐标轴配置项及用法请移步[官网](${optionPath}xAxis)