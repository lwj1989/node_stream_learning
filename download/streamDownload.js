const path = require("path");
const http = require("http");
const fs = require("fs");

/**
 * 文件流下载
 * 创建一个服务器，将文件加载为一个可读流，然后设置响应头，将可毒瘤传递给响应体。
 */
const server = http.createServer((req, res) => {
  try {
    // const filePath = path.join(__dirname, "./Docker.dmg");
    const filePath = "/Users/liwenjiao/Downloads/heiying/heiying.mkv";
    console.log("文件路径:", filePath);
    const readStream = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "application/octet-stream"); //表示是一个二进制文件
    res.setHeader("Content-Disposition", "attachment; filename=Docker.dmg"); // 告诉浏览器是一个文件附件下载，并命名
    readStream.pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.end("服务错误:" + err.message);
  }
});

server.listen(3000, () => {
  console.log("服务器启动成功: http://localhost:3000");
});
