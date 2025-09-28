const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

;(async () => {
  const localFilePath = path.resolve(__dirname, '../../echarts-www/_generated/en/committers.html')
  let html
  if (fs.existsSync(localFilePath)) {
    console.log('use local built committers page:', localFilePath)
    html = fs.readFileSync(localFilePath, { encoding: 'utf-8' })
  } else {
    const website = 'https://echarts.apache.org/en/committers.html'
    console.log('fetch committers page from website:', website)
    html = await (await fetch(website)).text()
  }
  const $ = cheerio.load(html)
  /** @type {{[key: string]: string}} */
  const githubIdAvatarMap = {}
  const githubIdReg = /(?:https?:\/\/github.com\/)?([\w-]+)/
  $('.about-person > a').each((idx, el) => {
    const link = el.attribs['data-github'] || el.attribs.href
    const githubId = link && link.match(githubIdReg)?.[1]
    if (!githubId && link) {
      console.error(`can't parse GitHub id from link: ${link}\n${$(el.parent).html()}`)
      return
    }
    const img = $(el).children('img')[0]?.attribs.src
    if (!img) {
      console.error(`can't parse avatar url from element:\n${$(el.parent).html()}`)
      return
    }
    console.log(`[${githubId}]`, img)
    githubIdAvatarMap[githubId] = img
  })

  const text = 'export default ' + JSON.stringify(githubIdAvatarMap, null, '    ') + ';'
  fs.writeFileSync('components/helper/contributor-avatar.ts', text)
})()