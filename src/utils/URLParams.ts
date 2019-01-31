export default class URLParams {
  constructor(location: Location) {
    if (location.search !== '') {
      location.search.slice(1).split('&').forEach(kv => {
        let kva = kv.split('=')
        this[kva[0]] = kva[1]
      })
    }
  }
}