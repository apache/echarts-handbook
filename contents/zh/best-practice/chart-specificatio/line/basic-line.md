# 基础折线图

折线图主要用来展示数据相随着时间推移的趋势或变化。折线图非常适合用于展示一个连续的二维数据，如某网站访问人数或商品销量价格的波动。

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xB1kG1rLEG&v=1">
</iframe>

折线图除了展示某个事情发展的趋势，还可以用来比较多个不同的数据序列。如下图，可以通过对比同时间段的三种商品的销量，分析哪一种商品的销量最好。

<iframe max-width="830" width="100%" height="400" 
 src="https://gallery.echartsjs.com/view-lite.html?cid=xSkBiMSU4M&v=1">>
 </iframe>

折线图是两个数据点之间用线连接起来，为了追求美观或特殊的效果，还可以如上图将两点之间用曲线连接，这种图又叫曲线图或样条图样条。样条图与折线图用法相同，只是每个数据点之间的绘制是曲线的。

## 折线图的使用建议

1、使用实线绘制数据线，首先要保证能够的区分数据线和坐标轴线，并且要尽力要所有的数据清晰可识别。

2、建议不要绘制4条以上的折线，如下图错误的示例，线都折叠在一起并且又没有明显的对比，整张图表就会混乱并难以阅读。

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xBJzdEItVz&v=1">
</iframe>

3、不建议使用过多的装饰来区分图表，图例虽然可以帮助区分不同数据系列，但如下图使用过多种类的图例有时会让用户分心。
<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xS1Tbdr8EG&v=1">
</iframe>


4、展示折线图的数据时，要避免刻意的歪曲趋势。如下图，左图过于扁平化掩盖了想传达的信息，右图过于夸大趋势。要根据展示数据波动的参考单位，做有意义的波动分析。正确的数据高度是线约占Y轴高度的 2/3。

<img max-width="830" width="100%" height="100%" 
src="${rootPath}/images/design/line/line01.jpg"></img>
