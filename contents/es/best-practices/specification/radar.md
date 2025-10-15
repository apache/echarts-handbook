# Radar Chart

Radar Chart is suitable for display the data with more than three dimensions. The radar chart has more than two axes starting from the same point. The relative position and angle of the axis are usually meaningless. 

Every variable in the radar chart match one axis that starting from the center. Axes have the same scale index and included angle. Connect the scale between axis, and connect the item in each axis together to become a polygon.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xH1-fnLcVG&v=1">
</iframe>

The radar chart is useful for indicating similar values and checking outliers in variables. The radar chart can also be used to reflect what variables have a higher or lower score in the dataset, which makes it a better way to display the performance (see below). Similarly, the radar chart is often used in displaying data such as rankings, evaluations and reviews.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xHJH93GqVf&v=1">
</iframe>

As shown below, the chart shows the comparison of the budgets and expenses in a kindergarten fund flow. The six areas involved are food, toys, picture books, medical care and clothing. Every axis has a range of 0 to 500. The toy is the only part that was overspent while the clothing is far below the budget. It becomes clear at a glance while using a radar chart to show which part is overspend or underspend.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xrk6EfmqVf">
</iframe>

## Suggestion for Using Radar Chart

1. The number of polygons in the radar chart should be limited. If there are more than 5 categories to be evaluated, both the outline and color block will be too confusing to read.

2. Including too many axes can also make the radar chart difficult to read. Therefore, try to keep the radar chart concisely and limit the number of variables.

3. Because the radial distance is hard to judge, it is still difficult to read the specific value although there are grid lines. We recommend you use a line graph if you need to compare specific values.
