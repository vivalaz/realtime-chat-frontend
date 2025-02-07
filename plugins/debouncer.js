export default function debouncer (func, wait, immediate) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait)

    if (immediate && !timeout) {
      func.apply(context, args)
    }
  }
}
