const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

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
