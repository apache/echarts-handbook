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
    try {
      fs.copyFileSync(`${websitePath}/${locale}/nav.html`, targetPath)
    } catch (e) {
      console.log(
        'Local file not found. Fetching...',
        `http://echarts.apache.org/${locale}/nav.html`
      )
      const navContent = await fetch(
        `http://echarts.apache.org/${locale}/nav.html`
      ).then(response => response.text())
      fs.writeFileSync(
        localPath,
        `<template>
  ${navContent}
  </template>`,
        'utf-8'
      )
    }
  }
}

updateNav()
