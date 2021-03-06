let tickArr = []
export const tick = function (fn) {
  tickArr.push(fn)
}

export const trick = () => {
  if (!Date.now)
    Date.now = function () {
      return new Date().getTime()
    }
  let vendors = ['webkit', 'moz', 'ms']
  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; i += 1) {
    let vp = vendors[i]
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vp + 'CancelAnimationFrame'] ||
      window[vp + 'CancelRequestAnimationFrame']
  }

  const execTick = () => {
    let i = 0
    let len = tickArr.length
    for (; i < len; i += 1) {
      tickArr[i]()
    }
    requestAnimationFrame(execTick)
  }
  execTick()
  window.tick = tick
}
