# Ajuste Inteligente del Puntero

Algunos elementos interactivos pueden ser relativamente pequeños en los gráficos, por lo que a veces es difícil para los usuarios hacer clic y realizar otras operaciones con precisión, especialmente en dispositivos móviles. Por lo tanto, en Apache ECharts<sup>TM</sup> 5.4.0, se introdujo el concepto de "ajuste inteligente del puntero".

A partir de esta versión, ECharts habilita por defecto el ajuste del puntero para gráficos en dispositivos móviles y lo deshabilita para gráficos en dispositivos no móviles.


> Si es necesario habilitarlo para todas las plataformas, se puede lograr configurando  `opt.useCoarsePointer` a `true` en [init](${mainSitePath}api.html#echarts.init); configurarlo a  `false` o desactivará para todas las plataformas.

## Algoritmo de Ajuste

Cuando ocurre un evento de ratón o toque, ECharts determinará si está intersectando con un elemento interactivo en función de la posición del ratón o del toque. Si es así, el elemento será el objeto con el que se interactúa, lo que es la misma lógica que antes de esta optimización. Si no es así, se buscará un elemento que esté más cerca de la posición del ratón o toque dentro de un rango determinado.


> El rango predeterminado es de 44px (see [W3C standard](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)), los desarrolladores pueden configurar este valor a través de  `opt.pointerSize` cuando [init](${mainSitePath}api.html#echarts.init).

Más específicamente, ECharts recorrerá diferentes ángulos y diferentes radios (dentro de `opt.pointerSize`) alrededor de la posición del ratón o toque hasta encontrar un elemento que lo intercepte. Si se encuentra, el elemento se considera el objeto interactivo.

<img width="100%" height="100%" style="max-width: 441px"
src="images/how-to/coarse-pointer-en.gif">
</img>

Es decir, si un elemento se encuentra dentro del radio `opt.pointerSize` de la posición del ratón o toque, el elemento intersectado más cercano será considerado el objeto interactivo.

## Rendimiento

En cuanto a la implementación, primero se juzga la intersección entre la posición del ratón o toque y la caja delimitadora AABB de todos los elementos interactivos, para eliminar rápidamente la mayoría de los elementos que no están intersectando. Luego, se realiza un juicio de intersección más preciso en los elementos restantes. Por lo tanto, desde la perspectiva de la experiencia del usuario, casi no hay pérdida de rendimiento perceptible.


Para gráficos de series con grandes cantidades de datos (es decir, gráficos de barras, gráficos de dispersión, etc., con  `large: true` enabled), el ajuste no se habilitará.
