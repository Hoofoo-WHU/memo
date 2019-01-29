import * as $ from 'jquery'
import '@/css/colors.styl'
import EventHub from '@/utils/EventHub'
export default class ColorManager {
  private eventHub = new EventHub()
  private template = $(`
  <ul class="colors" style="display: none">
    <li data-name="yellow" class="color yellow"></li>
    <li data-name="blue" class="color blue"></li>
    <li data-name="green" class="color green"></li>
    <li data-name="pink" class="color pink"></li>
    <li data-name="purple" class="color purple"></li>
    <li data-name="grey" class="color grey"></li>
  </ul>`)
  constructor(el: JQuery) {
    this.bindEvent()
    el.append(this.template)
  }
  public active(color: string) {
    this.template.find('.color').removeClass('active')
    this.template.find(`.${color}`).addClass('active')
  }
  private bindEvent() {
    this.template.on('mousedown', '.color', false)
    this.template.on('click', '.color', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.eventHub.emit('colorchange', $(e.currentTarget).attr('data-name'))
    })
  }
  public on(e: string, cb: Function) {
    this.eventHub.on(e, cb)
  }
  public hide() {
    this.template.hide()
  }
  public show() {
    this.template.show()
  }
}