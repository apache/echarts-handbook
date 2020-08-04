# Scatter Chart

The scatter chart shows the relation between the two variables. Data is embodied as a collection of points, which is appropriate to compare a large number of data without considering the time. The scatter chart can identify the relevant and relation of two variables thus find some trend. The scatter chart is also workable to find outliers or to understand data distribution. The chart above shows the distribution of the height and weight of students in a class. 

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xSkCyUwKNG&v=1">
</iframe>

The scatter chart can reflect the correlation(relation between variables) of a different type. It can be positively correlated, negatively correlated and uncorrelated. 

+ Positively Correlated: When one value increases, the other value increases.

+ Negatively Correlated: When one value increases, the other value decreases.

+ Uncorrelated: Two values have no obvious relation and have no influence on each other.


<img max-width="830" width="100%" height="100%" 
src="${rootPath}/images/design/scatter/scatter5.jpg">
</img>

To be mentioned, the scatter chart can effectively illustrate the correlation between the two variables. However, it cannot strongly prove there exist causality. For example, AD serving and Visits are positively correlated, but we cannot prove that more AD serving must lead to more Visits. However, we have enough reason to increase the AD serving and observe the outcome after we find out the positive correlation between them. 

## Suggestion for Using Scatter Chart

1. If no correlation was shown in the scatter chart, then the scatter chart is not the best choice.

2. If the package included a different series, you can use different colors for each series. As an example, add the legend to mark male as blue, female as red. You can not only distinguish the height and weight of different genders but also add an auxiliary line for the average of each series to improve the understanding of the distribution. In this case, females have more amount higher than the average value than lower.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xBy9E2oufM">
</iframe>

The trend line is useful when observing the relationship between two variables. The shape of the trend line can explain the relation type of two variables as well as make a prediction. It is better to include only two trend lines to avoid interference with the reading. 

3. The scatter points can present a good appearance only with adequate and relevant data. It is meaningless to draw a chart with very little and unrelated values. 