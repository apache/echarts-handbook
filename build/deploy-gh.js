const run = require('@jamesives/github-pages-deploy-action').default
const path = require('path')

run({
  branch: 'gh-pages',
  folder: 'dist',
  clean: true,
  singleCommit: true,
  workspace: path.join(__dirname, '../')
})
