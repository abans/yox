### get(keypath)

获取数据

### set(keypath, value)

设置一项数据

### set(data)

设置多项数据，如果需要多次调用 `set`，建议用 `set(data)` 的形式，避免多次渲染。

### on(type, listener)

监听事件

### off(type, listener)

取消监听事件

### once(type, listener)

监听一次事件就取消

### watch(keypath, watcher)

监听数据变化

### watchOnce(keypath, watcher)

监听一次数据变化就取消
