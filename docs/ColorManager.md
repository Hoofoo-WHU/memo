# ColorManager

## 引入
```ts
import ColorManager from '@/js/ColorManager'
```
## 实例
```ts
let cm = new ColorManager(el: Jquery)
```
## 方法
### enable
激活颜色管理器
```ts
cm.enable()
```
### disable
取消激活
```ts
cm.disable()
```
### active
高亮指定颜色
```ts
cm.active(color: string)
```
## 事件
### colorchange
色块被点击
```ts
cm.on('colorchange',(color:string)=>{
  console.log(color)
})
```