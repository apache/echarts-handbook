const run = require('@jamesives/github-pages-deploy-action').default
const path = require('path')

run({
  token: process.env['GITHUB_TOKEN'],
  branch: 'gh-pages',
  folder: 'dist',
  clean: true,
  singleCommit: true,
  workspace: path.join(__dirname, '../')
})
