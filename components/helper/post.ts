import config from '~/configs/config'

export function getSourcePath(mdPath: string, hash?: string) {
  if (!mdPath.endsWith('.md')) {
    mdPath = mdPath + '.md'
  }
  if (hash) {
    mdPath += `#${decodeURIComponent(hash)}`
  }
  return `https://github.com/${config.gitRepo}/tree/master/contents/${mdPath}`
}
