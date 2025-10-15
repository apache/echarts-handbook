# Empezando

## Obtener Apache Echarts

Apache Echarts soporta varios metodos de descarga, los cuales se explican
con mas detalles en el siguiente tutorial [Installation](${lang}/basics/download).
Aqui, tomamos  el ejemplo de obtenerlo desde el CDN desde [jsDelivr](https://www.jsdelivr.com/package/npm/echarts)
y explicamos como instalarlo rapidamente.

En [https://www.jsdelivr.com/package/npm/echarts](https://www.jsdelivr.com/package/npm/echarts) selecciona `dist/echarts.js`, haz click y guarda el archivo como `echarts.js` file.

> Mas Informacion sobre estos archivos se puede encontrar en el siguiente tutorial [Installation](${lang}/basics/download).

## Incluir Echarts

Crea un nuevo archivo `index.html` en el directorio donde guardaste el archivo `echarts.js`, con el siguiente contenido:

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

Cuando abras este `index.html`, veras una pagina vacia. pero no te preocupes. Abre la consoloa y asegurate de que no se reporte ningun, mensaje de error, luego puedes proceder al siguiente paso.

## Dibuja un grafico Simple

Antes de Dibujar, necesitamos preparar un contenedor DOM para Echarts con una altura y un ancho definidos. Agregar el siguiente codigo despues de la etiqueta </head> que introdujiste anteriormente.

```html
<body>
  <!-- Prepare a DOM with a defined width and height for ECharts -->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

Luego, puedes inicializar una instancia de Echarts con el metodo [echarts.init](${mainSitePath}api.html#echarts.init) y establecer  la instancia de Echarts con el Metodo [setOption](${mainSitePath}api.html#echartsInstance.setOption) para generar un grafico de barras simple. Aqui tienes el codigo completo.

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

Y ahi esta tu primer grafico con  Apache ECharts!

<md-example src="doc-example/getting-started&reset=1&edit=1"></md-example>
