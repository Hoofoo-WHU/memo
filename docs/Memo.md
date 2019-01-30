# Memo组件

## 引入
```js
import Memo from '@/components/Memo'
```

## 数据接口
### Memo.Model
```ts
class Model implements IModel {
  id: string
  position?: Point
  color?: Color
  el: JQuery
  text?: string
}
```
### Memo.Color
```ts
enum Color {
  yellow = 'yellow',
  purple = 'purple',
  pink = 'pink',
  grey = 'grey',
  green = 'green',
  blue = 'blue'
}
```
### Memo.Point

```ts
interface Point {
  x: number
  y: number
  z?: number
}
```

## 新建实例
```ts
new Memo(model: Memo.Model)
```

## 方法
### close 
删除memo
```ts
close()
```
### move
移动到点`(x, y)`
```ts
move(x: number, y: number)
```
### setColor
修改背景色
```ts
setColor(color: Memo.Color)
```
### setZ
修改`z-index`
```ts
setZ(z: number)
```

### getId
获取Id
```ts
getId()
```

### focus
获取焦点
```ts
focus()
```

## 事件
### textchange
便签内容改变
```ts
memo.on('textchange',(text:string)=>{
  // do after textchange
})
```
### colorchange
便签颜色改变
```ts
memo.on('colorchange',(color:Memo.Color)=>{
  // do after colorchange
})
```
### dragstart
便签开始被拖动
```ts
memo.on('dragend', (position: Memo.Point)=>{
  // do after dragstart
})
```
### dragend
便签被拖动后
```ts
memo.on('dragend', (position: Memo.Point)=>{
  // do after dragend
})
```
### blur
失去焦点
```ts
memo.on('blur', ()=>{
  // do after blur
})
```
### focus
获得焦点
```ts
memo.on('focus', ()=>{
  // do after focus
})
```
### close
关闭被点击
```ts
memo.on('close', ()=>{
  // do after close button click
})
```