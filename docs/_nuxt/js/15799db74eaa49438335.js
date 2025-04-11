(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{397:function(n,t,e){"use strict";e.r(t),t.default='# 散点图\n\n散点图在直角坐标系显示数据的两个变量（X 和 Y 轴）之间的关系，数据显示为点的集合，适合用于在不考虑时间的情况下比较大量的数据点。散点图通常用来识别两个变量之间的相关性或用来观察他们的关系，从而发现某种趋势，对于查找异常值或理解数据分布也很有效。如下图某个班级学生身高和体重的分布状况。\n\n<iframe max-width="830" width="100%" height="400"\nsrc="https://gallery.echartsjs.com/view-lite.html?cid=xSkCyUwKNG&v=1">\n</iframe>\n\n散点图会显示不同类型的相关性，相关性即变量之间的关系。通常有正相关、负相关、不相关三种相关性。\n\n- 正相关：数据点从低 x、y 值的点到高 x、y 值，一个变量增加，另一个变量增加。\n\n- 负相关：数据点从高 x、y 值的点到低 x、y 值，一个变量增加，另一个变量减少。\n\n- 不相关：数据没有明显的方向性，一个变量变化对另一个没有影响。\n\n<img max-width="830" width="100%" height="100%"\nsrc="images/design/scatter/scatter5.jpg">\n</img>\n\n需要注意的是，散点图能够有效的说明两个变量之间的相关性，但是并不能有力地证明 \b 其中存在因果关系。例如广告投放量和点击率是正相关的，但是不能说点击率高一定是因为广告投放量多造成的。但是，如果有明显的正相关性，就有足够的理由去增加投放量，然后再去观察数据。\n\n## 散点图的使用建议\n\n1、如果一个散点图没有显示变量之间的任何关系，那么或许该图表类型不是此数据的最佳选择。\n\n2、如果数据包含不同系列，可以给不同系列使用不同的颜色，例如蓝色代表男性，红色代表女性，并增加图例标注出蓝色代表的含义。可以区分了解男女不同性别身高和体重的分布状况。还可以分别添加每个系列平均值的辅助线，可以更好的理解数据的分布情况，如图中女生体重高于平均值的比低于平均值的少。\n\n<iframe max-width="830" width="100%" height="400"\nsrc="https://gallery.echartsjs.com/view-lite.html?cid=xBy9E2oufM">\n</iframe>\n\n在观察两个变量之间的关系时，趋势线是非常有用的，趋势线的形状走向解释了两个变量之间的关系类型，还可以用来预测未来的值。但需要注意的是趋势线最可只能使用两条，以免干扰正常的数据的阅读。\n\n3、散点图只有有足够多的数据点，并且数据之间有相关性时才能呈现很好的结果。如果一份数据只有极少的信息或者数据间没有相关性，那么绘制一个很空的散点图和不相关的散点图都是没有意义的。\n'}}]);