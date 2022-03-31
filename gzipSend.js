const fs = require("fs"); // 文件系统 http://nodejs.cn/api/fs.html#file-system
const zlib = require("zlib"); // zlib模块提供了gzip,deflate/inflate等压缩算法 http://nodejs.cn/api/zlib.html#zlib
const http = require("http"); // 引入http模块,创建http server http://nodejs.cn/api/http.html#http
const path = require("path"); // path模块提供了用于处理文件和目录的路径的工具 http://nodejs.cn/api/path.html#path

const file = process.argv[2]; // 获取命令行参数
const server = process.argv[3]; // 获取服务器地址

const option = {
  hostname: server,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    filename: path.basename(file),
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
  },
};

// http.request() 发送http请求到服务器,并创建http.ClientRequest对象
const req = http.request(option, (res) => {
  console.log("服务器响应:" + res.statusCode);
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("文件已经发送完成!");
  });

/**
 * 1. 首先启动服务器 node gzipReceive.js
 * 2. 运行命令发送指定文件到指定服务器 node gzipSend.js <path to file> localhost
 */
