const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

;(async () => {
  const html = await (await fetch('https://echarts.apache.org/en/committers.html')).text()
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