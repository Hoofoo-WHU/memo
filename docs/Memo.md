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
## 调用

### 新建实例
```ts
new Memo(model: Memo.Model)
```

### 方法
#### close
删除memo
#### move(x: number, y: number)
移动到点`(x, y)`
#### setColor(color: Memo.Color)
修改背景色
#### setZ(z: number)
修改`z-index`