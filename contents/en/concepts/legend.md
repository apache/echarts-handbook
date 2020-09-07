# Legend
Legends are used to annotate the content in the chart using different colors, shapes and texts to indicate different categories. By clicking the legends, the user can show or hide the corresponding categories. Legend does not include the main info but is the key to understand the chart.

## Layout
1. Legend is always placed at the upper right corner of the chart. All legends in the same page need to be consistent, align horizontally or vertically by considering the layout of the overall chart space. When the chart have little vertical space or the content area is crowded, it is also a good choice to put legent on the bottom of the chart. Here are some layouts of the legend: 

    <img max-width="830" width="80%" height="80%" 
    src="${rootPath}/images/design/legend/charts_sign_img01.png">
    </img>
    <img max-width="830" width="80%" height="80%" 
    src="${rootPath}/images/design/legend/charts_sign_img02.png">
    </img>

    ```js
    option = {
        legend: {
            data: ['Legend A', 'Legend B', 'Legent C'],
            orient: 'vertical',
            left: 10
            ...
        }
        ...
    };
    ```

2. Use scrollable control if there are many legends. 

    ```js
    option = {
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['Legend A', 'Legend B', 'Legend C', ..., 'Legend x'],
            ...
        },
        ...
    };
    ```

## Style
1. For dark color background, use a light color for the background layer and text while changing the background to translucent. 

    ```js
    option = {
        legend: {
            data: ['Legend A', 'Legend B', 'Legend C'],
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

2. The color of legend has many ways to design. For different charts, the legend style can be different.

    <img max-width="830" width="80%" height="80%" 
    src="${rootPath}/images/design/legend/charts_sign_img04.png">
    </img>

    ```js
    option = {
        legend: {
            data: ['Legend A', 'Legend B', 'Legend C'],
            icon: 'rect',
            ...
        },
        ...
    };
    ```

## Interactive
Depend on the environmental demand, the legend can support interactive operation. Click the legend to show or hide corresponding categories: 

```js
option = {
    legend: {
        data: ['Legend A', 'Legend B', 'Legend C'],
        selected: {
            'Legend A': true,
            'Legend B': true,
            'Legend C': false
        }
        ...
    },
    ...
};
```


## Tips
1. The legend should be used according to the situation. Some dual-axis charts include multiple chart types. Different kinds of legend stypes should be distinguished. 
   
   ```js
    option = {
        legend: {
            data: [
                {
                    name: 'Legend A',
                    icon: 'rect'
                },
                {
                    name: 'Legend B',
                    icon: 'circle'
                },
                {
                    name: 'Legend C',
                    icon: 'pin'
                }
            ],
            ...
        },
        series: [
            {
                name: 'Legend A',
                ...
            },
            {
                name: 'Legend B',
                ...
            },
            {
                name: 'Legend C',
                ...
            }
        ]
        ...
    };
    ```

2. While there is only one kind of data in the chart, use the chart title rather than the legend to explain it.


## Example
<iframe max-width="830" width="100%" height="400" 
 src="https://gallery.echartsjs.com/preview.html?c=xkyleg0ydW&v=2">
</iframe>

This document briefly introduced the common config about the legend. For more configuration item, please check our [website](${optionPath}legend). 