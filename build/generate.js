const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const websitePath = path.resolve(__dirname, '../../echarts-website')

async function updateNav() {
  for (let locale of ['zh', 'en']) {
    const localPath = `${websitePath}/${locale}/nav.html`
    const targetPath = path.join(
      __dirname,
      `../components/partials/Navbar/${locale}.vue`
    )
    console.log('Fetching...', localPath)
    let navContent = ''
    try {
      navContent = fs.readFileSync(`${websitePath}/${locale}/nav.html`)
    } catch (e) {
      console.log(
        'Local file not found. Fetching...',
        `https://echarts.apache.org/${locale}/nav.html`
      )
      navContent = await fetch(
        `https://echarts.apache.org/${locale}/nav.html`
      ).then(response => response.text())
    }

    fs.writeFileSync(
      targetPath,
      `<template>
${navContent}
</template>`
    )
  }
}

updateNav()
