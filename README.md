# Node Stream

## 什么是流

流是一种数据处理方式，用于按顺序将输入读取或者写入输出。
独特之处在于，不像传统方式那样一次将文件全部读入内存，而是逐块读取数据块，处理其内容而不将其全部保存在内存中。

一般当我们读取一个文件大小大于内存的文件时，都会采用流的方式。

Youtube,Netflix 等流媒体服务，也不是一次性下载视频和音频，而是浏览器以连续的块流形式接收视频，从而允许接收者立即观看。

流还具有*可组合性*的特点，可以以某种方式组合多个组件以产生相同类型的结果。通过在传输过程中进行数据转换等操作。

## Buffer 和 Stream 的区别

- Buffer 是将资源的所有数据先放到 Buffer 区中，一旦读取完后再把结果给回调函数。所以会有内存的限制，一旦超过内存，就会摆错。
- Stream 是实时的读取和传给消费者

## 为什么选择流

1. 内存效率：不需要再内存中加载大量数据就可以处理。
2. 时间效率：一旦获得数据就开始处理，而不用等待全部接收再处理，减少了等待时间。

## Stream 常见输入方式

- 控制台输入
- `http` 请求
- 读取文件

## Stream 常见输出方式

- 控制台输出
- `http` 响应
- 写入文件

## 应用场景

主要是处理`IO` 操作，`http 请求`和`文件操作`都属于 `IO`操作。
因为如果遇到大数据，`IO`操作对硬件要求很高，所以选择`stream`方式处理。

## 流的四种类型

- `Writable`: 可以写入数据的流（例如，`fs.createWriteStream()`）。
- `Readable`: 可以从中读取数据的流（例如，`fs.createReadStream()`）。
- `Duplex`: `Readable` 和 `Writable` 的流（例如，`net.Socket`）。
- `Transform`: 可以在写入和读取数据时**修改**或**转换**数据的 `Duplex` 流（例如，`zlib.createDeflate()`）。


## 参考

1. [《Node.js 设计模式》使用流进行编码](https://juejin.cn/post/6844903543678189576)
2. [Understanding Streams In NodeJS](https://medium.com/bb-tutorials-and-thoughts/understanding-streams-in-nodejs-43736e7acb4b)
3. [深入理解 Node.js Stream 内部机制](https://fed.taobao.org/blog/taofed/do71ct/nodejs-stream/)
