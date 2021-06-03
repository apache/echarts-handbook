declare const echarts: any
export function createSandbox() {
  let appEnv: any = {}

  let _intervalIdList: number[] = []
  let _timeoutIdList: number[] = []

  const _oldSetTimeout = window.setTimeout
  const _oldSetInterval = window.setInterval

  function setTimeout(func, delay) {
    var id = _oldSetTimeout(func, delay)
    _timeoutIdList.push(id)
    return id
  }
  function setInterval(func, gap) {
    var id = _oldSetInterval(func, gap)
    _intervalIdList.push(id)
    return id
  }
  function _clearTimeTickers() {
    for (var i = 0; i < _intervalIdList.length; i++) {
      clearInterval(_intervalIdList[i])
    }
    for (var i = 0; i < _timeoutIdList.length; i++) {
      clearTimeout(_timeoutIdList[i])
    }
    _intervalIdList = []
    _timeoutIdList = []
  }
  const _events: string[] = []
  function _wrapOnMethods(chart) {
    const oldOn = chart.on
    const oldSetOption = chart.setOption
    chart.on = function(eventName) {
      const res = oldOn.apply(chart, arguments)
      _events.push(eventName)
      return res
    }
    chart.setOption = function() {
      const res = oldSetOption.apply(this, arguments)
      return res
    }
  }

  function _clearChartEvents(chart) {
    _events.forEach(function(eventName) {
      if (chart) {
        chart.off(eventName)
      }
    })

    _events.length = 0
  }

  let chartInstance

  return {
    resize() {
      if (chartInstance) {
        chartInstance.resize()
      }
    },

    dispose() {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
    },

    getDataURL() {
      return chartInstance.getDataURL({
        pixelRatio: 2,
        excludeComponents: ['toolbox']
      })
    },

    getOption() {
      return chartInstance.getOption()
    },

    getInstance() {
      return chartInstance
    },

    run(
      el: HTMLElement,
      code: string,
      opts?: {
        darkMode?: boolean
        renderer?: 'svg' | 'canvas'
        useDirtyRect?: boolean
      }
    ) {
      opts = opts || {}
      if (!chartInstance) {
        chartInstance = echarts.init(el, opts.darkMode ? 'dark' : '', {
          renderer: opts.renderer,
          useDirtyRect: opts.useDirtyRect
        })
        _wrapOnMethods(chartInstance)
      }

      // if (this.hasEditorError()) {
      //     log(this.$t('editor.errorInEditor'), 'error');
      //     return;
      // }

      // TODO Scope the variables in component.
      _clearTimeTickers()
      _clearChartEvents(chartInstance)
      // Reset
      appEnv.config = null

      // run the code

      const compiledCode = code

      const func = new Function(
        'myChart',
        'app',
        'setTimeout',
        'setInterval',
        'ROOT_PATH',
        'var option;\n' + compiledCode + '\nreturn option;'
      )
      const option = func(chartInstance, appEnv, setTimeout, setInterval)
      let updateTime = 0

      if (option && typeof option === 'object') {
        const startTime = +new Date()
        chartInstance.setOption(option, true)
        const endTime = +new Date()
        updateTime = endTime - startTime
      }
    }
  }
}
