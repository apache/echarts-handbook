# Rich Text

Rich text can be used in Apache ECharts<sup>TM</sup> labels of series, axis or other components since v3.7. Which supports:

- Box styles (background, border, shadow, etc.), rotation, position of a text block can be specified.
- Styles (color, font, width/height, background, shadow, etc.) and alignment can be customzied on fragments of text.
- Image can be used in text as icon or background.
- Combine these configurations, some special effects can be made, such as simple table, horizontal rule (hr).

At the beginning, the meanings of two terms that will be used below should be clarified:

- Text Block: The whole block of label text.
- Text fragment: Some piece of text in a text block.

For example:

<md-example src="doc-example/text-block-fragment" width="450" height="300"></md-example>

## Options about Text

echarts provides plenty of text options, including:

- Basic font style: `fontStyle`, `fontWeight`, `fontSize`, `fontFamily`.
- Fill of text: `color`.
- Stroke of text: `textBorderColor`, `textBorderWidth`.
- Shadow of text: `textShadowColor`, `textShadowBlur`, `textShadowOffsetX`, `textShadowOffsetY`.
- Box size of text block or text fragment: `lineHeight`, `width`, `height`, `padding`.
- Alignment of text block or text fragment: `align`, `verticalAlign`.
- Border, background (color or image) of text block or text fragment: `backgroundColor`, `borderColor`, `borderWidth`, `borderRadius`.
- Shadow of text block or text fragment: `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`.
- Position and rotation of text block: `position`, `distance`, `rotate`.

