# MemoManager
## 引入
```ts
import MemoManager from '@/js/MemoManager'
```
## 实例
```ts
let mm = new MemoManager(el:Jquery[, cm: ColorManager])
```
## 数据接口
### MemoManager.Model
```ts
class Model {
  id: string
  position?: Memo.Point
  color?: Memo.Color
  text?: string
  el: JQuery
}
```
## 方法
### push
添加便签
```ts
mm.push(memo: MemoManager.Model[] | MemoManager.Model)
```
### new
新建便签
```ts
mm.new(id: string)
```
## 事件
### textchange
有标签的内容改变
```ts
mm.on('textchange', (e: {id:string, text:string}) => {
  console.log(e)
})
```
### positionchange
有标签的位置改变
```ts
mm.on('positionchange', (e: {id:string, position:Memo.Point}) => {
  console.log(e)
})
```
### colorchange
有标签的颜色改变
```ts
mm.on('colorchange', (e: {id:string, color:Memo.Color}) => {
  console.log(e)
})
```