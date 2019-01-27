export default class {
  private events: Map<string, Set<Function>>
  constructor() {
    this.events = new Map()
  }
  on(name: string, callback: Function) {
    if (this.events.has(name)) {
      this.events.get(name)!.add(callback)
    } else {
      this.events.set(name, new Set([callback]))
    }
  }
  remove(name: string, callback: Function) {
    if (this.events.has(name) && this.events.get(name)!.has(callback)) {
      this.events.get(name)!.delete(callback)
      if (this.events.get(name)!.size === 0) {
        this.events.delete(name)
      }
      return true
    }
    return false
  }
  emit(name: string, payload?: any) {
    if (this.events.has(name)) {
      this.events.get(name)!.forEach(callback => {
        callback.call(this, payload)
      })
    }
  }
}