User can defined styles for text fragment in `rich` property. For example, [series-bar.label.rich](option.html#series-bar.label.rich)

For example:

```js
labelOption = {
  // Styles defined in 'rich' can be applied to some fragments
  // of text by adding some markers to those fragment, like
  // `{styleName|text content text content}`.
  // `'\n'` is the newline character.
  formatter: [
    '{a|Style "a" is applied to this fragment}',
    '{b|Style "b" is applied to this fragment}This fragment use default style{x|use style "x"}'
  ].join('\n'),

  // Styles for the whole text block are defined here:
  color: '#333',
  fontSize: 5,
  fontFamily: 'Arial',
  borderWidth: 3,
  backgroundColor: '#984455',
  padding: [3, 10, 10, 5],
  lineHeight: 20,

  // Styles for text fragments are defined here:
  rich: {
    a: {
      color: 'red',
      lineHeight: 10
    },
    b: {
      backgroundColor: {
        image: 'xxx/xxx.jpg'
      },
      height: 40
    },
    x: {
      fontSize: 18,
      fontFamily: 'Microsoft YaHei',
      borderColor: '#449933',
      borderRadius: 4
    }
    // ...
  }
};
```

> Notice: `width` 和 `height` only work when `rich` specified.

## Basic Styles of Text, Text Block and Text Fragment

Basic font style can be set to text: `fontStyle`, `fontWeight`, `fontSize`, `fontFamily`.

Fill color and stroke color can be set to text: `color`, `textBorderColor`, `textBorderWidth`.

Border style and background style can be set to text block: `borderColor`, `borderWidth`, `backgroundColor`, `padding`.

Border style and background style can be set to text fragment too: `borderColor`, `borderWidth`, `backgroundColor`, `padding`.

For example:

```js live
option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 1,
      data: [
        {
          value: [0, 0],
          label: {
            show: true,
            formatter: [
              'Plain text',
              '{textBorder|textBorderColor + textBorderWidth}',
              '{textShadow|textShadowColor + textShadowBlur + textShadowOffsetX + textShadowOffsetY}',
              '{bg|backgroundColor + borderRadius + padding}',
              '{border|borderColor + borderWidth + borderRadius + padding}',
              '{shadow|shadowColor + shadowBlur + shadowOffsetX + shadowOffsetY}'
            ].join('\n'),
            backgroundColor: '#eee',
            borderColor: '#333',
            borderWidth: 2,
            borderRadius: 5,
            padding: 10,
            color: '#000',
            fontSize: 14,
            shadowBlur: 3,
            shadowColor: '#888',
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            lineHeight: 30,
            rich: {
              textBorder: {
                fontSize: 20,
                textBorderColor: '#000',
                textBorderWidth: 3,
                color: '#fff'
              },
              textShadow: {
                fontSize: 16,
                textShadowBlur: 5,
                textShadowColor: '#000',
                textShadowOffsetX: 3,
                textShadowOffsetY: 3,
                color: '#fff'
              },
              bg: {
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                padding: 5
              },
              border: {
                color: '#000',
                borderColor: '#449911',
                borderWidth: 1,
                borderRadius: 3,
                padding: 5
              },
              shadow: {
                backgroundColor: '#992233',
                padding: 5,
                color: '#fff',
                shadowBlur: 5,
                shadowColor: '#336699',
                shadowOffsetX: 6,
                shadowOffsetY: 6
              }
            }
          }
        }
      ]
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: -1,
    max: 1
  }
};
```

## Label Position

`label` option can be use in charts like `bar`, `line`, `scatter`, etc. The position of a label, can be specified by [label.position](option.html#series-scatter.label.position)、[label.distance](option.html#series-scatter.label.distance).

Try to modify the `position` and `distance` option in the following example:

```js live
option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 160,
      symbol: 'roundRect',
      data: [[1, 1]],
      label: {
        // Options: 'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        position: 'top',
        distance: 10,

        show: true,
        formatter: ['Label Text'].join('\n'),
        backgroundColor: '#eee',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        shadowBlur: 3,
        shadowColor: '#888',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        textBorderColor: '#000',
        textBorderWidth: 3,
        color: '#fff'
      }
    }
  ],
  xAxis: {
    max: 2
  },
  yAxis: {
    max: 2
  }
};
```

> Notice, there are different optional values of `position` by different chart types. And `distance` is not supported in every chart. More detailed info can be checked in [option doc](${mainSitePath}option.html).

## Label Rotation

Sometimes label is needed to be rotated. For example:

```js live {layout: 'lr'}
const labelOption = {
  show: true,
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

option = {
  xAxis: [
    {
      type: 'category',
      data: ['2012', '2013', '2014', '2015', '2016']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    }
  ]
};
```

[align](option.html#series-bar.label.align) and[verticalAlign](option.html#series-bar.label.verticalAlign) can be used to adjust location of label in this scenario.

Notice, `align` and `verticalAlign` are applied firstly, then rotate.

## Layout and Alignment of Text fragment

To understand the layout rule, every text fragment can be imagined as a `inline-block` dom element in CSS.

`content box size` of a text fragment is determined by its font size by default. It can also be specified directly by `width` and `height`, although they are rarely set. `border box size` of a text fragment is calculated by adding the `border box size` and `padding`.

Only `'\n'` is the newline character, which breaks a line.

Multiple text fragment exist in a single line. The height of a line is determined by the biggest `lineHeight` of text fragments. `lineHeight` of a text fragment can be specified in `rich`, or in the parent level of `rich`, otherwise using `box size` of the text fragment.

Having `lineHeight` determined, the vertical position of text fragments can be determined by `verticalAlign` (there is a little different from the rule in CSS):

- `'bottom'`: The bottom edge of the text fragment sticks to the bottom edge of the line.
- `'top'`: The top edge of the text fragment sticks to the top edge of the line.
- `'middle'`: In the middle of the line.

The width of a text block can be specified by `width`, otherwise, by the longest line. Having the width determined, text fragment can be placed in each line, where the horizontal position of text fragments can be determined by its `align`.

- Firstly, place text fragments whose `align` is `'left'` from left to right continuously.
- Secondly, place text fragments whose `align` is `'right'` from right to left continuously.
- Finally, the text fragments remained will be sticked and placed in the center of the rest of space.

The position of text in a text fragment:

- If `align` is `'center'`, text aligns at the center of the text fragment box.
- If `align` is `'left'`, text aligns at the left of the text fragment box.
- If `align` is `'right'`, text aligns at the right of the text fragment box.

## Effects: Icon, Horizontal Rule, Title Block, Simple Table

See example:

```js live {layout: 'lr'}
option = {
  series: [
    {
      type: 'scatter',
      data: [
        {
          value: [0, 0],
          label: {
            formatter: [
              '{tc|Center Title}{titleBg|}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        },
        {
          value: [0, 1],
          label: {
            formatter: [
              '{titleBg|Left Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n')
          }
        },
        {
          value: [0, 2],
          label: {
            formatter: [
              '{titleBg|Right Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        }
      ],
      symbolSize: 1,
      label: {
        show: true,
        backgroundColor: '#ddd',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000',
        fontSize: 14,
        rich: {
          titleBg: {
            backgroundColor: '#000',
            height: 30,
            borderRadius: [5, 5, 0, 0],
            padding: [0, 10, 0, 10],
            width: '100%',
            color: '#eee'
          },
          tc: {
            align: 'center',
            color: '#eee'
          },
          hr: {
            borderColor: '#777',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          sunny: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/sunny_128.png'
            }
          },
          cloudy: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/cloudy_128.png'
            }
          },
          showers: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image:
                'https://echarts.apache.org/examples/data/asset/img/weather/showers_128.png'
            }
          }
        }
      }
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: 0,
    max: 2,
    inverse: true
  }
};
```

Icon is implemented by using image in `backgroundColor`.

```js
rich: {
    Sunny: {
        backgroundColor: {
            image: './data/asset/img/weather/sunny_128.png'
        },
        // Can only height specified, but leave width auto obtained
        // from the image, where the aspect ratio kept.
        height: 30
    }
}
```

Horizontal rule (like HTML &lt;hr&gt; tag) can be implemented by border:

```js
rich: {
    hr: {
        borderColor: '#777',
        // width is set as '100%' to fullfill the text block.
        // Notice, the percentage is based on the content box, without
        // padding. Although it is a little different from CSS rule,
        // it is convinent in most cases.
        width: '100%',
        borderWidth: 0.5,
        height: 0
    }
}
```

Title block can be implemented by `backgroundColor`:

```js
// Title is at left.
formatter: '{titleBg|Left Title}',
rich: {
    titleBg: {
        backgroundColor: '#000',
        height: 30,
        borderRadius: [5, 5, 0, 0],
        padding: [0, 10, 0, 10],
        width: '100%',
        color: '#eee'
    }
}

// Title is in the center of the line.
// This implementation is a little tricky, but is works
// without more complicated layout mechanism involved.
formatter: '{tc|Center Title}{titleBg|}',
rich: {
    titleBg: {
        align: 'right',
        backgroundColor: '#000',
        height: 30,
        borderRadius: [5, 5, 0, 0],
        padding: [0, 10, 0, 10],
        width: '100%',
        color: '#eee'
    }
}
```

Simple table can be implemented by specify the same width to text fragments that are in the same column of different lines. See the [example](${exampleEditorPath}pie-rich-text).
