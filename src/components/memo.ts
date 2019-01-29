import * as $ from 'jquery'
import EventHub from '@/utils/EventHub'
import '@/css/memo.styl'


class Memo {
  private text: string
  private id: string
  private eventHub: EventHub
  private position: Memo.Point = {
    x: 0,
    y: 0,
    z: 0
  }
  private el: JQuery
  private memo: JQuery
  private drag = {
    draging: false,
    offset: {
      x: 0,
      y: 0
    }
  }
  private color: Memo.Color
  constructor({ id, text = '', el, position = { x: 0, y: 0, z: 0 }, color = Memo.Color.yellow }: IModel) {
    this.eventHub = new EventHub()
    this.memo = this.template(text)
    this.id = id
    this.el = el
    this.color = color
    this.setColor(color)
    this.text = text
    this.move(position.x, position.y)
    this.setZ(position.z || 0)
    this.bindEvent()
    this.el.append(this.memo)
  }
  private template(text: string) {
    return $(`
      <div class="memo">
      <header><span class="close"><i class="iconfont icon-close"></i></span></header>
      <main contentEditable>${text}</main>
      </div>
    `)
  }
  private onDragend(e: JQuery.MouseEventBase) {
    e.preventDefault()
    this.drag.draging = false
    this.memo.removeClass('draging')
    this.eventHub.emit('dragend', this.position)
  }
  private onDragstart(e: JQuery.MouseEventBase) {
    e.preventDefault()
    this.eventHub.emit('dragstart', this.position)
    this.drag.draging = true
    this.memo.addClass('draging')
    this.drag.offset.x = e.pageX - this.position.x
    this.drag.offset.y = e.pageY - this.position.y
  }
  private onDrag(e: JQuery.MouseEventBase) {
    e.preventDefault()
    if (this.drag.draging) {
      this.move(e.pageX - this.drag.offset.x, e.pageY - this.drag.offset.y)
    }
  }
  private bindEvent() {
    this.memo.on('mousedown', 'header', this.onDragstart.bind(this))
    this.memo.on('mouseup', 'header', this.onDragend.bind(this))
    $(document).on('mousemove', this.onDrag.bind(this))
    this.memo.on('blur', 'main', (e) => {
      this.eventHub.emit('blur', this.text)
      let text = this.memo.find('main').html()
      if (this.text !== text) {
        this.text = text
        this.eventHub.emit('textchange', this.text)
      }
    })
    this.memo.on('focus', 'main', (e) => {
      this.eventHub.emit('focus', { position: this.position, color: this.color })
    })
    this.memo.on('click', '.close', () => {
      this.eventHub.emit('close')
    })
    this.memo.on('mousedown', '.close', false)
  }
  public close() {
    this.memo.remove()
  }
  public move(x: number, y: number) {
    this.position.x = x
    this.position.y = y
    this.memo.css({ left: x + 'px', top: y + 'px' })
  }
  public on(event: string, callback: Function) {
    this.eventHub.on(event, callback)
  }
  public setColor(color: Memo.Color) {
    this.memo.removeClass(this.color)
    this.color = color
    this.memo.addClass(color)
    this.eventHub.emit('colorchange', this.color)
  }
  public setZ(z: number) {
    this.position.z = z
    this.memo.css('z-index', z)
  }
  public focus() {
    this.memo.find('main').focus()
  }
}
export interface IModel {
  id: string
  position?: Memo.Point
  color?: Memo.Color
  el: JQuery
  text?: string
}
namespace Memo {
  export class Model implements IModel {
    id: string
    position?: Point
    color?: Color
    el: JQuery
    text?: string
    constructor(id: string, el: JQuery, text?: string, position?: Point, color?: Color) {
      this.id = id
      this.position = position
      this.color = color
      this.el = el
      this.text = text
    }
  }
  export enum Color {
    yellow = 'yellow',
    purple = 'purple',
    pink = 'pink',
    grey = 'grey',
    green = 'green',
    blue = 'blue'
  }
  export interface Point {
    x: number
    y: number
    z?: number
  }
}

export default Memo