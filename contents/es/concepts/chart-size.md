# Contenedor del Gráfico y Tamaño

En la seccion [Get Started](${lang}/get-started),  introdujimos la API para inicializar el gráfico de ECharts  [`echarts.init`](${mainSitePath}/api.html#echarts.init). [API Document](${mainSitePath}/api.html#echarts.init)  ha explicado el significado específico de cada parámetro. Por favor, lea y entienda el documento antes de leer el siguiente contenido..

A continuación se presentan algunos casos de uso comunes, con un ejemplo de cómo inicializar un gráfico y cambiar el tamaño.

## Inicialización

### Definir un contenedor principal en HTML


Generalmente, necesitas definir un nodo `<div>` y usar CSS para cambiar el ancho y la altura. Al inicializar, se importa el gráfico en el nodo. Si no se declaran `opts.width` ni `opts.height`, el tamaño del gráfico será el tamaño del nodo por defecto.

```html
<div id="main" style="width: 600px;height:400px;"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
</script>
```

Es importante destacar que antes de llamar a `echarts.init`, debes asegurarte de que el contenedor ya tenga un ancho y una altura definidos..

### Especificar el tamaño del gráfico

Si el contenedor no tiene un ancho y alto definidos, o deseas que el tamaño del gráfico no sea igual al del contenedor, puedes inicializar el tamaño desde el principio.

```html
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'), null, {
    width: 600,
    height: 400
  });
</script>
```

## Reacción al tamaño del contenedor

### Escuchar el tamaño del contenedor para cambiar el tamaño del gráfico

En algunos casos, queremos cambiar el tamaño del gráfico en función de cómo cambie el tamaño del contenedor.

Por ejemplo, el contenedor tiene una altura de 400px y un ancho del 100% del ancho de la página. Si deseas cambiar el ancho de la página mientras mantienes el ancho del gráfico como el 100% de este, puedes usar el siguiente método.

Puedes escuchar el evento `resize` para detectar cuando el navegador cambia de tamaño. Luego, utiliza [`echartsInstance.resize`](${mainSitePath}api.html#echartsInstance.resize) para redimensionar el gráfico.

```html
<style>
  #main,
  html,
  body {
    width: 100%;
  }
  #main {
    height: 400px;
  }
</style>
<div id="main"></div>
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
  window.addEventListener('resize', function() {
    myChart.resize();
  });
</script>
```

> Consejos：A veces podemos ajustar el tamaño del contenedor mediante JS/CSS, pero esto no cambia el tamaño de la página, por lo que no se disparará el evento `resize`  En ese caso, puedes intentar usar la API  [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) para cubrir este escenario.

### Establecer un tamaño específico para el gráfico

Aparte de llamar a `resize()` sin parámetros, puedes establecer explícitamente el ancho y la altura para tener un tamaño de gráfico diferente al tamaño del contenedor.

```js
myChart.resize({
  width: 800,
  height: 400
});
```

> Consejos: Presta atención a cómo está definida la API al leer la documentación. La API `resize()` a veces se confunde con la forma `myCharts.resize(800, 400)` la cual no existe.

### Eliminar y reconstruir el nodo del contenedor

Supongamos que existen varias páginas de marcadores y cada página contiene algunos gráficos. En este caso, el contenido de otras páginas se eliminará del DOM cuando se seleccione una página. El usuario no podrá ver el gráfico después de reabrir esas páginas.

Esto se debe a que el nodo del contenedor del gráfico ha sido eliminado. Aunque el nodo se añada nuevamente después, el nodo en el que estaba el gráfico ya no existe.

La forma correcta es llamar a [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) para eliminar la instancia después de que se haya eliminado el contenedor, y luego llamar a [echarts.init](${mainSitePath}/api.html#echarts.init) para inicializar el gráfico nuevamente después de que el contenedor haya sido añadido otra vez.

> Consejos: Llama a [`echartsInstance.dispose`](${mainSitePath}api.html#echartsInstance.dispose) para liberar los recursos al eliminar el nodo y evitar posibles fugas de memoria.
