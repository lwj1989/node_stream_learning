const http = require("http");

/**
 * 网络传输中 二进制和字符串速度对比
 *
 * 网络传输使用的二进制，而 Buffer 是二进制，String 需要转换成二进制，才能传输。
 * 所以在网络传输中，使用 Buffer 传输数据，会比 String 传输数据更快。
 * 使用 ab 测试，发现 Buffer 比 String 传输更快。
 *
 * 可以使用下面的命令测试
 *
 * ab -c 10 -n 100000 http://localhost:3000/buffer
 *
 * ab -c 10 -n 100000 http://localhost:3000/string
 */

let str = "";
for (let i = 0; i < 1024 * 10; i++) {
  str += "a";
}
const strCopy = str;
const bufStr = Buffer.from(str);
console.log("strCopy", strCopy.length);
console.log("bufStr", bufStr.length);

const server = http.createServer((req, res) => {
  if (req.url === "/buffer") {
    res.end(bufStr);
  }
  if (req.url === "/string") {
    res.end(strCopy);
  }
});

server.listen(3000);
