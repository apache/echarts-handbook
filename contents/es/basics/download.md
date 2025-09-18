# Obtener Apache Echarts

Apache Echarts ofrece una variedad de opciones de instalación, por lo que puedes elegir cualquiera de las opciones según tu proyecto

- Instalar desde NPM
- Usar desde CDN
- Descargar desde Github
- Personalización en línea

A continuación, veremos cada uno de estos métodos de instalación y la estructura de directorios después de la descarga.

## Instalación

### Instalar desde NPM

```sh
npm install echarts
```

Consultar [Import ECharts](${lang}/basics/import) para obtener mas detalles sobre su uso.

### Usar desde CDN

ECharts esta disponible en los siguientes CDNs gratuitos:

- [jsDelivr](https://www.jsdelivr.com/package/npm/echarts)
- [unpkg](https://unpkg.com/browse/echarts/)
- [cdnjs](https://cdnjs.com/libraries/echarts)

### Descargar desde Github

Puedes encontrar enlaces a cada versión en la pagina de  [releases](https://github.com/apache/echarts/releases) del proyecto [apache/echarts project](https://github.com/apache/echarts). Haz click en el codigo fuente bajo de "Assets" en la parte inferior de la versión deseada. Despues de descargar, descomprime el archivo y localiza el archivo  `echarts.js`en la carpeta `dist` para incluir la funcionalidad completa de Echarts.

### Personalización en la linea

Si deseas incluir solo algunos módulos para reducir el tamaño del paquete, puedes usar la función de  [ECharts online customization](${mainSitePath}builder.html) para crear una descarga personalizada de Echarts
