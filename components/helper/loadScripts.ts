const promisesCache = {}
interface ScriptObj {
  url: string
  type: 'css' | 'js'
}
export function loadScriptsAsync(scripts: (string | ScriptObj)[]) {
  return Promise.all(
    scripts
      .map(scriptUrl => {
        if (typeof scriptUrl === 'string') {
          return {
            url: scriptUrl,
            // TODO Not supported type
            type: scriptUrl.match(/\.css$/) ? 'css' : 'js'
          }
        }
        return scriptUrl
      })
      .map(function(scriptUrl) {
        if (promisesCache[scriptUrl.url]) {
          return promisesCache[scriptUrl.url]
        }

        const promise = new Promise((resolve, reject) => {
          if (scriptUrl.type === 'js') {
            const script = document.createElement('script')
            script.src = scriptUrl.url
            script.async = false
            script.onload = function() {
              resolve(null)
            }
            script.onerror = function() {
              reject()
            }
            document.body.appendChild(script)
          } else if (scriptUrl.type === 'css') {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = scriptUrl.url
            link.onload = function() {
              resolve(null)
            }
            link.onerror = function() {
              reject()
            }
            document.body.appendChild(link)
          }
        })
        promisesCache[scriptUrl.url] = promise
        return promise
      })
  )
}
