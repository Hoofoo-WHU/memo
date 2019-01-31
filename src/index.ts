import '@/css/style.styl'
import * as $ from 'jquery'
import MemoManager from '@/js/MemoManager'
import ColorManager from '@/js/ColorManager'

let cm = new ColorManager($('#color'))
let mm = new MemoManager($('#memo'), cm)

mm.push([
])

$('#new').on('click', () => {
  mm.new('2')
})

mm.on('textchange', (e: any) => {
  console.log(e)
})

mm.on('colorchange', (e: any) => {
  console.log(e)
})

mm.on('positionchange', (e: any) => {
  console.log(e)
})