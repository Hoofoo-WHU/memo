import '@/css/toast.styl'
import * as $ from 'jquery'

enum Type {
  success = 'success',
  warn = 'warn',
  error = 'error',
  info = 'info',
}

class Toast {
  private $template = (msg: string, type: Type) => {
    return $(`<div class="toast ${type || ''}">${msg}</div>`)
  }
  private $toast: JQuery
  private time?: number
  constructor(msg: string, time: number, type: Type) {
    this.$toast = this.$template(msg, type)
    this.time = time
    this.show()
  }
  private show() {
    this.$toast.appendTo('body').offset()
    this.$toast.addClass('active').one('transitionend', () => {
      setTimeout(() => {
        this.hide()
      }, this.time)
    })
  }
  private hide() {
    this.$toast.removeClass('active').one('transitionend', () => {
      this.$toast.remove()
    })
  }
}

function toast(msg: string, time: number = 1000) {
  new Toast(msg, time, Type.info)
}

namespace toast {
  export function success(msg: string, time: number = 1000) {
    new Toast(msg, time, Type.success)
  }
  export function error(msg: string, time: number = 1000) {
    new Toast(msg, time, Type.error)
  }
  export function warn(msg: string, time: number = 1000) {
    new Toast(msg, time, Type.warn)
  }
}

export default toast