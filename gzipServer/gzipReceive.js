const http = require("http");
const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");

/**
 * 1. 首先启动服务器 node gzipReceive.js
 * 2. 运行命令发送指定文件到指定服务器 node gzipSend <path to file> localhost
 *
 * 注意：发送的时候顺序是压缩加密，那么接收的时候是解密解压。
 */

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log("文件请求接收:" + filename);
  req
    .pipe(
      crypto.createDecipheriv(
        "aes-128-cbc",
        "1234567890123456",
        "1234567890123456"
      )
    ) // 解密 第一个参数为加密算法，第二个为加密密钥，第三个为初始向量  http://nodejs.cn/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on("finish", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("文件接收完成！");
      console.log("文件接收完成:" + filename);
    });
});

server.listen(3000, () => console.log("服务监听 3000 端口！"));
