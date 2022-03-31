# Node Stream

## 参考

[《Node.js 设计模式》使用流进行编码](https://juejin.cn/post/6844903543678189576)

## Buffer 和 Stream 的区别

- Buffer 是将资源的所有数据先放到 Buffer 区中,一旦读取完后再把结果给回调函数.所以会有内存的限制,一旦超过内存,就会摆错.
- Stream 是实时的读取和传给消费者

## 样例

### 1. `buffer.js`

使用`buffer`处理文件,读取文件到 `buffer`,然后处理.

执行 `node buffer.js stream.js`,会读取`stream.js`文件,压缩成一个`stream.js.gz`文件.

### 2. `stream.js`

使用`stream`流式处理文件,一边读取,一边使用`pipe`来流式处理.

执行 `node stream.js buffer.js`,会读取`buffer.js`文件,压缩成一个`buffer.js.gz`文件.

### 3. `gzipSend.js` 和 `gzipReceive.js`

`gzipReceive.js` 用于启动一个服务器,监听3000端口,接收文件.

```bash
node gzipReceive.js
```

`gzipSend.js` 用于发送一个请求,将指定文件发给指定服务器地址.

```bash
# 将test.txt文件发送给localhost,gzipSend.js文件内指定了localhost的端口为3000
node gzipSend.js test.txt localhost
```
