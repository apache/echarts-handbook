const run = require('@jamesives/github-pages-deploy-action').default

run({
  branch: 'gh-pages',
  folder: 'dist',
  clean: true,
  singleCommit: true
})
