import '@/css/style.styl'
import * as $ from 'jquery'
import toast from '@/components/toast'
import MemoManager from '@/js/MemoManager'
import ColorManager from '@/js/ColorManager'
import Memo from '@/components/memo'

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
let cm = new ColorManager($('#color'))
let mm = new MemoManager($('#memo'), cm)

mm.push([
  new Memo.Model('0', $('#memo'), '1'),
  new Memo.Model('1', $('#memo'), '2', { x: 50, y: 50 }, Memo.Color.green),
  new Memo.Model('1', $('#memo'), '3', { x: 100, y: 100 }, Memo.Color.green),
  new Memo.Model('1', $('#memo'), '4', { x: 150, y: 150 }, Memo.Color.green),
  new Memo.Model('1', $('#memo'), '5', { x: 200, y: 200 }, Memo.Color.green),
  new Memo.Model('1', $('#memo'), '6', { x: 250, y: 250 }, Memo.Color.green)
])

$('#new').on('click', () => {
  mm.new('2')
})