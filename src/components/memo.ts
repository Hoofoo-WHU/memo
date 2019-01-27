import * as $ from 'jquery'
import '@/css/memo.styl'
interface Point {
  x: number
  y: number
}
class Memo {
  private text: string
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
  constructor(el: JQuery, { x, y }: Point) {
    this.el = el
    this.memo = this.template('')
    this.move(x, y)
    this.el.append(this.memo)
    this.bindEvent()
  }
  private template(text: string) {
    return $(`
      <div class="memo">
      <header></header>
      <textarea>${text}</textarea>
      </div>
    `)
  }
  private onDragend() {
    this.drag.draging = false
    this.memo.removeClass('draging')
  }
  private onDragstart(e: JQuery.MouseEventBase) {
    this.drag.draging = true
    this.memo.addClass('draging')
    this.drag.offset.x = e.pageX - this.position.x
    this.drag.offset.y = e.pageY - this.position.y
  }
  private onDrag(e: JQuery.MouseEventBase) {
    if (this.drag.draging) {
      this.move(e.pageX - this.drag.offset.x, e.pageY - this.drag.offset.y)
    }
  }
  private bindEvent() {
    this.memo.on('mousedown', 'header', this.onDragstart.bind(this))
    this.memo.on('mouseup', 'header', this.onDragend.bind(this))
    $(document).on('mousemove', this.onDrag.bind(this))
  }
  public move(x: number, y: number) {
    this.position.x = x
    this.position.y = y
    this.memo.css('transform', `translate3d(${x}px,${y}px,0)`)
  }
}

window['memo'] = new Memo($('body'), { x: 0, y: 0 })
window['memo2'] = new Memo($('body'), { x: 100, y: 200 })