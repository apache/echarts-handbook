# Gráfico de Rosa (Gráfico de Nightingale)

El Gráfico de Rosa, que también se conoce como gráfico de Nightingale, generalmente indica categorías por sectores del mismo radio pero con radios diferentes.

ECharts puede implementar el Gráfico de Rosa definiendo [`series.roseType`](${optionPath}series-pie.roseType) del gráfico de pastel como `'area'`.Todas las demás configuraciones son las mismas que para un gráfico de pastel básico.

```js live
option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 100,
          name: 'A'
        },
        {
          value: 200,
          name: 'B'
        },
        {
          value: 300,
          name: 'C'
        },
        {
          value: 400,
          name: 'D'
        },
        {
          value: 500,
          name: 'E'
        }
      ],
      roseType: 'area'
    }
  ]
};
```
