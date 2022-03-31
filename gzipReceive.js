const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log("文件请求接收:" + filename);
  req
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on("finish", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("文件接收完成!");
      console.log("文件接收完成:" + filename);
    });
});

server.listen(3000, () => console.log("服务监听3000端口!"));

/**
 * 1. 首先启动服务器 node gzipReceive.js
 * 2. 运行命令发送指定文件到指定服务器 node gzipSend <path to file> localhost
 */
