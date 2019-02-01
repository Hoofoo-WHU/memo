import Memo from '@/components/memo'
import toast from '@/components/toast'
import ColorManager from './ColorManager'
import EventHub from '@/utils/EventHub'


class MemoManager {
  private top: number = -2147483648
  private el: JQuery
  private memos: Map<string, Memo> = new Map()
  private colorManager?: ColorManager
  private curr: Memo
  private eventHub = new EventHub()
  constructor(el: JQuery, cm?: ColorManager) {
    this.el = el
    this.colorManager = cm
    if (this.colorManager) {
      this.colorManager.on('colorchange', (color: Memo.Color) => {
        this.curr.setColor(color)
      })
    }
  }
  public push(memo: MemoManager.Model[] | MemoManager.Model, focus: boolean = false) {
    if (!Array.isArray(memo)) {
      memo = [memo]
    }
    memo.forEach(v => {
      v.el = this.el
      if (v.position) {
        if (v.position.z) {
          if (v.position.z > this.top) {
            this.top = v.position.z
          }
        } else {
          v.position.z = ++this.top
          this.eventHub.emit('positionchange', { id: v.id, position: v.position })
        }
      } else {
        v.position = { x: 0, y: 0, z: ++this.top }
        this.eventHub.emit('positionchange', { id: v.id, position: v.position })
      }
      let m = new Memo(v)
      this.bindEvent(m)
      this.memos.set(v.id, m)
      if (focus) {
        m.focus()
      }
    })
  }
  public new(id: string) {
    let memo = new Memo.Model(id, this.el, '', { x: 20, y: 20, z: ++this.top })
    this.eventHub.emit('positionchange', { id: memo.id, position: memo.position })
    this.push(memo, true)
  }
  public remove(id: string | string[]) {
    if (Array.isArray(id)) {
      id.forEach(val => {
        this.memos.has(val) && this.memos.get(val)!.close()
      })
    } else {
      this.memos.has(id) && this.memos.get(id)!.close()
    }
  }
  public on(e: string, callback: Function) {
    this.eventHub.on(e, callback)
  }
  private bindEvent(memo: Memo) {
    memo.on('dragstart', (position: Memo.Point) => {
      if (this.top > (position.z || -Infinity)) {
        memo.setZ(++this.top)
      }
    })
    memo.on('focus', ({ position, color }: { position: Memo.Point, color: Memo.Color }) => {
      this.curr = memo
      if (this.colorManager) {
        this.colorManager.enable()
        this.colorManager.active(color)
      }
      if (this.top > (position.z || -Infinity)) {
        memo.setZ(++this.top)
        this.eventHub.emit('positionchange', { id: memo.getId(), position: position })
      }
    })
    memo.on('dragend', (position: Memo.Point) => {
      this.eventHub.emit('positionchange', { id: memo.getId(), position })
    })
    memo.on('textchange', (text: string) => {
      this.eventHub.emit('textchange', { id: memo.getId(), text })
    })
    memo.on('blur', () => {
      if (this.colorManager)
        this.colorManager.disable()
    })
    memo.on('colorchange', (color: Memo.Color) => {
      if (this.colorManager) {
        this.colorManager.enable()
        this.colorManager.active(color)
      }
      this.eventHub.emit('colorchange', { id: memo.getId(), color })
    })
    memo.on('close', () => {
      if (confirm('便利贴删除后不可恢复，确认删除？')) {
        this.eventHub.emit('remove', {
          id: memo.getId(), close: (success?: boolean) => {
            if (success) {
              memo.close()
              this.colorManager && this.colorManager.disable()
              toast.success('删除成功')
            } else {
              toast.error('删除失败')
            }
          }
        })
      }
    })
  }
}
namespace MemoManager {
  export class Model {
    id: string
    position?: Memo.Point
    color?: Memo.Color
    text?: string
    el: JQuery
    constructor(id: string, text: string = '', position?: Memo.Point, color?: Memo.Color) {
      this.id = id
      this.text = text
      this.color = color
      this.position = position
    }
  }
}
export default MemoManager