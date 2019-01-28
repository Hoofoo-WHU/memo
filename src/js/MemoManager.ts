import Memo from '@/components/memo'
import toast from '@/components/toast';

export default class MemoManager {
  private el: JQuery
  private memos: Map<string, Memo> = new Map()
  constructor(el: JQuery) {
    this.el = el
  }
  public push(memo: Memo.Model[] | Memo.Model) {
    if (Array.isArray(memo)) {
      memo.forEach(v => {
        let m = new Memo(v)
        this.bindEvent(m)
        this.memos.set(v.id, m)
      })
    } else {
      let m = new Memo(memo)
      this.bindEvent(m)
      this.memos.set(memo.id, m)
    }
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
    memo.on('close', () => {
      if (confirm('便利贴删除后不可恢复，确认删除？')) {
        memo.close()
        toast.success('删除成功')
      }
    })
  }
}