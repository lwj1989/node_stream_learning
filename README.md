# Node Stream

## 参考

[《Node.js 设计模式》使用流进行编码](https://juejin.cn/post/6844903543678189576)

## Buffer 和 Stream 的区别

- Buffer 是将资源的所有数据先放到 Buffer 区中,一旦读取完后再把结果给回调函数.所以会有内存的限制,一旦超过内存,就会摆错.
- Stream 是实时的读取和传给消费者

## Stream 常见输入方式

- 控制台输入
- `http` 请求
- 读取文件

## Stream 常见输出方式

- 控制台输出
- `http` 响应
- 写入文件

## 应用场景

主要是处理`IO` 操作,`http请求`和`文件操作`都属于`IO`操作.
因为如果遇到大数据,`IO`操作对硬件要求很高,所以选择`stream`方式处理.

## 流的四种类型

- `Writable`: 可以写入数据的流（例如，`fs.createWriteStream()`）。
- `Readable`: 可以从中读取数据的流（例如，`fs.createReadStream()`）。
- `Duplex`: `Readable` 和 `Writable` 的流（例如，`net.Socket`）。
- `Transform`: 可以在写入和读取数据时**修改**或**转换**数据的 `Duplex` 流（例如，`zlib.createDeflate()`）。

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

> `crypto`的加密解密算法有一个注意点是,当加密算法是`aes-128-ecb`、`aes-128-cbc`时,key的长度需要是16位.如果是`aes-256-ecb`、`aes-256-cbc`,则key的长度需要是32位.否则会报错.
> 文章参考: [https://www.cnblogs.com/jaxu/p/11649131.html](https://www.cnblogs.com/jaxu/p/11649131.html)
