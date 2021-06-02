const fetch = require('node-fetch')

module.exports = function() {
  return async (tree, { data }) => {
    if (data.fetchContributors) {
      const contributors = await fetch(
        'https://api.github.com/repos/nuxt/content/contributors'
      )
        .then(res => res.json())
        .then(res => res.map(({ login }) => login))

      data.$contributors = [...new Set(contributors)]
    }
    return tree
  }
}
