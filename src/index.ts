import '@/css/style.styl'
import * as $ from 'jquery'
import toast from '@/components/toast'
import MemoManager from '@/js/MemoManager';
import Memo from '@/components/memo';

toast('这是一条消息')
setTimeout(() => {
  toast.error('失败了')
  setTimeout(() => {
    toast.success('成功了')
    setTimeout(() => {
      toast.warn('警告警告')
    }, 500)
  }, 500)
}, 500)

let mm = new MemoManager($('#memo'))

mm.push([
  new Memo.Model('0', $('#memo'), '123'),
  new Memo.Model('1', $('#memo'), '456', { x: 200, y: 200 }, Memo.Color.green)
])
// let memos: Memo[] = []
// // memos[0] = new Memo('123', '', $('#memo'), { x: 0, y: 0, z: 1 })
// memos[0].on('textchange', function (text: string) {
//   console.log(text)
// })
// memos[0].on('dragend', function (position: { x: number, y: number }) {
//   console.log(position)
// })
// memos[0].on('close', function (cb: Function) {
//   cb()
//   delete memos[0]
//   toast.success('删除成功')
// })
// window['color'] = memos[0].setColor.bind(memos[0])