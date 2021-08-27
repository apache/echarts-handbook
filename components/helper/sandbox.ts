import Vue from 'vue'
declare const echarts: any
export function createSandbox() {
  let appEnv: any = {}

  const animatorIdMap = {}
  let animatorId = 1
  // Using echarts timer so it can be paused.
  function chartSetTimeout(cb: () => void, time: number) {
    const animator = chartInstance
      .getZr()
      .animation.animate({ val: 0 } as any, {
        loop: false
      })
      .when(time, {
        val: 1
      })
      .during(() => {
        // Please don't fall sleep.
        // TODO Can be configurable.
        chartInstance.getZr().wakeUp()
      })
      .done(() => {
        // NOTE: Must delay the callback. Or zrender flush will invoke the chartSetTimeout callback again.
        // TODO: This is something needs to be fixed in zrender.
        Vue.nextTick(cb)
      })
      .start()

    return animator
  }

  function chartSetInterval(cb: () => void, time: number) {
    const animator = chartInstance
      .getZr()
      .animation.animate({ val: 0 } as any, {
        loop: true
      })
      .when(time, {
        val: 1
      })
      .during((target, percent) => {
        // Please don't fall sleep.
        // TODO Can be configurable.
        chartInstance.getZr().wakeUp()
        if (percent === 1) {
          // NOTE: Must delay the callback. Or zrender flush will invoke the chartSetTimeout callback again.
          // TODO: This is something needs to be fixed in zrender.
          Vue.nextTick(cb)
        }
      })
      .start()

    return animator
  }

  function setTimeout(func, delay) {
    const animator = chartSetTimeout(func, delay)
    animatorIdMap[animatorId] = animator
    return animatorId++
  }
  function setInterval(func, gap) {
    const animator = chartSetInterval(func, gap)
    animatorIdMap[animatorId] = animator
    return animatorId++
  }

  function clearTimer(id) {
    const animator = animatorIdMap[id]
    if (animator) {
      chartInstance.getZr().animation.removeAnimator(animator)
      delete animatorIdMap[id]
    }
  }

  function clearTimeout(id) {
    clearTimer(id)
  }
  function clearInterval(id) {
    clearTimer(id)
  }

  function _clearTimeTickers() {
    for (let key in animatorIdMap) {
      if (animatorIdMap.hasOwnProperty(key)) {
        clearTimer(key)
      }
    }
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

    pause() {
      if (chartInstance) {
        chartInstance.getZr().animation.pause()
      }
    },

    resume() {
      if (chartInstance) {
        chartInstance.getZr().animation.resume()
      }
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
        'clearTimeout',
        'clearInterval',
        'var option;\n' + compiledCode + '\nreturn option;'
      )
      const option = func(
        chartInstance,
        appEnv,
        setTimeout,
        setInterval,
        clearTimer,
        clearInterval
      )
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
