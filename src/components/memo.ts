import * as $ from 'jquery'
import EventHub from '@/utils/EventHub'
import '@/css/memo.styl'

interface Point {
  x: number
  y: number
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
  constructor(id: string, text: string, el: JQuery, { x, y }: Point) {
    this.id = id
    this.el = el
    this.text = text
    this.memo = this.template(text)
    this.move(x, y)
    this.el.append(this.memo)
    this.bindEvent()
    this.eventHub = new EventHub()
  }
  private template(text: string) {
    return $(`
      <div class="memo">
      <header><span class="close">x</span></header>
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
}
