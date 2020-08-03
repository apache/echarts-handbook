# Basic Bar Chart

Bar Chart is a chart that presents the comparisons among discrete data. The length of the bars is proportional related to the categorical data.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xS18jqmX4f">
</iframe>

While the label of the series is long, or there are more than 10 categories in one chart, a horizontal column chart can not show all labels, or labels can only be shown tilted. It affects the appliance. Therefore, we use a vertical bar chart to get a better display effect.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xByXtUE7Vz">
</iframe>

## Suggestions for Using Bar Chart

1. Avoid using too many colors. One bar chart represents one set of metrics in general so that we suggest to use the same color or at least different shades of the same color. You can use a contrasting color to highlight meaningful data points.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xByYRlN7Ef">
</iframe>

2. The gap between bars should be appropriate. When they are too close, the attention of the user may be focused on the gap between bars. A reasonable width should be not less than twice the gap between the bars.

3. Data on Y-axis should be started from 0, to reflect the value appropriately. If the y-axis is incomplete, it will mislead the user to make wrong judgments. For instance, the chart on the left side shows that the income in 2017 is 4 times higher than in 2014. But the chart on the right side shows the truth that the income in 2017 only increased by 25% compared with 2014.

<img max-width="830" width="100%" height="100%" 
src="${rootPath}/images/design/bar/bar03.jpg">
</img>

4. When sorting multiple data, if it is not related to some specific value like date, it is better to comply with a certain logic and guide the user to check the data in an intuitive way. In short, logical sorting can lead the user to read data better to a certain extent.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xHJhWhGm4M">
</iframe>

We don't recommend using a 3D bar chart because the data transmission is not accurate. Users even have to guess which is the top of the bar.

<img max-width="830" width="100%" height="100%" 
src="${rootPath}/images/design/bar/bar04.jpg">
</img>
