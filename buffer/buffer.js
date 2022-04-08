const { Buffer } = require("buffer");
const iconv = require("iconv-lite");

/**
 * js 语言自身只有字符串类型，没有二进制类型。但是因为在处理像 TCP 流或者文件流时，需要用到二进制数据，所以 Node 定义了一个 Buffer 类，用来创建一个专门存放二进制数据的缓存区。
 *
 * 常用方法
 * Buffer.alloc(size[, fill[, encoding]]) 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
 * Buffer.allocUnsafe(size) 创建一个分配指定大小的 buffer，底层内存未初始化，可能包含敏感数据
 * Buffer.from(array)  创建一个以数组指定的元素作为数据的 Buffer 对象，数组只能是数字，不然会用 0 替换
 * Buffer.from(buffer) 拷贝 buffer
 * Buffer.from(string[, encoding]) 创建一个 Buffer 对象，将指定字符串按照指定的编码格式编码成字节数组，比如如果传入一个 base64 字符串，则返回一个 base64 编码的 Buffer 对象，那么输出的时候可以使用 Buffer.toString('uft8') 将这个 buffer 对象以 utf8 解码输出。
 *
 * Buffer.isEncoding(encoding) 判断编码格式是否存在
 * Buffer.isBuffer(obj) 判断对象是否是一个 Buffer 对象
 *
 * buf.fill(value[, offset[, end]]) 填充 buffer 对象，从 offset 开始，填充 end - offset 个值为 value 的字节
 * buf.write(string[, offset[, length[, encoding]]]) 将字符串写入 buffer 对象，如果没有指定编码，则使用 buffer 的默认编码
 * buf.toString([encoding[, start[, end]]]) 返回一个字符串，解码参数 encoding，默认为'utf8'
 */

// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);
console.log("buf1:", buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建长度为 10 的缓冲区，
// 使用值为 `1` 的字节填充。
const buf2 = Buffer.alloc(10, 1);
console.log("buf2:", buf2); // <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建长度为 10 的未初始化的缓冲区。
// 这比调用 Buffer.alloc() 快，
// 但返回的缓冲区实例可能包含旧数据，
// 需要使用 fill()、write()
// 或其他填充缓冲区内容的函数重写。
const buf3 = Buffer.allocUnsafe(10);
buf3.fill("Hello world!"); // 填充缓冲区
console.log("buf3_1:", buf3.toString()); // 输出 Hello worl 因为只分配了 10 个字节，所以只能输出 10 个字节
buf3.write("Hello world!", 0, "utf8"); // 写入缓冲区
console.log("buf3_2:", buf3.toString()); // 输出 Hello worl

// 创建包含字节 [1,2,3] 的缓冲区。
const buf4 = Buffer.from([1, 2, 3]);
console.log("buf4:", buf4); // <Buffer 01 02 03>

// Buffer.from(`string`, [encoding])
const buf11 = Buffer.from("我是谁"); // 创建一个 buffer，内容为 "我是谁",编码格式是 utf8
const buf12 = Buffer.from("5oiR5piv6LCB", "base64"); // 创建一个 buffer，内容是 "5oiR5piv6LCB",编码格式是 base64，这里将 base64 编码的字符串转为 buffer
console.log("buf11:", buf11); // <Buffer e6 88 91 e6 98 af e8 b0 81>
console.log("buf12:", buf12); // <Buffer e6 88 91 e6 98 af e8 b0 81>
console.log("buf11_1:", buf11.toString()); // 我是谁   将二进制 buffer 转为 utf8 字符串输出
console.log("buf11_2:", buf11.toString("base64")); // 5oiR5piv6LCB   将二进制 buffer 转为 utf8 字符串输出
console.log("buf12_1:", buf12.toString()); // 我是谁     将二进制 buffer 转为 utf8 字符串输出
console.log("buf12_2:", buf12.toString("base64")); // 5oiR5piv6LCB       将二进制 buffer 转为 base64 字符串输出

// iconv 和 buffer 转换类似，只不过支持的格式比较多
const str = "5oiR5piv6LCB"; //指定 base64 字符串
console.log("iconv 是否支持 base64:", iconv.encodingExists("base64")); //检测是否支持编码格式
const buf7 = iconv.encode(str, "base64"); // 识别 base64 字符串并创建 buffer.
const buf8 = Buffer.from(str, "base64"); //识别 base64 字符串并创建 buffer.

console.log("buf7:", buf7); // <Buffer e6 88 91 e6 98 af e8 b0 81>
console.log("buf8:", buf8); // <Buffer e6 88 91 e6 98 af e8 b0 81>

console.log("buf7 转为 utf8 字符串_1:", buf7.toString()); // 将 buffer 以 utf8 编码方式转为字符串
console.log("buf7 转为 utf8 字符串_2:", iconv.decode(buf7, "utf8")); // 将 buffer 以 utf8 编码方式转为字符串
console.log("buf7 转为 hex 字符串_3:", iconv.decode(buf7, "hex")); // 将 buffer 以 hex 编码方式转为字符串
console.log("buf8 转为 base64 字符串:", buf8.toString("base64")); // 将  buffer 以 base64 编码方式输出
console.log("buf8 转为 utf8 字符串:", buf8.toString()); // 将 buffer 以 默认的 utf8 编码方式输出
console.log("buf8 转为 hex 字符串:", buf8.toString("hex")); // 将 buffer 以 hex 编码方式输出
