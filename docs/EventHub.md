# EventHub
发布订阅模式实现的事件中心
## 引入
```ts
import EventHub from '@/utils/EventHub'
```
## 实例
```ts
const eh = new EventHub()
```
## 方法
### 订阅
```ts
eh.on(name: string, callback: Function)
```
### 取消订阅
```ts
eh.remove(name: string, callback: Function)
```
要保存订阅函数的引用，才能remove
### 发布
```ts
eh.emit(name: string, payload?: any)
```