# Leveraging Color to Enhance Data Visualization

Color is amongst the first things people perceive when they look at data visualizations. Using visual encoding is an effective way to communicate the most important aspects of your data visualization. In this document we will reviews at some specific examples of how you can use color improve your visualizations.

## Sympathetic Response of Color

Color perception is a complicated result of the interaction between physiological and psychological effects. To prove that humans can perceive colors by warm and cool, Hiroshi Ohchi, a Japanese graphic designer has done an experiment to paint the wall of two workplaces in gray-cyan and red-orange. With the same objective ambient temperature and labor intensity, staff in the workplace colored gray-cyan are more likely to feel cool. Further research found that in addition to the feeling of warm and cool, we are also experience light and dark, far and near, lively and melancholic when observing colors. Colors will cause emotional fluctuations that affect human behavior based on human instinct.

In the field of visualization, if we choose the color that coincides with the characteristic of data and the sympathetic response of emotions.

Here is an example of the selling percentage of a certain dessert shop:

<img max-width="830" width="50%" height="100%"
src="https://github.com/apache/echarts-handbook/blob/master/static/images/design/color/color01.png">
</img>

We provided two charts with the same style but different color schemes. The right side one obviously performs better for the dessert data displaying.

<img max-width="830" width="100%" height="100%"
src="https://github.com/apache/echarts-handbook/blob/master/static/images/design/color/color02.png">
</img>

Compared with blue and purple, color likes orange, yellow, pink and green are preferred choices to inspire the appetite, happiness and warmness which matched the motion of eating sweets. In the other hand, most of the customer group for desserts is woman and children. Lively and cute chart colors in the left chart might be the better choice compared with the calm and rational colors of the chart.

## Semantic Response of Color

Different colors can help us to identify and classify different ideas because we are familiar with combining things and concepts with colors. We subconsciously think of white when we referring to "clouds", pink when we referring to "love". Those colors that are naturally consistent with semantics are called "semantic-resonant color".

The researchers noticed that matching the semantic-resonant color for words contained specific color can increase the speed of the cognitive process and vice versa. This funny phenomenon is called the "Stroop Effect". In a comparative test (as shown below), the text "YELLOW" in the first line is easier to be positioned compared with the text "YELLOW" in the second line. In the second line, the text "PURPLE" have the font color of yellow, which makes it being noticed earlier sometimes. The font color here interfered with our ability to find the right answer in a timely manner.

<img max-width="830" width="100%" height="100%"
src="https://github.com/apache/echarts-handbook/blob/master/static/images/design/color/color03.png">
</img>

Semantic-resonant coloring can be used effectively by having the color on the visualization assigned to the same colour the data is associated with in the real world to improve the cognition efficiency of the visualization. For instance, you might use blue to display the data of "OCEAN", yellow to display the data of "DESERT".

Visual effects should be explained as simply as possible. Try to identify a color scheme that matches preconceived and cultural associations a user may have. For example, when designing a chart that shows the sales info of kiwifruit, banana, orange and strawberry, select a palette that uses same colors as the fruit itself. This will allow the user to easily identify the fruit corresponding to chart element without having to read text in the color legend.

## Common Sense Consistency of Color

In terms of visualization, the color used is directly related to factors such as data type, display environment, target client, and social background. You cannot separate color as an individual factor to design. Be mindful of how colours can be perceived when selecting a color scheme and check if a special type of data is being used. For example, the colors green and red in a stock chart are commonly perceived as representing positive and negative, respectively. See [this visualization as an example of the colour green being used to indicate a positive, and red to indicate a negative.](https://echarts.apache.org/examples/en/editor.html?c=line-sections) Unless you will be using a specifial type of data, your choice of color should compliment, not conflict, common uses of colour so your users distinguish the chart efficiently.

## Divide Data by Colors

It is common to use line charts to analyze trends. Intervals can be conditionally colored to clearly indicate when data falls within a specific range or domain. For example, if you set 25%-75% as planned sales, try to set different colors for each interval in the greater range to indicate whether values at any given point have failed to reach a goal, have reached a goal, or have exceeded a goal.

<img max-width="830" width="80%" height="100%"
src="https://github.com/apache/echarts-handbook/blob/master/static/images/design/color/color04.png">
</img>
