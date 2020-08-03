# Stacked Area Chart
The stacked area chart is a special kind of area chart. It is used to compare several data series in the same interval. The main difference between the area chart and stacked area chart is that the base of every series is over the previous one. Therefore, every time a line is measured, the area between the lines will be filled with color.

If there are several series and you want to analyze the part-to-whole relationship for every single one, which reflects the contribution of partial quantity to the total, you can use the stacked area chart. For instance, the contribution of one seller to the total sales.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xHySthj74z">
</iframe>

Here are two different kinds of stacked area chart:

+ <b>Traditional stacked chart</b>: Use the original value to stack, show the change in the whole process.
+ <b>Percentage stacked chart</b>: The percentage stacked chart shows how did the relationship between series changed with time. The cumulative total is not the focus as this kind of chart. The important is to show the series distribution as the whole.

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xSyBN2i7Vf">
</iframe>

## Suggestion for Using Stacked Area Chart

1. The area chart can't display data in many series that are closed to each others. It will make the chart hard to read: 

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xHyNDxOo4M">
</iframe>

With the same series, stacked bar chart works better:

<iframe max-width="830" width="100%" height="400" 
src="https://gallery.echartsjs.com/view-lite.html?cid=xSyBN2i7Vf">
</iframe>

<div class="article-look-outside">
	<div class="article-look-inside" style="padding-bottom:50%">
	    <iframe class="article-look-content"
	    src="https://gallery.echartsjs.com/view-lite.html?cid=xHyNDxOo4M">
	    </iframe>
	</div>
</div>

2. Although the stacked bar chart is good dealing with several series, try not to include more than 7 in one chart.

3. Because the stacked bar chart provides the relation between part and whole, you should not include negative value in series.

4. We suggest putting larger values on the top side of the chart, you will get a better display effect.
