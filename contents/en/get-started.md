# Get Started

## Getting Apache ECharts

Apache ECharts supports several download methods, which are further explained in the next tutorial [Installation](${lang}/basics/download). Here, we take the example of getting it from the [jsDelivr](https://www.jsdelivr.com/package/npm/echarts) CDN and explain how to install it quickly.

At [https://www.jsdelivr.com/package/npm/echarts](https://www.jsdelivr.com/package/npm/echarts) select `dist/echarts.js`, click and save it as `echarts.js` file.

> More information about these files can be found in the next tutorial [Installation](${lang}/basics/download).

## Including ECharts

Create a new `index.html` file in the directory where you just saved `echarts.js`, with the following content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Include the ECharts file you just downloaded -->
    <script src="echarts.js"></script>
  </head>
</html>
```

When you open this `index.html`, you will see an empty page. But don't worry. Open the console and make sure that no error message is reported, then you can proceed to the next step.

## Plotting a Simple Chart

Before drawing we need to prepare a DOM container for ECharts with a defined height and width. Add the following code after the `</head>` tag introduced earlier.

```html
<body>
  <!-- Prepare a DOM with a defined width and height for ECharts -->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

Then you can initialize an echarts instance with the [echarts.init](${mainSitePath}api.html#echarts.init) method and set the echarts instance with [setOption](${mainSitePath}api.html#echartsInstance.setOption) method to generate a simple bar chart. Here is the complete code.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts</title>
    <!-- Include the ECharts file you just downloaded -->
    <script src="echarts.js"></script>
  </head>
  <body>
    <!-- Prepare a DOM with a defined width and height for ECharts -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
      // Initialize the echarts instance based on the prepared dom
      var myChart = echarts.init(document.getElementById('main'));

      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        legend: {
          data: ['sales']
        },
        xAxis: {
          data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);
    </script>
  </body>
</html>
```

And this is your first chart with Apache ECharts!

<md-example src="doc-example/getting-started&reset=1&edit=1"></md-example>
