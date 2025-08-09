# Gráfico de Pastel Básico

Los gráficos de pastel se utilizan principalmente para mostrar la proporción de varias categorías en comparación con el total. Los radianes representan la proporción de cada categoría.

## Ejemplo Simple

La configuración del gráfico de pastel no es completamente la misma que la de los gráficos de líneas y de barras. No es necesario configurar el eje. El nombre y el valor de los datos deben definirse en la serie. Comencemos con un gráfico de pastel básico:

```js live
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'Direct Visit'
        },
        {
          value: 234,
          name: 'Union Ad'
        },
        {
          value: 1548,
          name: 'Search Engine'
        }
      ]
    }
  ]
};
```

Cabe mencionar que el `value` aquí no necesita ser un dato en porcentaje. ECharts distribuirá proporcionalmente sus radianes correspondientes en el gráfico de pastel según todos los datos.

## Gráfico de Pastel Personalizado

### Radio del Gráfico de Pastel

El radio del gráfico de pastel puede definirse mediante [`series.radius`](${optionPath}series-pie.radius). Se pueden usar tanto cadenas de porcentaje(`'60%'`) como cadenas de píxeles absolutos (`'200'`).Cuando se usa una cadena de porcentaje, está relacionada proporcionalmente con el borde más corto del contenedor(`'div'`).

```js live
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'Direct Visit'
        },
        {
          value: 234,
          name: 'Union Ad'
        },
        {
          value: 1548,
          name: 'Search Engine'
        }
      ],
      radius: '50%'
    }
  ]
};
```

## Ocultar el Gráfico Cuando la Suma de Datos es 0

Por defecto, si la suma de los datos es 0, la serie dividirá la forma de manera equitativa. Por ejemplo, si no deseas mostrar ninguna forma cuando todas las 4 series tengan un valor igual a 0, puedes definir [`series.stillShowZeroSum`](${optionPath}series-pie.stillShowZeroSum) como `false`.

```js live
option = {
  series: [
    {
      type: 'pie',
      stillShowZeroSum: false,
      data: [
        {
          value: 0,
          name: 'Direct Visit'
        },
        {
          value: 0,
          name: 'Union Ad'
        },
        {
          value: 0,
          name: 'Search Engine'
        }
      ]
    }
  ]
};
```

Si también deseas ocultar la etiqueta, define [`series.label.show`](${optionPath}series-pie.label.show) como  `false`.

```js live
option = {
    series: [{
        type: 'pie',
        stillShowZeroSum: false,
        label: {
            show: false
        }
        data: [{
            value: 0,
            name: 'Direct Visit'
        }, {
            value: 0,
            name: 'Union Ad'
        }, {
            value: 0,
            name: 'Search Engine'
        }]
    }]
};
```
