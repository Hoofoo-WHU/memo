import $ = require('jquery')
import EventHub from '@/utils/EventHub';

import '@/css/user.styl'

export default class {
  private eventHub = new EventHub
  private el: JQuery
  private avatar: string
  constructor(el: JQuery, avatar: string, name: string) {
    this.el = el
    this.avatar = avatar
    this.el.append($(`<img src="${this.avatar}">`))
    this.el.append($(`<span class="name">${name}</span>`))
  }
  public on(e: string, cb: Function) {
    this.eventHub.on(e, cb)
  }
}