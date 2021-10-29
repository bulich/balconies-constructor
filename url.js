export default {
  params() {
    return Object.fromEntries(new URL(window.location).searchParams.entries())
  },
  getParam(param) {
    return this.params()[param]
  },
  setParam(param, value) {
    const url = new URL(window.location.href)
    url.searchParams.set(param, value)
    window.history.replaceState(null, null, url)
  },
  getElements() {
    const elements = {}
    const params = this.params()
    for (const key in params) {
      if (key.slice(0, 2) == "el") {
        const [,id] = key.split('_')
        const [groupId, colorId] = params[key].split("_")
        elements[id] = { groupId, colorId }
      }
    }
    return elements
  }
}