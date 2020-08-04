# Pie Chart

The pie chart is mainly used to display the proportion of different categories compared with the total. The arc length of each sector in the figure means the proportion of the category. The sum of all categories is 100%. 

<iframe max-width="830" width="100%" height="400"
src="https://gallery.echartsjs.com/view-lite.html?cid=xHySlBkIEM&v=1">
</iframe>

Even the pie chart can display the distribution radio of the data, and widely used in every field, there is still controversy around the pie chart and its deformation chart. Therefore, you should use the pie chart with caution and avoid misunderstanding.

## Suggestion for Using Pie Chart

1. The pie chart is preferred to show the proportion of data in the same dimension. It requests the data to be positive. Please also make sure the total of sectors is 100%.

2. It is hard to compare the data in the pie chart with too many pieces. We suggest to controlling the number of categories under five. While there are too many categories, we might merge some unimportant data together, and name as "other". If all categories cannot be omitted, you should try a bar chart or stacked bar chart as an alternative.

<img max-width="830" width="100%" height="100%"
src="${rootPath}/images/design/pie/pie02.jpg">
</img>

3. The pie chart is not appropriate for the comparison of precise data. The following graph (left below) shows that every sector has almost the same proportion. In this case, you should try a bar chart or rose chart (right below) to achieve a better effect.

<img max-width="830" width="100%" height="100%"
src="${rootPath}/images/design/pie/pie03.jpg">
</img>

4. Visual habits of most people are observing from top to bottom in clockwise. Therefore we recommend you put the largest sector in the first place in the clockwise direction to stress the importance.

There are two advices for the rest of the data. Arrange sectors from big to small in clockwise or anti-clockwise follows the largest one: 

<img max-width="830" width="100%" height="100%"
src="${rootPath}/images/design/pie/pie01.jpg">
</img>

Order the sectors according to the size not only consistent with the visual habits but also easier for data's identify and comparison. Base on this principle, you can put the part that needs to emphasize (don't need to be the largest part) at the prominent position. 

5. You can add some decorations like color, motion, style, position to stress some data in a chart. Please be moderate or it will distract the user. 

<iframe max-width="830" width="100%" height="400"
 src="https://gallery.echartsjs.com/view-lite.html?cid=xHySlBkIEM&v=1">
</iframe>

6. 3D pie chart distorted the ratio between each sector, which will cause mistakes and confusion in understanding. Therefore,a 3D pie chart is not recommended.

<img max-width="830" width="100%" height="100%"
src="${rootPath}/images/design/pie/pie04.jpg">
</img>
