import Memo from '@/components/memo'
import toast from '@/components/toast'
import ColorManager from './ColorManager'

export default class MemoManager {
  private top: number = -2147483648
  private el: JQuery
  private memos: Map<string, Memo> = new Map()
  private colorManager?: ColorManager
  private curr: Memo
  constructor(el: JQuery, cm?: ColorManager) {
    this.el = el
    this.colorManager = cm
    if (this.colorManager) {
      this.colorManager.on('colorchange', (color: Memo.Color) => {
        this.curr.setColor(color)
      })
    }
  }
  public push(memo: Memo.Model[] | Memo.Model) {
    if (!Array.isArray(memo)) {
      memo = [memo]
    }
    memo.forEach(v => {
      if (v.position) {
        if (v.position.z) {
          if (v.position.z > this.top) {
            this.top = v.position.z
          }
        } else {
          v.position.z = ++this.top
        }
      } else {
        v.position = { x: 0, y: 0, z: ++this.top }
      }
      let m = new Memo(v)
      this.bindEvent(m)
      this.memos.set(v.id, m)
      m.focus()
    })
  }
  public new(id: string) {
    let memo = new Memo.Model(id, this.el, '', { x: 0, y: 0, z: ++this.top })
    this.push(memo)
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
  private bindEvent(memo: Memo) {
    memo.on('dragstart', (position: Memo.Point) => {
      if (this.top > (position.z || -Infinity)) {
        memo.setZ(++this.top)
      }
    })
    memo.on('focus', ({ position, color }: { position: Memo.Point, color: Memo.Color }) => {
      this.curr = memo
      if (this.colorManager) {
        this.colorManager.show()
        this.colorManager.active(color)
      }
      if (this.top > (position.z || -Infinity)) {
        memo.setZ(++this.top)
      }
    })
    memo.on('dragend', (position: Memo.Point) => {
      console.log(position)
    })
    memo.on('textchange', (text: string) => {
      console.log(text)
    })
    memo.on('blur', () => {
      if (this.colorManager)
        this.colorManager.hide()
    })
    memo.on('colorchange', (color: Memo.Color) => {
      if (this.colorManager) {
        this.colorManager.show()
        this.colorManager.active(color)
      }
    })
    memo.on('close', () => {
      if (confirm('便利贴删除后不可恢复，确认删除？')) {
        memo.close()
        this.colorManager && this.colorManager.hide()
        toast.success('删除成功')
      }
    })
  }
}