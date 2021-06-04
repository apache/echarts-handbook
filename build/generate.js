const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const config = {
  cdnThirdParty: {
    jquery: 'https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js',
    bootstrapCSS:
      'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css',
    bootstrapJS:
      'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js'
  },
  cdnPayRootMap: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site'
}

let template = `<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
    <head {{ HEAD_ATTRS }}>
        <link rel="stylesheet" type="text/css" href="{{ bootstrapCSS }}">
        <link rel="stylesheet" type="text/css" href="{{ cdnPayRootMap }}/zh/css/main.css">
        {{ HEAD }}
    </head>
    <body {{ BODY_ATTRS }}>
        {{ APP }}
        <script src="{{ jquery }}"></script>
        <script src="{{ bootstrapJS }}"></script>
    </body>
</html>
`
template = template.replace(
  new RegExp('{{ bootstrapCSS }}', 'g'),
  config.cdnThirdParty.bootstrapCSS
)
template = template.replace(
  new RegExp('{{ jquery }}', 'g'),
  config.cdnThirdParty.jquery
)
template = template.replace(
  new RegExp('{{ bootstrapJS }}', 'g'),
  config.cdnThirdParty.bootstrapJS
)
template = template.replace(
  new RegExp('{{ cdnPayRootMap }}', 'g'),
  config.cdnPayRootMap
)

fs.writeFileSync('./app.html', template, 'utf-8')

async function updateNav() {
  for (let locale of ['zh', 'en']) {
    console.log('Fetching...', `http://echarts.apache.org//${locale}/nav.html`)
    const navContent = await fetch(
      `http://echarts.apache.org/${locale}/nav.html`
    ).then(response => response.text())

    fs.writeFileSync(
      path.join(__dirname, `../components/partials/Navbar/${locale}.vue`),
      `<template>
${navContent}
</template>`,
      'utf-8'
    )
  }
}

updateNav()
