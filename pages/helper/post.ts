import config from '../../configs/config'
import contributors from './contributors'

export async function getPostData(path: string, lang: string) {
  const filePath = path.split('_').join('/')
  return {
    contributors: contributors[`contents/${lang}/${filePath}.md`] || [],
    sourcePath: `https://github.com/${config.gitRepo}/tree/master/contents/${lang}/${filePath}.md`
  }
}
