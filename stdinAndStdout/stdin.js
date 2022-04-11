/**
 * process.stdin 是一个 ReadStream
 * 可以监听 data,end,open,close,error,readable,pause 等事件。
 * 使用 .on(event, callback) 方法监听事件。
 *
 * node stdin.js
 * 输入 123
 * 输入的数据是: <Buffer 31 32 33 0a>
 * 输入的数据字符串是: 123
 */

process.stdin.on("data", (chunk) => { // 这里 process.stdin 就是一个 stream 对象。
  console.log("输入的数据是:", chunk); // 这里打印出来是 Buffer 二进制对象
  console.log("输入的数据字符串是:", chunk.toString()); // 这里打印出来是输入的字符串。这里toString()可以传入编码格式,对二进制数据进行编码输出
});
