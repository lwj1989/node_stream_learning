const { Buffer } = require("buffer");

// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建长度为 10 的缓冲区，
// 使用值为 `1` 的字节填充。
const buf2 = Buffer.alloc(10, 1);
console.log(buf2); // <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建长度为 10 的未初始化的缓冲区。
// 这比调用 Buffer.alloc() 快，
// 但返回的缓冲区实例可能包含旧数据，
// 需要使用 fill()、write() 、
// 或其他填充缓冲区内容的函数重写。
const buf3 = Buffer.allocUnsafe(10);
buf3.fill("Hello world!"); // 填充缓冲区
console.log(buf3.toString()); // 输出 Hello worl 因为只分配了10个字节,所以只能输出10个字节
buf3.write("Hello world!", 0, "utf8"); // 写入缓冲区
console.log(buf3.toString()); // 输出 Hello worl

// 创建包含字节 [1,2,3] 的缓冲区。
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4); // <Buffer 01 02 03>

const buf7 = Buffer.from('test', 'ascii');
console.log(buf7); // <Buffer 74 65 73 74>
console.log(buf7.toString('base64')); // dGVzdA==

const buf8 = Buffer.from('1ag123', 'base64');
console.log(buf8.toString('base64'));
