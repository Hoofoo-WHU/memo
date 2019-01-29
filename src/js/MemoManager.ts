import Memo from '@/components/memo'
import toast from '@/components/toast';

export default class MemoManager {
  private top: number = -2147483648
  private el: JQuery
  private memos: Map<string, Memo> = new Map()
  constructor(el: JQuery) {
    this.el = el
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
        console.log(v.position)
      }
      let m = new Memo(v)
      this.bindEvent(m)
      this.memos.set(v.id, m)
    })
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
    memo.on('focus', (position: Memo.Point) => {
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
    memo.on('close', () => {
      if (confirm('便利贴删除后不可恢复，确认删除？')) {
        memo.close()
        toast.success('删除成功')
      }
    })
  }
}