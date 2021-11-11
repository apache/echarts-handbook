const { exec } = require('child_process')
const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const dir = './contents'

const entries = {}
const paths = []

const loopDir = path => {
  if (path.match(/\.DS_Store$/)) {
    return
  }
  if (fs.lstatSync(path).isDirectory()) {
    const children = fs.readdirSync(path)
    children.forEach(child => loopDir([path, child].join('/')))
  } else {
    paths.push(path)
  }
}

loopDir(dir)

function writeToFile() {
  const text =
    'export default ' + JSON.stringify(entries, null, '    ') + ';'
  fs.writeFileSync('components/helper/contributors.ts', text)
}

/**
 * Fetch contributors from local git log
 * 
 * Drawback: local git username may be not consistent with GitHub username
 */
function local() {
  for (let i = 0; i < paths.length; ++i) {
    const cmd = `git log --follow --pretty=format:"%an%x09" ${paths[i]} | sort | uniq`
    ;(i => {
      exec(cmd, (err, stdout) => {
        if (err) {
          console.error(err)
        } else {
          const key = paths[i].slice(2)
          entries[key] = stdout
            .trim()
            .split('\n')
            .map(name => name.trim())
        }
        if (i === paths.length - 1) {
          writeToFile()
        }
      })
    })(i)
  }
}

/**
 * Fetch contributors by GitHub rest API
 * 
 * Drawback: rate limit
 */
async function ghAPI() {
  const GH_REPO_URL = 'https://api.github.com/repos/apache/echarts-handbook/commits?path='
  const total = paths.length
  const tasks = new Array(total)
  for (let i = 0; i < total; ++i) {
    ((i) => {
      const path = paths[i].slice(2)
      tasks[i] = fetch(GH_REPO_URL + path)
        .then(response => response.json())
        .then(commits => {
          const contributors = {}
          commits.forEach(({ author: { login } }) => {
            contributors[login] = (contributors[login] || 0) + 1
          })
          entries[path] = Object.keys(contributors)
            .sort((a, b) => contributors[b] - contributors[a])
        })
        .catch(e => {
          console.error('failed to fetch contributors of path', path, e)
        })
    })(i)
  }
  await Promise.allSettled(tasks)
  writeToFile()
}

/**
 * Fetch contributors from GitHub website
 * 
 * Drawback: potential network/request error
 */
async function ghWeb() {
  const GH_REPO_URL = 'https://github.com/apache/echarts-handbook/contributors/master/'
  const total = paths.length
  const tasks = new Array(total)
  for (let i = 0; i < total; ++i) {
    ((i) => {
      const path = paths[i].slice(2)
      console.log('fetching contributors of path', path)
      tasks[i] = fetch(GH_REPO_URL + path)
        .then(response => response.text())
        .then(html => {
          const $ = cheerio.load(html)
          let contributors
          const avatars = $('a.avatar-link .avatar-user')
          if (avatars.length) {
            contributors = avatars.map((i, avatar) => $(avatar).attr('alt').slice(1)).toArray()
          } else {
            const avatar = $('a[rel=contributor] .avatar-user').attr('alt')
            contributors = avatar ? [avatar.slice(1)] : []
          }
          entries[path] = contributors
          console.log('fetched contributors of path', path, contributors)
        })
        .catch(e => {
          console.error('failed to fetch contributors of path', path, e)
        })
    })(i)
  }
  await Promise.allSettled(tasks)
  console.log(entries)
  writeToFile()
}

ghWeb()