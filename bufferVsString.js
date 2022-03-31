const http = require("http");
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

/**
 * 网络传输使用的二进制,而Buffer是二进制,String需要转换成二进制,才能传输.
 * 所以在网络传输中,使用Buffer传输数据,会比String传输数据更快.
 * 使用ab测试,发现Buffer比String传输更快.
 * 
 * 可以使用下面的命令测试
 * 
 * ab -c 10 -n 100000 http://localhost:3000/buffer
 * 
 * ab -c 10 -n 100000 http://localhost:3000/string
 */
