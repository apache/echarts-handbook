import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import config from '../../configs/config'
import contributors from './contributors'

export async function getPostData(path: string, lang: string) {
  const filePath = path.split('_').join('/')
  const fileContent = await import(`~/contents/${lang}/${filePath}.md`)
  let content = fileContent.default

  const url = `${config.rootPath}/${lang}/${path}`

  const md = new MarkdownIt({
    html: true
  })
    .use(highlightjs, {})
    .use(anchor, {
      permalink: false,
      permalinkAfter: true,
      permalinkSymbol: '#',
      permalinkClass: 'permalink'
    })
    .use(toc, {
      containerId: 'toc',
      level: 2,
      hash: slug => {
        const hash = slug.split('#')
        if (hash.length > 0) {
          // Replace all spaces with '-' and encodeURI
          return encodeURI(
            hash[0]
              .trim()
              .toLowerCase()
              .replace(new RegExp(' ', 'g'), '-')
          )
        } else {
          return url
        }
      }
    })

  for (const attr in config) {
    content = content.split(`\${${attr}}`).join((config as any)[attr])
  }

  const res = fm(content)
  return {
    attributes: res.attributes,
    content: md.render('[[toc]]\n' + res.body),
    contributors: contributors[`contents/${lang}/${filePath}.md`] || [],
    sourcePath: `https://github.com/${config.gitRepo}/tree/master/contents/${lang}/${filePath}.md`
  }
}
