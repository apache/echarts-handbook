# Directrices para la Edicion de Documentos

## Agregar un Archivo Markdown

Agregar un archivo markdown en los directorios `contents/zh/` (Chinese posts) o `contents/en/` (English posts) hasta tres niveles. Actualiza la informacion de la ruta y el titulo en  `contents/zh/posts.yml` o`contents/en/posts.yml`.

Los nombres de los archivos markdown deben estar en minusculas.

## Usar Prettier para Formate el Codigo Automaticamente

Antes de comenzar, te recomendamos instalar [prettier VSCode plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), que formateara automaticamente el codigo cuando lo guardes.

Si sientes que el formato automatico esta alterando tut bloque de codigo, puedes agregar el siguiente comentario para evitar que  prettier formatee el codigo dentro del bloque:

```markdown
<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

Si encuentras bloques de codigo que no estan formateados, primero revisa si hay errores de sintaxis en el codigo.

## Variables Incorpordas

- `optionPath`
- `mainSitePath`
- `exampleViewPath`
- `exampleEditorPath`
- `lang`

Uso:

```
${xxxxx}
```

## Enlace a Otros Articulos

```markdown
[Get Apache ECharts](${lang}/basics/download)
```

[Get Apache ECharts](${lang}/basics/download)

## Incluir Codigo

### Uso Basico

<!-- prettier-ignore-start -->

```markdown
```js
option = {
    series: [{
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
    }]
};
\```
```

<!-- prettier-ignore-end -->

```js
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### Forma Recomendada de Escribir el Codigo

Para permitir que la herramienta nos ayude a formatear el codigo, debemos tratar evitar estilos de escritura sintaticamente problematicos.

Por ejemplo, el comentario `...`

```js
option = {
  series: [
    {
      type: 'bar'
      // ...
    }
  ]
};
```

### Previa y Edicion en Vivo

> Actualmente solo se soporta la vista previa del codigo de Option

<!-- prettier-ignore-start -->
```markdown
\```js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
\```
```

<!-- prettier-ignore-end -->

```js live
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### Mas Disposicion de la Vista Previa

#### De Izquierda a Derecha

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'lr'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

```js live {layout: 'lr'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

#### De Derecha a Izquierda

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'rl'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

```js live {layout: 'rl'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

#### De Abajo a  Arriba

<!-- prettier-ignore-start -->

```markdown
```js live {layout: 'bt'}
option = {
  ...
};
\```
```

<!-- prettier-ignore-end -->

```js live {layout: 'bt'}
option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

### Resaltar Lineas de Codigo y Agregar Nombre de Archivos

Usa.

<!-- prettier-ignore-start -->

```markdown
```js{1,3-5}[option.js]
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
\```
```

<!-- prettier-ignore-end -->

Effects.

```js{1,3-5}[option.js]
option = {
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
```

## Incrustar Imagenes

Las imagenes  fuente se almacenan bajo `static/images/`.

```markdown
![image description](images/demo.png)
```

### Establecer la Altura y Ancho de la Imagen

Para el estilo temporal de la pagina actual, puedes escribir directamente en  HTML.

```markdown
<img data-src="images/demo.png" style="width: 50px" />
```

## Añadir un ejemplo de Iframe

`src` es la cadena que sigue a `?c=` en la direccion https://echarts.apache.org/examples/en/editor.html?c=line-simple address

Uso:

```markdown
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>
```

Resultado:
<md-example src="doc-example/getting-started" width="100%" height="300"></md-example>

## Añadir un Enlace a un elemento de Opcion

Uso:

```markdown
<md-option link="series-bar.itemStyle.color"></md-option>
```

Resultado:
<md-option link="series-bar.itemStyle.color"></md-option>

## Uso de mas componentes

La documentacion admite el uso de componentes `markdown` registrados globalmente.Ademas del componente `md-example` que se describio anteriormente, los siguientes componentenes tambien estan disponibles.

### md-alert

Componentes de Alerta

```markdown
<md-alert type="info">
Esta es una alerta de Informacion.
</md-alert>
```

<md-alert type="info">
Esta es una alerta de Informacion.
</md-alert>

```markdown
<md-alert type="success">
Esta es una alerta de exito.
</md-alert>
```

<md-alert type="success">
Esta es una alerta de Informacion.
</md-alert>

```markdown
<md-alert type="warning">
Esta es una alerta de Advertencia.
</md-alert>
```

<md-alert type="warning">
Esta es una alerta de Advertencia.
</md-alert>

```markdown
<md-alert type="danger">
Esta es una alerta de peligro.
</md-alert>
```

<md-alert type="danger">
Esta es una alerta de peligro.
</md-alert>
