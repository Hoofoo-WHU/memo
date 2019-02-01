# URLParams
解析url中的参数

## 引入
```ts
import URLParams from '@/utils/URLParams.ts'
```
## 实例
```ts
const up = new URLParams(location: Location)
// {
//   key: value
// }
```

## 判断是否存在属性
```ts
Reflect.has(up, 'name')
```