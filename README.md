# Node Stream

## 参考

[《Node.js 设计模式》使用流进行编码](https://juejin.cn/post/6844903543678189576)

## Buffer和Stream的区别

- Buffer 是将资源的所有数据先放到Buffer区中,一旦读取完后再把结果给回调函数.所以会有内存的限制,一旦超过内存,就会摆错.
- Stream 是实时的读取和传给消费者
