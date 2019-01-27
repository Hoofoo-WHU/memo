import * as $ from 'jquery'
import EventHub from '@/utils/EventHub'
import '@/css/memo.styl'

interface Point {
  x: number
  y: number
}
export enum MemoColor {
  yellow = 'yellow',
  purple = 'purple',
  pink = 'pink',
  grey = 'grey',
  green = 'green',
  blue = 'blue'
}
export default class Memo {
  private text: string
  private id: string
  private eventHub: EventHub
  private position: Point = {
    x: 0,
    y: 0
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
  private color: MemoColor
  constructor(id: string, text: string, el: JQuery, { x, y }: Point = { x: 0, y: 0 }, color: MemoColor = MemoColor.yellow) {
    this.eventHub = new EventHub()
    this.memo = this.template(text)
    this.id = id
    this.el = el
    this.color = color
    this.setColor(color)
    this.text = text
    this.move(x, y)
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
      let text = this.memo.find('main').html()
      if (this.text !== text) {
        this.text = text
        this.eventHub.emit('textchange', this.text)
      }
    })
    this.memo.on('click', '.close', () => {
      this.eventHub.emit('close', this.close.bind(this))
    })
  }
  private close() {
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
  public setColor(color: MemoColor) {
    this.memo.removeClass(this.color)
    this.color = color
    this.memo.addClass(color)
    this.eventHub.emit('colorchange')
  }
}
